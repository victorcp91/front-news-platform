import {useState, createContext, ReactNode } from "react";

interface IUserData {
  email: string;
  uid: string;
  username: string;
  admin?: boolean;
}

interface IAuthContextData {
  isAuthenticated: boolean;
  user: IUserData | null;
  registerUser: (email: string, uid: string) => void;
  clearUser: () => void;
  setAdmin: (b: boolean) => void;
}

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({children}: IAuthProvider) {
  const [user, setUser] = useState<IUserData|null>(null);
  const isAuthenticated = !!user;

  function registerUser(email: string, uid: string){
    setUser({
      email,
      uid,
      username: email.split('@')[0]
    });
  }

  function clearUser(){
    setUser(null);
  }

  function setAdmin(){
    setUser(current => ({...current!, admin: true}));
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, user, registerUser, clearUser, setAdmin}}>
      {children}
    </AuthContext.Provider>
  )
}