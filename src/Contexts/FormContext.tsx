import React, { createContext, useState, useContext, ReactNode  } from 'react';

// Define the shape of the context state
interface UploadContextState {
  file: File | null;
  previewUrl: string | null;
  measurements: { measurements: string } | null;
  setFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null) => void;
  setMeasurements: (measurements: { measurements: string } | null) => void;
}

// Create the context with a default undefined state
const UploadContext = createContext<UploadContextState | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;  // This defines the children prop explicitly
}

export const UploadProvider: React.FC<ProviderProps>= ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<{ measurements: string } | null>(null);

  // The value that will be provided to the descendants
  const value = {
    file,
    previewUrl,
    measurements,
    setFile,
    setPreviewUrl,
    setMeasurements
  };

  return (
    <UploadContext.Provider value={value}>
      {children}
    </UploadContext.Provider>
  );
};

// Custom hook to use the UploadContext
export const useFormContext = () => {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within a UploadProvider');
  }
  return context;
};
