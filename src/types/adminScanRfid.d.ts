interface AdminScanRfidData {
  shirtData?: Shirt
  pantsData?: Pants
}

interface AdminScanRfidFunction {
  setShirtData: (data: Shirt) => void
  setPantsData: (data: Pants) => void
  nextStepDestination? : string
}