import { useAuth } from "./context/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import ChatLayout from "./pages/ChatLayout";


export const AppContent = () =>{
    const { user } = useAuth();
    return(
        <div className="min-h-screen">
            {user ? <ChatLayout/> : <AuthPage/>}
        </div>
    )
}