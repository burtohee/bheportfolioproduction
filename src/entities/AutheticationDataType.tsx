// export interface User  {
//     id: string;
//     name: string;
//     email: string;
//   };
  
export  type AuthContextType = {
    // user: User | null;
    token: string | null;
    // login: (email: string, password: string) => Promise<void>;
    
    login: () => Promise<void>;
    logout: () => void;
  };