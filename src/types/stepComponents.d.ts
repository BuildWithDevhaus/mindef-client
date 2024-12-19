interface ManualMeasurementForm {
  uniformType: string
  shoulderLen: string
  sleeve: string
  collarLen: string
  waist: string
  length: string
}

interface StepProps {
  backOption?: boolean
}

interface StepActivityProps extends StepProps {
  drawUniform?: boolean = true
}

interface ManualMeasurementFormStepProps extends StepProps {
  manualMeasurementInput: ManualMeasurementForm
  onConfirm: (manualMeasurementInput: ManualMeasurementForm) => void
}

interface ManualMeasurementFormStepNextProps extends ManualMeasurementFormStepProps {
  nextStepDirection: string
}

interface ManualMeasurementFormStepSubmitProps extends ManualMeasurementFormStepProps {
  onSubmit: () => void
}

interface ResultMeasurement {
  title: string;
  image: string;
  row: number;
  rack: string;
  no: number;
}