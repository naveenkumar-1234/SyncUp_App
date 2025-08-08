import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div >
        <Label htmlFor="email" className='pb-2'>Email</Label>
        <Input
          id="email"
          type="email"
          className='py-5 mb-2'
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="password" className='pb-2'>Password</Label>
        <Input
          id="password"
          type="password"
          className='py-5'
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      </div>
      
      <Button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}