export interface ThreeJSDirectionLightWithHelperPros {
    ifHelper: boolean;
    ifLightHelpers: {
        directionalLightHelper: boolean;
        cameraHelperWithLight: boolean;
    };
    lightShadow: {
        camera: {
            near: number;
            far: number;
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        bias: number;
        mapSize: {
            width: number;
            height: number;
        };
    };
    lightCameraLookAt: [number, number, number];
    castShadow: boolean;
    position: [number, number, number];
    intensity: number;
    shadowMapSize: [number, number];
}
