import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Form } from './ui/form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginUserSchema, registerUserSchema } from '@/shared/schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner'
import { useAuthContext } from '@/context/AuthContext'

interface AuthModalProps {
  isOpen: boolean,
  onClose: () => void,
  initialMode: 'login' | 'register'
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const { login, register } = useAuthContext();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [isLoginLoading, setLoginLoading] = useState(false);
  const [isRegisterLoading, setRegisterLoading] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const registerForm = useForm({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleLogin = async (data: { email: string, password: string }) => {
    setLoginLoading(true);
    try {
      await login(data);
      setLoginLoading(false);
      onClose();
      toast.success(" Welcome back!",
        {
          description: "You have been logged in successfully.",
        }
      )
    } catch (err: any) {
      setLoginLoading(false);
      toast.error("Login failed",
        {
          description: err.message || 'Invalid Credentials.',
        }
      )
    }
  }

  const handleRegister = async (data: { username: string, email: string, password: string }) => {
    setRegisterLoading(true);
    try {
      await register(data);
      setRegisterLoading(false);
      onClose();
      toast.success('Account created!', {
        description: 'Welcome to TaskFlow. You can now start organizing your tasks.'
      })
    } catch (err: any) {
      setRegisterLoading(false);
      toast.error("Registration failed",
        {
          description: err.message || 'Something went wrong. Please try again.'
        }
      )
    }
  }
  const toggleMode = () => {
    setMode((prev) => prev === 'login' ? 'register' : 'login')
  }

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode])
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {mode === 'login'
              ? 'Sign in to your account'
              : 'Join thousands of productive users'
            }
          </DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <Form key={mode}
            {...loginForm}
          >
            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="space-y-6">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoginLoading}
              >
                {isLoginLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        ) : (
          <Form key={mode}
            {...registerForm}
          >
            <form
              onSubmit={registerForm.handleSubmit(handleRegister)}
              className="space-y-6">
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
        )}

        <div className="text-center">
          <button
            onClick={toggleMode}
            className="text-primary hover:text-blue-600 font-medium transition duration-200 cursor-pointer"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'
            }
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal