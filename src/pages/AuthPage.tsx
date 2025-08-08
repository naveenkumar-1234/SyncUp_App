import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import LottieAnimation from '@/components/lottie/LottieAnimation';

export function AuthPage() {
  return (
    <div className="flex items-center justify-center bg-gray-100">

      <div className='relative w-1/2 min-h-screen  bg-gradient-to-br from-indigo-500 to-blue-400'>

      <div className='absolute rounded-full bg-[#e4ddf8] h-36 w-36 z-10 right-30 bottom-30'></div>
      <div className='absolute rounded-full bg-[#e4ddf8] h-24 w-24 z-10 right-60 bottom-12'></div>
      <LottieAnimation/>
      </div>
      <div className='flex justify-center items-center w-1/2 min-h-screen z-40'>
      <Tabs defaultValue="login" className="w-[450px] ">
        <Card className='min-h-[400px]  shadow-xl border-2 border-gray-200 bg-white '>
          <CardHeader>
            <CardTitle className='text-gray-800" text-2xl'>Sync Up</CardTitle>
            <CardDescription>Connect with others in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <TabsList className="grid w-full h-12 grid-cols-2 bg-gray-100 rounded">
              <TabsTrigger className='data-[state=active]:bg-blue-500 data-[state=active]:text-white transition' value="login">Login</TabsTrigger>
              <TabsTrigger value="register" className='data-[state=active]:bg-blue-500 data-[state=active]:text-white transition'>Register</TabsTrigger>
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


      
    </div>
  );
}