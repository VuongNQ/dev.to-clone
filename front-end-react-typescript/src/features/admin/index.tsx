import React, { useState } from "react";
interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const Admin: React.FC<LoginFormProps> = ({onSubmit}) => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email,password);
   }
  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    <button type="submit">Login</button>
</form> 
  )
};
export default Admin;
