// useMeasurements.tsx
import { useState } from 'react';

interface Measurements {
    'ankle left circumference'?: number;
    'arm right length'?: number;
    'bicep right circumference'?: number;
    'calf left circumference'?: number;
    'chest circumference'?: number;
    'forearm right circumference'?: number;
    'head circumference'?: number;
    'height'?: number;
    'hip circumference'?: number;
    'inside leg height'?: number;
    'neck circumference'?: number;
    'shoulder breadth'?: number;
    'shoulder to crotch height'?: number;
    'thigh left circumference'?: number;
    'waist circumference'?: number;
    'wrist right circumference'?: number;
}

const useMeasurements = () => {
    const [measurements, setMeasurements] = useState<Measurements>({});
    const [error, setError] = useState<string>('');

    const fetchMeasurements = async (gender: string) => {
        try {
            const response = await fetch(`http://localhost:5000/process?gender=${gender}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMeasurements(data.Measurements);
        } catch (error: any) {
            setError(error.message);
            console.error(error.message);
        }
    };

    return { measurements, error, fetchMeasurements };
};

export default useMeasurements;
