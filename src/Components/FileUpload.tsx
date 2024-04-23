import React, { useState } from 'react';
import { apiService } from '../Services/TeckPackBE';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [gender, setGender] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file || !gender) {
            alert('Please select a file and specify the gender.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('gender', gender);

        const responseMessage = await apiService.uploadFile(formData);
        alert(responseMessage);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="file">File:</label>
                <input type="file" id="file" name="file" onChange={handleFileChange} />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" value={gender} onChange={handleGenderChange}>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="NEUTRAL">Neutral</option>
                </select>
            </div>
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
