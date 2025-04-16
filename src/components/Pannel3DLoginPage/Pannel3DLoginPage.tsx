import { useState } from 'react';
import styles from './Pannel3DLoginPageStyles.module.css';
import { Pannel3DLoginPageDataType } from '@/entities/Pannel3DLoginPageDataType';

interface Pannel3DLoginPagePros {
    datas: Pannel3DLoginPageDataType;
    datasSet: React.Dispatch<React.SetStateAction<Pannel3DLoginPageDataType>>;
}

const Pannel3DLoginPage = ({ datas, datasSet }: Pannel3DLoginPagePros) => {
    const [ifExpanded, setIfExpanded] = useState(false);
    const toggleExpande = () => {
        setIfExpanded(!ifExpanded);
    };

    const isDisabled = (key: KeyType): boolean => {
        let result = Object.entries(datas).some(([_, otherVal]) => {
            if (otherVal.relatedTo?.includes(key) && otherVal.ifChecked) {
                return true;
            }
        });
        return result;
    };

    // console.log(isDisabled);

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, checked } = event.target;

        datasSet((prev) => {
            const key = id as keyof Pannel3DLoginPageDataType;

            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    ifChecked: checked,
                },
            };
        });
    };

    // console.log(datas);

    return (
        <>
            <div className={styles.pannel3DLoginPageContainer}>
                <div className={styles.controls3DModelContainer}>
                    <div className={styles.control3DModelHeaderContainer}>
                        <i
                            className={styles.control3DModelHeaderArrow}
                            onClick={toggleExpande}
                        >
                            <svg
                                width="12"
                                height="8"
                                viewBox="0 0 9 5"
                                xmlns="http://www.w3.org/2000/svg"
                                // class="leva-c-cHvNmv"
                                style={
                                    ifExpanded
                                        ? {
                                              transform: 'rotate(0deg)',
                                          }
                                        : {
                                              transform: 'rotate(-90deg)',
                                          }
                                }
                            >
                                <path d="M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z"></path>
                            </svg>
                        </i>
                        <div className={styles.control3DModelHeaderBurger}>
                            <svg
                                width="20"
                                height="10"
                                viewBox="0 0 28 14"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="2" cy="2" r="2"></circle>
                                <circle cx="14" cy="2" r="2"></circle>
                                <circle cx="26" cy="2" r="2"></circle>
                                <circle cx="2" cy="12" r="2"></circle>
                                <circle cx="14" cy="12" r="2"></circle>
                                <circle cx="26" cy="12" r="2"></circle>
                            </svg>
                        </div>
                        {/* <i className={styles.control3DModelHeaderSearch}>
                            <svg
                                    width="12"
                                    height="8"
                                    viewBox="0 0 9 5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="leva-c-cHvNmv"
                                    style={{
                                        transform: 'rotate(0deg)',
                                    }}
                                >
                                    <path d="M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z"></path>
                                </svg>
                        </i> */}
                    </div>

                    <div
                        className={styles.control3DModelValuesContainer}
                        style={
                            ifExpanded
                                ? {
                                      //   display: 'block',
                                      height: '120px',
                                  }
                                : {
                                      //   display: 'none',
                                      height: '0px',
                                  }
                        }
                    >
                        {Object.entries(datas).map(([key]) => {
                            const typedKey =
                                key as keyof Pannel3DLoginPageDataType; // Explicitly cast key
                            return (
                                <div
                                    key={typedKey}
                                    className={
                                        styles[
                                            `control3DModelValuesItemContainer`
                                        ] || ''
                                    }
                                >
                                    <div
                                        className={
                                            styles[
                                                `control3DModelValuesLabelSVGContainer`
                                            ]
                                        }
                                    >
                                        <label
                                            htmlFor={`${typedKey}`}
                                            data-state="closed"
                                            className={
                                                styles[`controls3DModelLabel`]
                                            }
                                        >
                                            {typedKey}
                                        </label>
                                        <div
                                            className={
                                                styles[
                                                    `control3DModelValuesSvgContainer`
                                                ]
                                            }
                                            title={`Click to show ${typedKey} helper`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                                            </svg>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            styles[
                                                `control3DModelValuesInputBoxContainer`
                                            ]
                                        }
                                    >
                                        <input
                                            className={
                                                styles[
                                                    `control3DModelValuesInputBoxInput`
                                                ]
                                            }
                                            id={`${typedKey}`}
                                            name={`${typedKey}`}
                                            type="checkbox"
                                            checked={
                                                datas[typedKey].ifChecked ||
                                                false
                                            } // Retrieve checked state from checkedItems
                                            onChange={handleCheckboxChange}
                                            disabled={isDisabled(
                                                typedKey as KeyType
                                            )}
                                        ></input>
                                        <label htmlFor={`${typedKey}`}>
                                            <svg
                                                className={
                                                    styles[
                                                        `control3DModelValuesInputBoxSvg`
                                                    ]
                                                }
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                stroke="#fefefe"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                ></path>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pannel3DLoginPage;
