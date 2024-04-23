import React, {useState} from 'react';
import FileUpload from "../Components/FileUpload";

const Project: React.FC = () => {

  const [gender, setGender] = useState('');

  return (
    <div className="flex flex-col mt-10 items-center justify-start min-h-screen">

      <div className="text-center">
        <h1 className="mb-4">Project</h1>
        <FileUpload/>
      </div>

    </div>
  );
};

export default Project;
