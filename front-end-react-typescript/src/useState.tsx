import { useState } from "react"

type AuthUser = {
    name: string
    email: string
}


export const User = () => {
   const [user, setUser] = useState<AuthUser>({} as AuthUser); 
   const handleLogin = () => {
      setUser({
        name: "Ngo van Quoc",
        email: "Ngovanquoc480@gmail.com"
      })
   } 
   
   return (
        <div>
            <button onClick={handleLogin} ></button>
            <div>My Name is {user.name} </div>
            <div>My Email is {user.email} </div>
        </div>
    )
}