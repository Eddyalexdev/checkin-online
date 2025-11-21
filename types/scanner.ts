import {  Dispatch, SetStateAction, Ref } from "react";

export interface IForm {
  name: string;
  firstLastName: string;
  secondLastName: string;
  gender: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
  nationality: string;
  typeOfDocument: string;
  idNumber: string;
  supportNumber?: string;
}

export interface ScanData {
  photoUri: string | null;
  croppedUri: string | null;
}

export interface ScanContextProps {
  // State and Refs
  scan: ScanData;
  setScan: Dispatch<SetStateAction<ScanData>>;
  cameraRef: Ref<any>;

  statusText: string;
  setStatusText: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  form: IForm;
  setForm: Dispatch<SetStateAction<IForm>>;

  // Methods
  setLayout: Dispatch<SetStateAction<{ width: number; height: number }>>;
  takePicture: () => Promise<void>;
}

