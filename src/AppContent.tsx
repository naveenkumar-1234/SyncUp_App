import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import HomeLayout from "./pages/HomeLayout";


export const AppContent = () =>{
    const { user ,getLocalUser } = useAuth();
    // useEffect(()=>{
    //     getLocalUser()
    // },[])
    return(
        <div className="min-h-screen">
            {user ? <HomeLayout/> : <AuthPage/>}
        </div>
    )
}