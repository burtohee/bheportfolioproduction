import styles from './InputHomePageStyles.module.css';
import cn from 'classnames';
import { useFormContext } from 'react-hook-form';
import {
    findInputError,
    isFormInvalid,
} from '../../utils/InputHomePageValidations/index';
import { AnimatePresence, motion } from 'framer-motion';

interface InputHomePageProps {
    label?: string;
    id: string;
    type?: string;
    className?: string;
    placeholder?: string;
    autoComplete?: string;
    multiline?: boolean;
    name: string;
    validation?: Record<string, any>;
}

function InputHomePage({
    label,
    id,
    type,
    className,
    placeholder,
    autoComplete,
    multiline,
    name,
    validation,
}: InputHomePageProps) {
    const input_tailwind =
        'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60';

    const {
        register,
        formState: { errors },
    } = useFormContext();

    // Find the input error
    const inputError = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputError);

    return (
        <>
            <div className={cn(className, styles.inputContainer)}>
                <div className={cn(className, styles.inputLabelContainer)}>
                    <div className={cn(className, styles.labelContainer)}>
                        <label htmlFor={id} hidden>
                            {label}
                        </label>
                    </div>
                </div>
                <div className={styles.inputContentContainer}>
                    {multiline ? (
                        <textarea
                            id={id}
                            className={cn(
                                input_tailwind,
                                'min-h-[10rem] max-h-[20rem] resize-y'
                            )}
                            placeholder={placeholder}
                            {...register(name || '', validation)}
                        ></textarea>
                    ) : (
                        <input
                            id={id}
                            type={type}
                            className={cn(input_tailwind, '')}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            {...register(name || '', validation)}
                        />
                    )}
                    <div className={cn(className, styles.errorMsgContainer)}>
                        <AnimatePresence mode="wait" initial={false}>
                            {isInvalid && inputError?.error?.message && (
                                <InputError
                                    message={inputError.error.message}
                                    key={`${name}+ input-errorMessage`}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputHomePage;

interface InputErrorProps {
    message: string;
}

const InputError = ({ message }: InputErrorProps) => {
    return (
        <motion.p
            className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
            {...framer_error}
        >
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
            </svg>
            {message}
        </motion.p>
    );
};

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
};
