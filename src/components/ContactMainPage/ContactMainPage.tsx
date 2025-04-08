import styles from '@/components/ContactMainPage/ContactMainPageStyles.module.css';
import { Suspense, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
    email_validation,
    name_validation,
    desc_validation,
} from '@/utils/InputHomePageValidations';

import { ReactLazyLoadImport } from '@/lazyloadings/ReactLazyLoadImport/index';
const InputHomePage = ReactLazyLoadImport(
    () => import('@/commons/InputHomePage/index.tsx')
) as React.FC<{
    label?: string;
    id: string;
    type?: string;
    className?: string;
    placeholder?: string;
    autoComplete?: string;
    multiline?: boolean;
    name: string;
    validation?: Record<string, any>;
}>;

function ContactMainPage() {
    const methods = useForm({ mode: 'all' });
    const [success, setSuccess] = useState(false);
    const formSpreeFormAPI = import.meta.env.VITE_API_URL;

    const onSubmit = methods.handleSubmit(async (data) => {
        const requestObj = {
            url: `https://formspree.io/f/${formSpreeFormAPI}`,
            headers: {
                'Content-Type': 'application/json',
            },
            dataSend: data,
        };

        const { submitForSpreeForm } = await import(
            '@/routesapi/FormSpree/index.tsx'
        );
        submitForSpreeForm(requestObj).then((r: { response: any }) => {
            if (r.response) {
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
            }
        });
    });

    return (
        <Suspense fallback={null}>
            <FormProvider {...methods}>
                <section
                    id="contact"
                    className={styles.contactMainPageContainer}
                >
                    <h1 className="sectionTitle">Contact</h1>
                    <form
                        noValidate
                        // action=""
                        // onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="formGroup">
                            <InputHomePage {...name_validation} />
                        </div>
                        <div className="formGroup">
                            <InputHomePage {...email_validation} />
                        </div>
                        <div className="formGroup">
                            <InputHomePage {...desc_validation} />
                        </div>
                        <button
                            type="submit"
                            onClick={onSubmit}
                            disabled={!methods.formState.isValid}
                        >
                            {/* <GrMail /> */}
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M23,20 L23,6 L12,15 L1,6 L1,20 L23,20 Z M12,12 L22,4 L2,4 L12,12 Z"
                                ></path>
                            </svg>
                            Submit
                        </button>
                    </form>
                    <div className={styles.contactMainPageMessageContainer}>
                        {success && <p>Request Send Successfully </p>}
                    </div>
                </section>
            </FormProvider>
        </Suspense>
    );
}

export default ContactMainPage;
