import { useThree } from '@react-three/fiber';
import { DirectionalLightHelper, CameraHelper, DirectionalLight } from 'three';
import { useRef, useEffect, useState } from 'react';

import { ThreeJSDirectionLightWithHelperPros } from '@/entities/ThreeJSDirectionLightWithHelperPros';

function ThreeJSDirectionLightWithHelper(
    props: ThreeJSDirectionLightWithHelperPros
) {
    const {
        ifHelper,
        ifLightHelpers,
        lightShadow,
        lightCameraLookAt,
        ...rest
    } = props;

    // const [lightCameraLookAtState, setLightCameraLookAtState] =
    //     useState(lightCameraLookAt);

    const [lightCameraLookAtState] = useState(lightCameraLookAt);
    const { scene } = useThree(); // Access the Three.js scene
    const lightRef = useRef<DirectionalLight | null>(null);
    const directionalLightHelperRef = useRef<DirectionalLightHelper>(null);
    const cameraHelperWithLightRef = useRef<CameraHelper>(null);

    useEffect(() => {
        if (lightRef.current && lightShadow) {
            // Adjust shadow properties for better coverage
            lightRef.current.shadow.camera.near = lightShadow?.camera?.near; // Near plane
            lightRef.current.shadow.camera.far = lightShadow?.camera?.far; // Far plane
            lightRef.current.shadow.camera.left = lightShadow?.camera?.left; // Left frustum edge
            lightRef.current.shadow.camera.right = lightShadow?.camera?.right; // Right frustum edge
            lightRef.current.shadow.camera.top = lightShadow?.camera?.top; // Top frustum edge
            lightRef.current.shadow.camera.bottom = lightShadow?.camera?.bottom; // Bottom frustum edge
            lightRef.current.shadow.bias = lightShadow?.bias; // Helps with shadow acne
            // Make sure the shadow map is updated
            lightRef.current.shadow.mapSize.width = lightShadow.mapSize?.width; // Higher value = more detail
            lightRef.current.shadow.mapSize.height =
                lightShadow.mapSize?.height; // Higher value = more detail
        }
        if (lightCameraLookAtState) {
            if (lightRef.current) {
                // chnage lightRef (shadow camera) target position
                lightRef.current.target.position.set(
                    lightCameraLookAtState[0],
                    lightCameraLookAtState[1],
                    lightCameraLookAtState[2]
                );
                lightRef.current.target.updateMatrixWorld();
            }
        }

        if (ifHelper) {
            if (
                lightRef.current &&
                (ifLightHelpers?.directionalLightHelper ||
                    ifLightHelpers?.cameraHelperWithLight)
            ) {
                if (ifLightHelpers.directionalLightHelper) {
                    directionalLightHelperRef.current =
                        new DirectionalLightHelper(
                            lightRef.current,
                            5,
                            'white'
                        );
                    scene.add(directionalLightHelperRef.current);
                }

                if (ifLightHelpers.cameraHelperWithLight) {
                    cameraHelperWithLightRef.current = new CameraHelper(
                        lightRef.current.shadow.camera
                    );
                    scene.add(cameraHelperWithLightRef.current);
                }
            }
        }

        return () => {
            if (ifHelper) {
                if (directionalLightHelperRef.current) {
                    scene.remove(directionalLightHelperRef.current);
                    directionalLightHelperRef.current.dispose();
                }

                if (cameraHelperWithLightRef.current) {
                    scene.remove(cameraHelperWithLightRef.current);
                    cameraHelperWithLightRef.current.dispose();
                }
            }
        };
    }, [{}]);

    return <directionalLight ref={lightRef} {...rest} />;
}

export default ThreeJSDirectionLightWithHelper;
