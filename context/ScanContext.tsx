import React, { createContext,  ReactNode, useState, useRef } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import { pollMindeeJob, sendImageToMindee } from "@/services";
import { IForm, ScanContextProps, ScanData } from "@/types";
import { mapMindeeFieldsToForm } from "@/utils";

export const ScanContext = createContext<ScanContextProps | undefined>(undefined);

export const ScanProvider = ({ children }: { children: ReactNode }) => {
  const [scan, setScan] = useState<ScanData>({ photoUri: null, croppedUri: null });
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const cameraRef = useRef<any>(null);
  const [statusText, setStatusText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<IForm>({
    name: '',
    firstLastName: '',
    secondLastName: '',
    gender: '',
    birthDate: {
      day: '',
      month: '',
      year: '',
    },
    idNumber: '',
    nationality: '',
    typeOfDocument: '',
    supportNumber: '',
  });

  const takePicture = async (): Promise<void> => {
    if (!cameraRef.current || layout.width === 0) return;

    setIsLoading(true);
    setStatusText('Taking picture...');
    const photo = await cameraRef.current.takePictureAsync({ quality: 1, base64: false });

    const BOX = { top: 0.12, left: 0.05, width: 0.9, height: 230 };
    const previewRatio = layout.width / layout.height;
    const photoRatio = photo.width / photo.height;

    let offsetX = 0;
    let offsetY = 0;
    let scaleFactor = 1;

    if (photoRatio > previewRatio) {
      scaleFactor = photo.height / layout.height;
      offsetX = (photo.width - layout.width * scaleFactor) / 2;
    } else {
      scaleFactor = photo.width / layout.width;
      offsetY = (photo.height - layout.height * scaleFactor) / 2;
    }

    const boxHeightRatio = BOX.height / layout.height;

    let originX = Math.round(BOX.left * layout.width * scaleFactor + offsetX);
    let originY = Math.round(BOX.top * layout.height * scaleFactor + offsetY);
    let width = Math.round(BOX.width * layout.width * scaleFactor);
    let height = Math.round(boxHeightRatio * layout.height * scaleFactor);

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));
    originX = clamp(originX, 0, photo.width - 1);
    originY = clamp(originY, 0, photo.height - 1);
    width = clamp(width, 0, photo.width - originX);
    height = clamp(height, 0, photo.height - originY);

    const result = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ crop: { originX, originY, width, height } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    setScan({ photoUri: photo.uri, croppedUri: result.uri });

    // Generate With Mindee
    setStatusText('Sending image to Mindee...');
    const response = await sendImageToMindee(result.uri);

    if(!response) return;

    // Polling Mindee Job
    setStatusText('Processing document...');
    const data = await pollMindeeJob(response.job.polling_url);

    if(data && data.fields) {
      fillFormWithInference(data.fields);
    }
    
    setScan({ photoUri: "", croppedUri: "" });
    setIsLoading(false);
  };


  const fillFormWithInference  = (fields: any) => {
    const partial = mapMindeeFieldsToForm(fields);

    setForm(prev => {
      const next = { ...prev, ...partial };
      if (partial.birthDate) {
        next.birthDate = { ...prev.birthDate, ...partial.birthDate };
      }
      return next;
    });
  }

  return (
    <ScanContext.Provider value={{ 
      scan, 
      setScan, 
      cameraRef, 
      setLayout, 
      takePicture, 
      statusText, 
      setStatusText,
      isLoading,
      setIsLoading,
      form,
      setForm
    }}>
      {children}
    </ScanContext.Provider>
  );
};

