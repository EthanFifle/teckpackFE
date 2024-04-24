import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { apiService } from '../Services/TeckPackBE';
import { useFormContext } from '../Contexts/FormContext';

const FileUpload: React.FC<{
  onLoadingChange: (loading: boolean) => void
}> = ({ onLoadingChange }) => {

  const { file, setFile, previewUrl, setPreviewUrl, measurements, setMeasurements } = useFormContext();
  const [gender, setGender] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, [setFile, setPreviewUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"]
    },
    maxFiles: 1
  });

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleRemoveFile = () => {
    URL.revokeObjectURL(previewUrl!);
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !gender) {
      alert('Please select a file and specify the gender.');
      return;
    }

    setLoading(true);
    onLoadingChange(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('gender', gender);

    try {
      const response = await apiService.uploadFile(formData);
      setMeasurements(response);
    } catch (error) {
      alert('Failed to upload file.');
    } finally {
      setLoading(false);
      onLoadingChange(false); // Notify parent component that loading has ended
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border border-gray-300 rounded-md shadow-sm">
      <div {...getRootProps()}
           className="flex flex-col md:w-96 md:h-72 justify-center items-center p-2 border-2 border-dashed rounded-md border-gray-300 text-gray-700 cursor-pointer">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop image here...</p> :
            (previewUrl ?
                <div className="relative h-full">
                  <img src={previewUrl} alt="Preview" className="max-w-full max-h-full rounded-md"/>
                  <button type="button" onClick={handleRemoveFile}
                          className="absolute top-0 right-0 px-1.5 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md cursor-pointer">
                    X
                  </button>
                </div> :
                <>
                  <p>Drag & Drop your image</p>
                  <p>- OR -</p>
                  <p>click to select files</p>
                </>
            )
        }
      </div>
      <div className="mt-4">
        <label htmlFor="gender" className="mr-2">Gender:</label>
        <select id="gender" name="gender" value={gender} onChange={handleGenderChange}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 border rounded-md shadow-sm">
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="NEUTRAL">Neutral</option>
        </select>
      </div>
      <button type="submit"
              disabled={isLoading}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md cursor-pointer">
        {isLoading ? 'Analyzing...' : 'Upload'}
      </button>
    </form>
  );
};

export default FileUpload;
