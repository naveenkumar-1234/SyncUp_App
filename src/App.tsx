import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { AppContent } from "./AppContent";



function App() {
  return (
    <AuthProvider>
      <AppContent/>
      <Toaster />
    </AuthProvider>
  );
}

export default App;