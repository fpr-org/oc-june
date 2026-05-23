'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { collection, query, orderBy, getDocs, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc, where } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { handleFirestoreError, OperationType } from './firestoreUtils';

export interface Favorite {
  id: string;
  userId: string;
  categoryId: string;
  fromUnit: string;
  toUnit: string;
  timestamp: Date | any;
}

interface FavoriteContextType {
  favorites: Favorite[];
  addFavorite: (categoryId: string, fromUnit: string, toUnit: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (categoryId: string, fromUnit: string, toUnit: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTimeout(() => setFavorites([]), 0);
      return;
    }

    const pathForOnSnapshot = `users/${user.uid}/favorites`;
    const q = query(
      collection(db, pathForOnSnapshot),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Favorite[];
      setFavorites(favs);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, pathForOnSnapshot);
    });

    return () => unsubscribe();
  }, [user]);

  const addFavorite = useCallback(async (categoryId: string, fromUnit: string, toUnit: string) => {
    if (!user) {
      // Local fallback could be here, but requiring login for favorites is better
      return;
    }

    try {
      const isDuplicate = favorites.some(
        f => f.categoryId === categoryId && f.fromUnit === fromUnit && f.toUnit === toUnit
      );

      if (isDuplicate) return;

      const newFav = {
        userId: user.uid,
        categoryId,
        fromUnit,
        toUnit,
        timestamp: serverTimestamp()
      };
      
      const pathForAdd = `users/${user.uid}/favorites`;
      await addDoc(collection(db, pathForAdd), newFav);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user!.uid}/favorites`);
    }
  }, [user, favorites]);

  const removeFavorite = useCallback(async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/favorites`, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/favorites/${id}`);
    }
  }, [user]);

  const isFavorite = useCallback((categoryId: string, fromUnit: string, toUnit: string) => {
    return favorites.some(f => f.categoryId === categoryId && f.fromUnit === fromUnit && f.toUnit === toUnit);
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
}
