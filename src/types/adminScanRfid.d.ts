import { PantsInputSchema } from "../zod/pants"
import { ShirtInputSchema } from "../zod/shirt"

interface AdminScanRfidData {
  shirtData?: ShirtInputSchema
  pantsData?: PantsInputSchema
  onResetForm: () => void
}

interface AdminNextStepDestionation {
  nextStepDestination : string
}

interface AdminNewUniformFormNextProps {
  shirtData: ShirtInputSchema
  pantsData: PantsInputSchema
  setShirtData: (data: ShirtInputSchema) => void
  setPantsData: (data: PantsInputSchema) => void
  nextStepDestination : string
}

interface AdminNewUniformFormSubmitProps {
  shirtData: ShirtInputSchema
  pantsData: PantsInputSchema
  setShirtData: (data: ShirtInputSchema) => void
  setPantsData: (data: PantsInputSchema) => void
  onSubmit: () => void;
}