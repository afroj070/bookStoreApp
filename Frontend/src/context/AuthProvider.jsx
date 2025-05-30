import  { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({children}) {
  // const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(null);
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth= () => useContext(AuthContext);