import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    await registerUser(data.username, data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="username"
        className='pb-3'
>Username</Label>
        <Input
          id="username"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="email" className='pb-3'>Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="password" className='pb-3'>Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      
      <Button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
}