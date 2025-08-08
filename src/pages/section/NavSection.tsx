import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'


const NavSection = ({user,logout}:any) => {
  return (
     <header className="flex bg-blue-500 text-white items-center justify-between border-b p-4">
        <h1 className="font-extrabold text-2xl">Sync Up</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className='outline-1'>
              {/* <AvatarImage src={} /> */}
              <AvatarFallback className='  p-3'>
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{user?.username}</span>
          </div>
          <Button variant="outline" className='text-blue-500 shadow-2xl' onClick={logout}>
            Logout
          </Button>

        </div>
      </header>
  )
}

export default NavSection