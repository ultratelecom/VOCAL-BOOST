import { useAuthenticationStatus, useUserData } from '@nhost/react'
import { nhost } from './nhost'

export const useAuth = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const user = useUserData()

  const signIn = async (email: string, password: string) => {
    try {
      const result = await nhost.auth.signIn({
        email,
        password,
      })
      
      if (result.error) {
        throw new Error(result.error.message)
      }
      
      return result
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await nhost.auth.signUp({
        email,
        password,
        options: {
          displayName,
        },
      })
      
      if (result.error) {
        throw new Error(result.error.message)
      }
      
      return result
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await nhost.auth.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const result = await nhost.auth.resetPassword({
        email,
      })
      
      if (result.error) {
        throw new Error(result.error.message)
      }
      
      return result
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }
} 