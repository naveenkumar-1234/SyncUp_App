import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

export function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Tabs defaultValue="login" className="w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Chat App</CardTitle>
            <CardDescription>Connect with others in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="pt-4">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register" className="pt-4">
              <RegisterForm />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}