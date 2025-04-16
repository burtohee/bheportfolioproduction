import { useState } from 'react';
import styles from './ModelDigitalLockPasswordInputStyles.module.css';

import { ModelDigitalLockPasswordInputPros } from '@/entities/ModelDigitalLockPasswordInputPros';
function ModelDigitalLockPasswordInput(
    props: ModelDigitalLockPasswordInputPros
) {
    const [inputs, setInputs] = useState({ password: '', password2: '' });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setPassword(inputs.password);
        setInputs({ password: '', password2: '' });
        // console.log(inputs);
        // alert(inputs);
    };

    return (
        <div className={styles.modelDigitalLockPasswordInputContainer}>
            <div className={styles.modelDigitalLockPasswordInputFormContainer}>
                <form
                    className={styles.modelDigitalLockPasswordInputForm}
                    onSubmit={handleSubmit}
                >
                    <label>
                        Please Enter Password {props.credential}:
                        <input
                            type="text"
                            name="password"
                            value={inputs.password || ''}
                            onChange={handleChange}
                        />
                    </label>

                    <input type="submit" />
                </form>
            </div>
        </div>
    );
}

export default ModelDigitalLockPasswordInput;
