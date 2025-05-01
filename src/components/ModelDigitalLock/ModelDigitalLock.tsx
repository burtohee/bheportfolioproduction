import React, { Suspense, useState, useEffect, useRef } from 'react';
import styles from './ModelDigitalLockStyles.module.css';

// import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Html, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { ReactLazyLoadImport } from '@/lazyloadings/ReactLazyLoadImport';

import { PasswordPromptPros } from '@/entities/PasswordPromptPros';
const PasswordPrompt: React.FC<PasswordPromptPros> = ReactLazyLoadImport(
    () => import('@/components/ModelDigitalLock/PasswordPrompt3d.tsx')
);

import { DigitalLock3DPros } from '@/entities/DigitalLock3DPros';
const DigitalLock3D: React.FC<DigitalLock3DPros> = ReactLazyLoadImport(
    () => import('@/components/ModelDigitalLock/DigitalLock3D')
);

// import { ModelDigitalLockPasswordInputPros } from '@/entities/ModelDigitalLockPasswordInputPros';
// const ModelDigitalLockPasswordInput: React.FC<ModelDigitalLockPasswordInputPros> =
//     ReactLazyLoadImport(
//         () =>
//             import(
//                 '@/components/ModelDigitalLock/ModelDigitalLockPasswordInput/index.tsx'
//             )
//     );

// import { ThreeJSCameraWithHelperPros } from '@/entities/ThreeJSCameraWithHelperPros';
// const ThreeJSCameraWithHelper: React.FC<ThreeJSCameraWithHelperPros> =
//     ReactLazyLoadImport(
//         () =>
//             import(
//                 '@/components/ModelDigitalLock/ThreeJSCameraWithHelper/index.tsx'
//             )
//     );
// import { ThreeJSDirectionLightWithHelperPros } from '@/entities/ThreeJSDirectionLightWithHelperPros';

// const ThreeJSDirectionLightWithHelper: React.FC<ThreeJSDirectionLightWithHelperPros> =
//     ReactLazyLoadImport(
//         () =>
//             import(
//                 '@/components/ModelDigitalLock/ThreeJSDirectionLightWithHelper/index'
//             )
//     );

function useModelDigitalLockMetaData() {
    const [camerLightLocation] = useState<[number, number, number]>([0, 2, 10]);
    const [camerLocation] = useState<[number, number, number]>([0, 2, 10]);

    return { camerLightLocation, camerLocation };
}

import { ModelDigitalLockPros } from '@/entities/ModelDigitalLockPros';

const ModelDigitalLock = (pros: ModelDigitalLockPros) => {
    const { camerLightLocation, camerLocation } = useModelDigitalLockMetaData();

    const [ifGreen, setIfGreen] = useState(false);
    const [ifRed, setIfRed] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handlePasswordChange = (value: string) => {
        pros.setInputs((values) => ({ ...values, password: value }));
    };

    // const group = useRef();
    // const { nodes, materials, scene, animations } = useGLTF(modelPath);
    // const { actions, names } = useAnimations(animations, group);
    // const mixer = useRef(null);
    // const startTimeRef = useRef(null); // Store start time for elapsed time tracking
    // const actionRef = useRef(null); // Action reference to control playback
    // const [isPlaying, setIsPlaying] = useState(true); // Track animation state

    // useEffect(() => {
    //     if (!group.current || animations.length === 0) return;

    //     mixer.current = new THREE.AnimationMixer(group.current);
    //     const action = mixer.current.clipAction(animations[0]);
    //     actionRef.current = action;
    //     startTimeRef.current = performance.now();

    //     action.play();

    //     return () => {
    //         mixer.current?.stopAllAction(); // Cleanup on unmount
    //     };
    // }, [animations]);

    // useFrame(
    //     (_, delta) => {
    //         if (!isPlaying || !mixer.current || !startTimeRef.current) return; // Skip frame updates if paused

    //         if (mixer.current && startTimeRef.current) {
    //             // const elapsedTime =
    //             //     (performance.now() - startTimeRef.current) / 1000; // Convert ms to seconds
    //             const elapsedTime = performance.now() - startTimeRef.current;
    //             // console.log(elapsedTime);
    //             if (elapsedTime >= props.playDuration) {
    //                 // actionRef.current.stop();
    //                 actionRef.current.paused = true;
    //                 setIsPlaying(false);
    //             }
    //             mixer.current?.update(delta); // Update animation on each frame
    //         }
    //     },
    //     [actions, names, props.playDuration]
    // );

    useEffect(() => {
        // if (pros.inputs) {
        if (
            pros.inputs?.password.length === 4 &&
            pros.inputs?.password === pros.credential
        ) {
            setIfGreen(true);
            setIfRed(false);
            // pros.setInputs({ ...pros.inputs, password: '' });

            timeoutRef.current = setTimeout(() => {
                pros.setIfLogIn(true);
            }, 800);
        }
        if (
            (pros.inputs?.password.length === 4 &&
                pros.inputs?.password !== pros.credential) ||
            pros.inputs?.password.length > 4
        ) {
            setIfGreen(false);
            setIfRed(true);
            // pros.setInputs({ ...pros.inputs, password: '' });
        }

        //resetting
        if (
            pros.inputs?.password.length === 4 ||
            pros.inputs?.password.length > 4
        ) {
            timeoutRef.current = setTimeout(() => {
                // console.log(123);
                setIfGreen(false);
                setIfRed(false);
                pros.setInputs({ ...pros.inputs, password: '' });
            }, 500);
        }
        // }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [pros.inputs?.password]);

    return (
        <>
            <section className={styles.ModelDigitalLockSectionContainer}>
                <div className={styles.ModelDigitalLockContentContainer}>
                    <div className={styles.ModelDigitalLockCanvasContainer}>
                        <Canvas shadows>
                            <Suspense
                                fallback={
                                    <Html>
                                        <div style={{ color: 'white' }}>
                                            Loading
                                        </div>
                                    </Html>

                                    // <></>
                                }
                            >
                                {/* Lights to illuminate the model */}
                                {/* <axesHelper args={[2]} /> */}
                                <ambientLight intensity={0.8} />
                                <directionalLight
                                    position={camerLightLocation}
                                />

                                {/* Add Perspective Camera for the 3D view */}

                                {/* <PerspectiveCamera
                                    makeDefault
                                    position={camerLocation}
                                /> */}

                                {/* <ThreeJSCameraWithHelper
                                    ifHelper={true}
                                    cameraLookAt={[0, 0, 0]}
                                    objectRef={null}
                                    position={camerLocation}
                                    fov={35}
                                    near={0.1}
                                    far={30}
                                    makeDefault={true}
                                ></ThreeJSCameraWithHelper> */}

                                {/* <ThreeJSDirectionLightWithHelper
                                    ifHelper={true}
                                    ifLightHelpers={{
                                        directionalLightHelper: true,
                                        cameraHelperWithLight: true,
                                    }}
                                    lightShadow={{
                                        camera: {
                                            near: 1,
                                            far: 20,
                                            left: -3,
                                            right: 3,
                                            top: 3,
                                            bottom: -1.2,
                                        },
                                        bias: -0.001,
                                        mapSize: {
                                            width: 2048,
                                            height: 2048,
                                        },
                                    }}
                                    lightCameraLookAt={[0, 0, 0]}
                                    castShadow={true}
                                    position={camerLightLocation}
                                    intensity={1}
                                    shadowMapSize={[1024, 1024]}
                                ></ThreeJSDirectionLightWithHelper> */}

                                <Suspense
                                    fallback={
                                        <Html>
                                            <div style={{ color: 'white' }}>
                                                Loading
                                            </div>
                                        </Html>

                                        // <></>
                                    }
                                >
                                    <DigitalLock3D
                                        // ref={objectRef}
                                        scale={[1, 1, 1]}
                                        position={[0, 0, 0]}
                                        password={pros.inputs?.password}
                                        setPassword={handlePasswordChange}
                                        ifGreen={ifGreen}
                                        ifRed={ifRed}
                                        // playDuration={1 * 1000}
                                    />
                                </Suspense>

                                {/* OrbitControls to allow the user to rotate the view */}
                                <OrbitControls
                                    enableZoom={false}
                                    enableRotate={false}
                                    enablePan={false}
                                    position0={camerLocation}
                                />

                                <PasswordPrompt credential={pros.credential} />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ModelDigitalLock;
