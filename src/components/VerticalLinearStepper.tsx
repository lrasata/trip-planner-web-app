import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IStep } from "../types.ts";
import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";

interface VerticalLinearStepperProps {
  steps: IStep[];
  handleOnClickNextStep: () => void;
  handleOnSubmitStep: () => void;
  requiredFieldMissing: boolean;
}
const VerticalLinearStepper = ({
  steps,
  handleOnClickNextStep,
  handleOnSubmitStep,
  requiredFieldMissing = false,
}: VerticalLinearStepperProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleOnSubmitStep();
    } else {
      handleOnClickNextStep();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: isMobile ? "100%" : "400px", my: 2 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.component && step.component}
              <Typography>{step.description}</Typography>
              <Stack direction="row" spacing={1} mt={1}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={requiredFieldMissing}
                >
                  {index === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  variant="outlined"
                  disabled={index === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default VerticalLinearStepper;
