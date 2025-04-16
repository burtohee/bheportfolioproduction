import { Dispatch, SetStateAction } from 'react';

export interface ModelDigitalLockPros {
    credential: string;
    inputs: { password: string; password2: string };
    setInputs: Dispatch<
        SetStateAction<{
            password: string;
            password2: string;
        }>
    >;
    setIfLogIn: Dispatch<SetStateAction<boolean>>;
}
