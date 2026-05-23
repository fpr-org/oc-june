# Firestore Security Specification

## 1. Data Invariants
- A `User` profile must always have an `email`.
- `streakCount` and `gems` must be non-negative.
- `lastActiveDate` must be a valid date string.
- A `Conversion` record must belong to the user (`userId` matches).
- `Conversion` records are immutable after creation.
- A `Favorite` record must belong to the user (`userId` matches).
- `Favorite` records are effectively immutable (delete and re-create).
- All timestamps must use `request.time`.
- All IDs must be hardened (max length, regex).

## 2. The "Dirty Dozen" Payloads

### Identity & Spoofing
1. **Payload**: Create a user profile with a different `userId` (spoofing).
   - **Target**: `setDoc(doc(db, 'users', 'target_uid'), { email: 'fake@example.com' })`
   - **Expected**: `PERMISSION_DENIED`
2. **Payload**: Update another user's `streakCount`.
   - **Target**: `updateDoc(doc(db, 'users', 'other_uid'), { streakCount: 999 })`
   - **Expected**: `PERMISSION_DENIED`

### Integrity & Validation
3. **Payload**: Missing required field `email` in user creation.
   - **Target**: `setDoc(doc(db, 'users', my_uid), { gems: 100 })`
   - **Expected**: `PERMISSION_DENIED`
4. **Payload**: Injecting a massive string into `displayName`.
   - **Target**: `updateDoc(doc(db, 'users', my_uid), { displayName: 'a'.repeat(1000) })`
   - **Expected**: `PERMISSION_DENIED`
5. **Payload**: Negative `gems` value.
   - **Target**: `updateDoc(doc(db, 'users', my_uid), { gems: -10 })`
   - **Expected**: `PERMISSION_DENIED` (Wait, rules need to check this)

### State & Logic
6. **Payload**: Modifying immutable `timestamp` in conversion.
   - **Target**: `updateDoc(doc(db, 'users', my_uid, 'conversions', 'id'), { timestamp: new Date() })`
   - **Expected**: `PERMISSION_DENIED`
7. **Payload**: Creating a conversion for another user inside one's own subcollection.
   - **Target**: `addDoc(collection(db, 'users', my_uid, 'conversions'), { userId: 'other_uid', ... })`
   - **Expected**: `PERMISSION_DENIED`
8. **Payload**: Escalating privileges by adding an `isAdmin` field.
   - **Target**: `updateDoc(doc(db, 'users', my_uid), { isAdmin: true })`
   - **Expected**: `PERMISSION_DENIED` (Strict field whitelist)

### Denial of Wallet / Resource Exhaustion
9. **Payload**: Using a massive document ID.
   - **Target**: `setDoc(doc(db, 'users', 'a'.repeat(200)), { ... })`
   - **Expected**: `PERMISSION_DENIED` (isValidId check)
10. **Payload**: Recursive lookup attack (though less applicable here without complex `get()` calls in lists).
11. **Payload**: Fetching a user profile without being that user.
   - **Target**: `getDoc(doc(db, 'users', 'other_uid'))`
   - **Expected**: `PERMISSION_DENIED`
12. **Payload**: Listing all users in the system.
    - **Target**: `getDocs(collection(db, 'users'))`
    - **Expected**: `PERMISSION_DENIED`

## 3. Test Runner (Mock)
A real test runner would use `@firebase/rules-unit-testing`. For this environment, we'll ensure manual verification and ESLint compliance.
