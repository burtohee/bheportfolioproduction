export interface DigitalLock3DPros {
    scale: [number, number, number];
    position: [number, number, number];
    password: string;
    setPassword: (value: string) => void;
    ifGreen: boolean;
    ifRed: boolean;
}
