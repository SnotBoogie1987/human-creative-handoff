// Export all auth utilities from a single entry point

// Types
export type {
  UserRole,
  Profile,
  UserWithProfile,
  AuthContextType,
  LoginFormData,
  SignupFormData,
  ResetPasswordFormData,
  UpdatePasswordFormData,
} from './types'

// Server-side utilities (use in Server Components, Server Actions, API routes)
export {
  getUser,
  requireAuth,
  requireRole,
  hasCompletedOnboarding,
  getProfile,
  updateProfile,
} from './server'

// Client-side utilities (use in Client Components)
export {
  signIn,
  signUp,
  signOut,
  requestPasswordReset,
  updatePassword,
  isAuthenticated,
} from './client'
