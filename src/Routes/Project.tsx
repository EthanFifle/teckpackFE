import React, { useState } from 'react';
import FileUpload from "../Components/FileUpload";
import LogoAnimation from "../Components/LogoAnimation";
import VisualAid from "../Images/Visual-Aid.png"

type MeasurementStyleConfig = {
  displayName: string;
  customStyles: string;
};

// Define the type for the measurementStyles object with an index signature
type MeasurementStyles = {
  [key: string]: MeasurementStyleConfig | undefined;
};

const measurementStyles: MeasurementStyles = {
  "height": { displayName: "Height", customStyles: "border-[#AA0EFE] hover:bg-[#AA0EFE]" },
  "head circumference": { displayName: "Head Circumference", customStyles: "border-[#3283FE] hover:bg-[#3283FE]" },
  "neck circumference": { displayName: "Neck Circumference", customStyles: "border-[#85660E] hover:bg-[#85660E]" },
  "shoulder to crotch height": { displayName: "Front Torso", customStyles: "border-[#782AB6] hover:bg-[#782AB6]" },
  "chest circumference": { displayName: "Chest Circumference", customStyles: "border-[#565656] hover:bg-[#565656]" },
  "waist circumference": { displayName: "Waist Circumference", customStyles: "border-[#1C8356] hover:bg-[#1C8356]" },
  "hip circumference": { displayName: "Hip Circumference", customStyles: "border-[#18FF33] hover:bg-[#18FF33]" },
  "wrist right circumference": { displayName: "R Wrist Circumference", customStyles: "border-[#F7E1A0] hover:bg-[#F7E1A0]" },
  "bicep right circumference": { displayName: "R Bicep Circumference", customStyles: "border-[#E2E2E2] hover:bg-[#E2E2E2]" },
  "forearm right circumference": { displayName: "R Forearm Circumference", customStyles: "sm:px-4 border-[#1ABE4F] hover:bg-[#1ABE4F]" },
  "arm right length": { displayName: "R Arm Length", customStyles: "border-[#C3451C] hover:bg-[#C3451C]" },
  "inside leg height": { displayName: "Inside Leg Height", customStyles: "border-[#DEA0FD] hover:bg-[#DEA0FD]" },
  "thigh left circumference": { displayName: "L Thigh Circumference", customStyles: "border-[#FE01FA] hover:bg-[#FE01FA]" },
  "calf left circumference": { displayName: "L Calf Circumference", customStyles: "border-[#315A9B] hover:bg-[#315A9B]" },
  "ankle left circumference": { displayName: "L Ankle Circumference", customStyles: "border-[#FEAF15] hover:bg-[#FEAF15]" },
  "shoulder breadth": { displayName: "Shoulder Breadth", customStyles: "border-[#F8A19F] hover:bg-[#F8A19F]" },

};

const Project: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [measurements, setMeasurements] = useState<Record<string, number>>({});

  const handleResponse = (responseObj: { measurements: string }) => {
    try {

      const measurementsObj = JSON.parse(responseObj.measurements);
      const roundedMeasurements = Object.keys(measurementsObj).reduce((acc, key) => {
        acc[key] = Math.round(measurementsObj[key] * 10) / 10; // Round to the nearest decimal place
        return acc;
      }, {} as Record<string, number>);

      setMeasurements(roundedMeasurements);
    } catch (error) {
      console.error('Error parsing measurements:', error);
      setMeasurements({});
    }
  };

  const handleLoadingChange = (loading: boolean) => {
    setLoading(loading);
  };

  return (
    <div className="flex flex-col mt-10 items-center justify-start min-h-screen">

      <div className="text-center px-5 w-full md:w-auto md:px-0">
        <h1 className="mb-4">Project</h1>
        <FileUpload onResponse={handleResponse} onLoadingChange={handleLoadingChange} />
      </div>

      {loading ? <LogoAnimation className="w-28 h-28"/> : null}

      {Object.keys(measurements).length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2 p-5 sm:p-2">
          <img src={VisualAid} alt="Mesh Graph" className="h-[400px] sm:h-[600px]"/>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
            <h2 className="sm:col-span-2 text-center">Your Measurements:</h2>
            {Object.entries(measurements).map(([key, value]) => {
              const { customStyles, displayName } = measurementStyles[key] || {};
              return (
                <p key={key}
                   className={`text-left mx-10 sm:mx-0 sm:text-center border-l-4 sm:border hover:border-none hover:cursor-pointer hover:font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 pl-4 pr-2 py-2 sm:p-2 rounded shadow-md sm:shadow-sm ${customStyles} sm:border-gray-200`}>
                  {`${displayName || key}: ${value} cm`}
                </p>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default Project;
