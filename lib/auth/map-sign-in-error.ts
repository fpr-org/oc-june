/** User-facing copy for Firebase Auth failures (Google popup). */
export function mapSignInError(err: unknown): string {
  const code =
    err && typeof err === 'object' && 'code' in err ? String((err as { code?: string }).code) : '';

  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Try again when you’re ready.';
    case 'auth/cancelled-popup-request':
      return 'Only one sign-in window can be open at a time.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the pop-up. Allow pop-ups for this site and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    case 'auth/unauthorized-domain':
      return 'This domain isn’t authorized for sign-in. Contact support if this persists.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in isn’t enabled. Please contact support.';
    default:
      if (code) return 'Something went wrong. Please try again in a moment.';
      return 'Sign-in failed. Please try again.';
  }
}
