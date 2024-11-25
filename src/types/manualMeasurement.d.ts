interface ManualMeasurementForm {
  uniformType: string
  shoulderLen: number
  sleeve: number
  collarLen: number
  waist: number
  length: number
}

interface ManualMeasurementStepProps {
  manualMeasurementInput: ManualMeasurementForm
  onConfirm: (manualMeasurementInput: ManualMeasurementForm) => void
}