'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firestoreUtils';
import { mapSignInError } from '@/lib/auth/map-sign-in-error';
import SignInModal from '@/components/auth/SignInModal';

export interface UserProfile {
  email: string;
  displayName: string;
  photoURL: string;
  streakCount: number;
  lastActiveDate: string;
  gems: number;
  lastClaimedChallengeDay?: number;
  /** Lifetime conversions (incremented on each saved conversion). */
  totalConversions?: number;
  /** Best streak recorded (updated when current streak grows). */
  longestStreak?: number;
  /** ISO date when the profile was first created (set once). */
  memberSince?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  /** True while the Google popup flow is in progress. */
  signInBusy: boolean;
  signInError: string | null;
  clearSignInError: () => void;
  signInModalOpen: boolean;
  openSignInModal: (opts?: { redirectTo?: string }) => void;
  closeSignInModal: () => void;
  signInRedirectTo: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signInBusy, setSignInBusy] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signInRedirectTo, setSignInRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setUserProfile(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const todayStr = new Date().toISOString().split('T')[0];

    const unsubscribe = onSnapshot(userRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as UserProfile;
        
        // Handle streak logic
        let updatedStreak = data.streakCount || 0;
        let lastActive = data.lastActiveDate || '';

        const prevLongest = data.longestStreak ?? 0;

        if (lastActive !== todayStr) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (lastActive === yesterdayStr) {
            updatedStreak += 1; // Consecutive day
          } else {
            updatedStreak = 1; // Reset streak
          }
          lastActive = todayStr;

          const newLongest = Math.max(prevLongest, updatedStreak);

          try {
            await setDoc(
              userRef,
              {
                streakCount: updatedStreak,
                lastActiveDate: lastActive,
                longestStreak: newLongest,
              },
              { merge: true }
            );
          } catch (e) {
            handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
          }
        }

        const displayLongest = Math.max(data.longestStreak ?? 0, updatedStreak);

        setUserProfile({
          ...data,
          streakCount: updatedStreak,
          lastActiveDate: lastActive,
          totalConversions: data.totalConversions ?? 0,
          longestStreak: displayLongest,
        });
        setLoading(false);
      } else {
        // Create initial profile
        const initialProfile: UserProfile = {
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          streakCount: 1,
          lastActiveDate: todayStr,
          gems: 0,
          totalConversions: 0,
          longestStreak: 1,
          memberSince: new Date().toISOString(),
        };
        try {
          await setDoc(userRef, initialProfile);
          setUserProfile(initialProfile);
        } catch (e) {
          handleFirestoreError(e, OperationType.CREATE, `users/${user.uid}`);
        }
        setLoading(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const clearSignInError = useCallback(() => setSignInError(null), []);

  const openSignInModal = useCallback((opts?: { redirectTo?: string }) => {
    setSignInError(null);
    setSignInRedirectTo(opts?.redirectTo ?? null);
    setSignInModalOpen(true);
  }, []);

  const closeSignInModal = useCallback(() => {
    setSignInModalOpen(false);
    setSignInRedirectTo(null);
    setSignInError(null);
  }, []);

  const signIn = useCallback(async () => {
    setSignInError(null);
    setSignInBusy(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Sign in failed', error);
      setSignInError(mapSignInError(error));
    } finally {
      setSignInBusy(false);
    }
  }, []);

  const logOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    logOut,
    signInBusy,
    signInError,
    clearSignInError,
    signInModalOpen,
    openSignInModal,
    closeSignInModal,
    signInRedirectTo,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <SignInModal />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
