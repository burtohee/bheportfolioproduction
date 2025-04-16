import { Html } from '@react-three/drei';
import { useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import { PasswordPromptPros } from '@/entities/PasswordPromptPros';

const PasswordPrompt = ({ credential }: PasswordPromptPros) => {
    const { camera } = useThree();
    const [isVisible, setIsVisible] = useState(true);

    useFrame(() => {
        // Get the camera's world rotation as Euler angles
        const rotation = camera.rotation;

        // Azimuth (Yaw) angle around the Y-axis
        let azimuthAngle = rotation.y; // Yaw in radians

        // Pitch (Vertical rotation) angle around the X-axis
        let pitchAngle = rotation.x; // Pitch in radians

        // Check horizontal (azimuth) and vertical (pitch) ranges
        // Horizontal range: -π/2 to π/2 (Yaw angle, -90° to 90°)
        // Vertical range: -π/4 to π/4 (Pitch angle, -45° to 45°)
        const isHorizontalVisible =
            azimuthAngle >= -Math.PI / 2 && azimuthAngle <= Math.PI / 2;
        const isVerticalVisible =
            pitchAngle >= -Math.PI / 2.5 && pitchAngle <= Math.PI / 2.5;

        // If both horizontal and vertical are within the range, show the div
        setIsVisible(isHorizontalVisible && isVerticalVisible);
    });

    return isVisible ? (
        <Html position={[0, 2.3, 0.5]} transform>
            <div style={{ width: 'max-content', fontSize: '0.8rem' }}>
                <div>{`Please enter ${credential}`}</div>
            </div>
        </Html>
    ) : null;
};

export default PasswordPrompt;
