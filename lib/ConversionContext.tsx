'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { collection, query, orderBy, limit, addDoc, onSnapshot, serverTimestamp, setDoc, doc, increment } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { handleFirestoreError, OperationType } from './firestoreUtils';

export interface RecentConversion {
  id: string;
  categoryId: string;
  fromValue: string;
  fromUnit: string;
  toValue: string;
  toUnit: string;
  timestamp: Date | any;
}

interface ConversionContextType {
  recentConversions: RecentConversion[];
  addConversion: (conversion: Omit<RecentConversion, 'id' | 'timestamp'>) => void;
}

const ConversionContext = createContext<ConversionContextType | undefined>(undefined);

export function ConversionProvider({ children }: { children: ReactNode }) {
  const [recentConversions, setRecentConversions] = useState<RecentConversion[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTimeout(() => setRecentConversions([]), 0);
      return;
    }

    const pathForOnSnapshot = `users/${user.uid}/conversions`;
    const q = query(
      collection(db, pathForOnSnapshot),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RecentConversion[];
      setRecentConversions(convs);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, pathForOnSnapshot);
    });

    return () => unsubscribe();
  }, [user]);

  // Cleaned up user DB creation, handled in AuthContext now


  const addConversion = useCallback(async (conversion: Omit<RecentConversion, 'id' | 'timestamp'>) => {
    if (!user) {
      // Offline fallback
      setRecentConversions(prev => {
        const isDuplicate = prev.length > 0 && 
          prev[0].fromValue === conversion.fromValue && 
          prev[0].fromUnit === conversion.fromUnit &&
          prev[0].toUnit === conversion.toUnit;
        
        if (isDuplicate) return prev;

        const newConv = {
          ...conversion,
          id: Math.random().toString(36).substring(7),
          timestamp: new Date()
        };
        return [newConv, ...prev].slice(0, 10);
      });
      return;
    }

    try {
      const isDuplicate = recentConversions.length > 0 && 
        recentConversions[0].fromValue === conversion.fromValue && 
        recentConversions[0].fromUnit === conversion.fromUnit &&
        recentConversions[0].toUnit === conversion.toUnit;

      if (isDuplicate) return;

      const newConv = {
        userId: user.uid,
        categoryId: conversion.categoryId,
        fromValue: conversion.fromValue,
        fromUnit: conversion.fromUnit,
        toValue: conversion.toValue,
        toUnit: conversion.toUnit,
        timestamp: serverTimestamp()
      };
      
      const pathForAdd = `users/${user.uid}/conversions`;
      await addDoc(collection(db, pathForAdd), newConv);

      // Increment gems
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(
          userRef,
          { gems: increment(1), totalConversions: increment(1) },
          { merge: true }
        );
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user!.uid}/conversions`);
    }
  }, [user, recentConversions]);

  return (
    <ConversionContext.Provider value={{ recentConversions, addConversion }}>
      {children}
    </ConversionContext.Provider>
  );
}

export function useConversion() {
  const context = useContext(ConversionContext);
  if (!context) {
    throw new Error('useConversion must be used within a ConversionProvider');
  }
  return context;
}
