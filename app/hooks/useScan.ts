import { ScanContext } from "@/context"
import { useContext } from "react"

export const useScan = () => {
  const context = useContext(ScanContext);
  if(!context) throw new Error("useScan must be used within a ScanProvider");
  return context;
}
