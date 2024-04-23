import React, { useState } from 'react';
import FileUpload from "../Components/FileUpload";
import useMeasurements from "../Services/GetMeasurments";

const Project: React.FC = () => {

    const [gender, setGender] = useState('');
    const { measurements, error, fetchMeasurements } = useMeasurements();

    const handleFetchClick = () => {
        if (gender) {
            fetchMeasurements(gender);
        }
    };

    return (
        <div className="flex flex-col mt-10 items-center justify-start min-h-screen">

            <div className="text-center">
                <h1 className="mb-4">Project</h1>
                <FileUpload />
            </div>

            <div className="flex flex-col mt-10">
                <div>
                    <label htmlFor="genderSelect">Select Gender:</label>
                    <select id="genderSelect" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="NEUTRAL">Neutral</option>
                    </select>
                </div>
                <button onClick={handleFetchClick}>Fetch Measurements</button>
            </div>

            <div className="flew flex-col">
                {error && <p>Error fetching measurements: {error}</p>}
                <h2>Measurements</h2>
                <ul>
                    {Object.entries(measurements).map(([key, value]) => (
                        <li key={key}>
                            {key}: {value !== undefined ? value : 'N/A'}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Project;
