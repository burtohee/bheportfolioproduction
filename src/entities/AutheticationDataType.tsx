// export interface User  {
//     id: string;
//     name: string;
//     email: string;
//   };

type sessionType = 'long' | 'short';

export type AuthContextType = {
    // user: User | null;
    token: string | null;
    ifLongSession: boolean | undefined;
    // login: (email: string, password: string) => Promise<void>;

    login: (sessionType: sessionType) => Promise<void>;
    logout: () => void;
};
