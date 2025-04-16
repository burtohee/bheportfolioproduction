import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '@/pages/LogInPage/LogInPageStyles.module.css';

import { useAuthenticationContext } from '@/contexts/AuthenticationContext/AuthenticationContext';

import Pannel3DLoginPage from '@/components/Pannel3DLoginPage';
import { Pannel3DLoginPageDataType } from '@/entities/Pannel3DLoginPageDataType';

import { ReactLazyLoadImport } from '@/lazyloadings/ReactLazyLoadImport';
import { ModelDigitalLockPasswordInputPros } from '@/entities/ModelDigitalLockPasswordInputPros';
import ModelDigitalLock from '@/components/ModelDigitalLock';
const ModelDigitalLockPasswordInput: React.FC<ModelDigitalLockPasswordInputPros> =
    ReactLazyLoadImport(
        () =>
            import(
                '@/components/ModelDigitalLock/ModelDigitalLockPasswordInput/index.tsx'
            )
    );

function useLogInPageMetaData() {
    function getRandomFourDigitNumber() {
        const randomNum = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
        return String(randomNum).padStart(4, '0'); // Ensures it's always 4 digits
    }
    const [credential] = useState(getRandomFourDigitNumber);
    return { credential };
}

function LogInPage() {
    const { credential } = useLogInPageMetaData();

    const [inputs, setInputs] = useState({ password: '', password2: '' });
    const handlePasswordChange = (value: string) => {
        setInputs((values) => ({ ...values, password: value }));
    };

    const [ifLogIn, setIfLogIn] = useState(false);

    const [inputsChecked, setInputsChecked] =
        useState<Pannel3DLoginPageDataType>({
            password: { ifChecked: false, ifTitle: true },
            longerSession: { ifChecked: false, ifTitle: true },
            shortSession: { ifChecked: false, ifTitle: false },
        });

    const { login } = useAuthenticationContext();
    const navigate = useNavigate();

    const goLogIn = async () => {
        if (ifLogIn) {
            try {
                let sessionType: 'long' | 'short' = 'short';

                if (inputsChecked.longerSession.ifChecked) {
                    sessionType = 'long';
                } else {
                    sessionType = 'short';
                }
                await login(sessionType);
                navigate('/home');
            } catch (err) {
                // setError("Invalid email or password");
            }
        }
    };

    useEffect(() => {
        console.log(ifLogIn);
        goLogIn();
    }, [ifLogIn]);

    // const handleSubmit = async (e: React.FormEvent) => {
    //     if (ifLogIn) {
    //         try {
    //             e.preventDefault();
    //             await login();
    //             navigate('/home');
    //         } catch (err) {
    //             // setError("Invalid email or password");
    //         }
    //     }
    // };
    // const handleSubmitLogOut = async (e: React.FormEvent) => {
    //     try {
    //         e.preventDefault();
    //         await logout();
    //         navigate('/home');
    //     } catch (err) {
    //         // setError("Invalid email or password");
    //     }
    // };

    return (
        <div className={styles.LogInPageContainer}>
            <Pannel3DLoginPage
                datas={inputsChecked}
                datasSet={setInputsChecked}
            ></Pannel3DLoginPage>

            <ModelDigitalLock
                credential={credential}
                inputs={inputs}
                setInputs={setInputs}
                setIfLogIn={setIfLogIn}
            ></ModelDigitalLock>

            {inputsChecked.password.ifChecked && (
                <ModelDigitalLockPasswordInput
                    credential={credential}
                    // password={inputs?.password}
                    setPassword={handlePasswordChange}
                ></ModelDigitalLockPasswordInput>
            )}
        </div>
    );
}

export default LogInPage;
