import { PantsInputSchema } from "../zod/pants"
import { ShirtInputSchema } from "../zod/shirt"

interface AdminScanRfidData {
  shirtData?: ShirtInputSchema
  pantsData?: PantsInputSchema
  onResetForm: () => void
}

interface AdminScanRfidFunction {
  setShirtData: (data: ShirtInputSchema) => void
  setPantsData: (data: PantsInputSchema) => void
  nextStepDestination? : string
}

interface AdminNewUniformFormNextProps {
  shirtData?: ShirtInputSchema
  pantsData?: PantsInputSchema
  onConfirm: (data: any) => void
  nextStepDestination : string
}

interface AdminNewUniformFormSubmitProps {
  shirtData: ShirtInputSchema
  pantsData: PantsInputSchema
  onConfirm: (data: any) => void
  onSubmit: () => void;
}