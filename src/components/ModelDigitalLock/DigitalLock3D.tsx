import { useRef, useEffect, useState, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
// import modelPath from '@/assets/models/untitledv6.glb';
import { Color, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';

import { ThreeEvent } from '@react-three/fiber';

const modelPath = '/src/assets/models/untitledv6.glb';

import { DigitalLock3DPros } from '@/entities/DigitalLock3DPros';
function DigitalLock3D(props: DigitalLock3DPros) {
    const { nodes, materials } = useGLTF(modelPath);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [originalColor, setOriginalColor] = useState<
        Color | null | (() => Color)
    >();
    const [targetMaterial, setTargetMaterial] = useState(null);

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
    const startTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            if (targetMaterial && originalColor) {
                Object.entries(materials).forEach(([name, material]) => {
                    if (
                        material instanceof MeshBasicMaterial ||
                        material instanceof MeshStandardMaterial
                    ) {
                        if (
                            name === targetMaterial &&
                            originalColor instanceof Color
                        ) {
                            material.color = originalColor; // Restore original color
                        }
                        material.needsUpdate = true;
                    }
                });
            }
        }, 500);
    };

    const changeIndicatorColor = useCallback(
        (targetName: string, newColor: string) => {
            let tempOriginalColor = null;
            let tempTargetMaterial = null;
            Object.entries(materials).forEach(([name, material]) => {
                if (
                    material instanceof MeshBasicMaterial ||
                    material instanceof MeshStandardMaterial
                ) {
                    if (name === targetName) {
                        tempTargetMaterial = name;
                        tempOriginalColor = material.color; // Store original color
                        material.color = new Color(newColor); // Change to green
                    }
                    material.needsUpdate = true;
                }
            });

            setOriginalColor(tempOriginalColor);
            setTargetMaterial(tempTargetMaterial);
        },
        []
    );

    useEffect(() => {
        if (props.ifGreen) {
            changeIndicatorColor(
                'KeypadDoorLockIndicatorGreenMaterial',
                '#00ff00'
            );
        }
        if (props.ifRed) {
            changeIndicatorColor(
                'KeypadDoorLockIndicatorRedMaterial',
                '#f51505'
            );
        }
        startTimer(); // Start the timeout

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [props.ifGreen, props.ifRed]); // Only re-run if these props change

    const handleKeyPress = useCallback(
        (event: ThreeEvent<MouseEvent>) => {
            let originalColor: Color | null = null;
            if (event.eventObject.name) {
                setTimeout(() => {
                    Object.entries(materials).map(
                        ([materialName, material]) => {
                            // these are the material names that can't be changed color
                            if (
                                material instanceof MeshBasicMaterial ||
                                material instanceof MeshStandardMaterial
                            ) {
                                if (
                                    materialName ===
                                    `KeypadDoorLock0${event.eventObject.name}BaseMaterial`
                                ) {
                                    originalColor = material.color;
                                    material.color = new Color('#c5c9c5');
                                }
                                material.needsUpdate = true;
                            }
                        }
                    );
                });
                setTimeout(() => {
                    Object.entries(materials).map(
                        ([materialName, material]) => {
                            // these are the material names that can't be changed color
                            if (
                                material instanceof MeshBasicMaterial ||
                                material instanceof MeshStandardMaterial
                            ) {
                                if (
                                    materialName ===
                                    `KeypadDoorLock0${event.eventObject.name}BaseMaterial`
                                ) {
                                    if (originalColor !== null) {
                                        material.color = originalColor;
                                    }
                                }
                                material.needsUpdate = true;
                            }
                        }
                    );
                }, 500);
                props.setPassword(
                    props.password.concat(event.eventObject.name)
                );
            }
        },
        [props.password]
    );

    return (
        // <group ref={group} {...props} dispose={null}>
        <group {...props} dispose={null}>
            <group scale={0.025}>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={39.37}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock00Base as Mesh).geometry}
                        material={materials.KeypadDoorLock00BaseMaterial}
                        name="0"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock01Base as Mesh).geometry}
                        material={materials.KeypadDoorLock01BaseMaterial}
                        name="1"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock02Base as Mesh).geometry}
                        material={materials.KeypadDoorLock02BaseMaterial}
                        name="2"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock03Base as Mesh).geometry}
                        material={materials.KeypadDoorLock03BaseMaterial}
                        name="3"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock04Base as Mesh).geometry}
                        material={materials.KeypadDoorLock04BaseMaterial}
                        name="4"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock05Base as Mesh).geometry}
                        material={materials.KeypadDoorLock05BaseMaterial}
                        name="5"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock06Base as Mesh).geometry}
                        material={materials.KeypadDoorLock06BaseMaterial}
                        name="6"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock07Base as Mesh).geometry}
                        material={materials.KeypadDoorLock07BaseMaterial}
                        name="7"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock08Base as Mesh).geometry}
                        material={materials.KeypadDoorLock08BaseMaterial}
                        name="8"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock09Base as Mesh).geometry}
                        material={materials.KeypadDoorLock09BaseMaterial}
                        name="9"
                        onClick={(event) => {
                            handleKeyPress(event);
                        }}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            (nodes.KeypadDoorLock0PoundBase as Mesh).geometry
                        }
                        material={materials.KeypadDoorLock0PoundBaseMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            (nodes.KeypadDoorLock0StarBase as Mesh).geometry
                        }
                        material={materials.KeypadDoorLock0StarBaseMaterial}
                    />
                </group>
                <group scale={39.37}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock00 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock01 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock02 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock03 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock04 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock05 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock06 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock07 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock08 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock09 as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock0Pound as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={(nodes.KeypadDoorLock0Star as Mesh).geometry}
                        material={materials.KeypadDoorLockKeysMaterial}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.KeypadDoorLockBottomKnot as Mesh).geometry}
                    material={materials.KeypadDoorLockBottomKnotMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={39.37}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.KeypadDoorLockBox as Mesh).geometry}
                    material={materials.KeypadDoorLockBoxMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={39.37}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        (nodes.KeypadDoorLockIndicatorGreen as Mesh).geometry
                    }
                    material={materials.KeypadDoorLockIndicatorGreenMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={39.37}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        (nodes.KeypadDoorLockIndicatorRed as Mesh).geometry
                    }
                    material={materials.KeypadDoorLockIndicatorRedMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={39.37}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.KeypadDoorLockKeyPadBase as Mesh).geometry}
                    material={materials.KeypadDoorLockKeyPadBaseMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={39.37}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.KeypadDoorLockTopKnot as Mesh).geometry}
                    material={materials.KeypadDoorLockTopKnotMaterial}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={39.37}
                />
            </group>
        </group>
    );
}

useGLTF.preload(modelPath);

export default DigitalLock3D;
