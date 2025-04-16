import { useRef, useEffect, useState } from 'react';
import { CameraHelper, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { PerspectiveCamera as PerspectiveCameraImpl } from 'three';

import { ThreeJSCameraWithHelperPros } from '@/entities/ThreeJSCameraWithHelperPros';

function ThreeJSCameraWithHelper(props: ThreeJSCameraWithHelperPros) {
    const { ifHelper, cameraLookAt, objectRef, position, ...rest } = props;

    // const [cameraLookAtState, setCameraLookAtState] = useState(cameraLookAt);
    const [cameraLookAtState] = useState(cameraLookAt);

    const cameraRef = useRef<PerspectiveCameraImpl>(null);
    const helperRef = useRef<CameraHelper>(null);

    const { scene } = useThree();

    useEffect(() => {
        if (cameraRef?.current) {
            cameraRef.current.position.set(
                position[0],
                position[1],
                position[2]
            );
            cameraRef.current.lookAt(
                new Vector3(
                    cameraLookAtState[0],
                    cameraLookAtState[1],
                    cameraLookAtState[2]
                )
            );
            if (objectRef?.current) {
                cameraRef.current.lookAt(objectRef.current.position); // Make it look at the object
            } else {
                if (cameraRef?.current) {
                    cameraRef.current.lookAt(
                        new Vector3(
                            cameraLookAtState[0],
                            cameraLookAtState[1],
                            cameraLookAtState[2]
                        )
                    );
                } else {
                    cameraRef.current.lookAt(new Vector3(0, 0, 0)); // Default to (0,0,0)
                }
            }
        }

        if (ifHelper) {
            if (cameraRef?.current) {
                helperRef.current = new CameraHelper(cameraRef.current);
                scene.add(helperRef?.current); // Add helper to the scene
            }
        }
        return () => {
            if (ifHelper) {
                // Clean up by removing the helper when the component unmounts
                if (helperRef?.current) {
                    scene.remove(helperRef.current);
                    helperRef.current.dispose();
                }
            }
        };
    }, []);

    return <PerspectiveCamera ref={cameraRef} {...rest} />;
}

export default ThreeJSCameraWithHelper;
