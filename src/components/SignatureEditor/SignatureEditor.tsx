"use client";

import { useState, useEffect } from "react";
import { buildSignature } from "@/services/signature/signatureBuilder";
import { Editor } from "@monaco-editor/react";
import { Button, Group, Stepper } from "@mantine/core";
import { CreateSignatureForm, schema, SignatureFormValues } from "./CreateSignatureForm";
import SignatureUsageInstructions from "./SignatureUsageInstructions";

const SignatureEditor = ({ signatureTemplate }: { signatureTemplate: string }) => {
    const [formValues, setFormValues] = useState<SignatureFormValues>({
        name: "",
        function: "",
        subtitle: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof SignatureFormValues, string>>>({});
    const [isSaved, setIsSaved] = useState(false);
    const [editorValue, setEditorValue] = useState("loading...");
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const savedData = localStorage.getItem("signatureForm");
        if (savedData) {
            const parsedData: SignatureFormValues = JSON.parse(savedData);
            setFormValues(parsedData);
        }
    }, []);

    const handleChange = (field: keyof SignatureFormValues, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
        saveToLocalStorage(field, value);
    };

    const saveToLocalStorage = (field: keyof SignatureFormValues, value: string) => {
        const currentData = localStorage.getItem("signatureForm");
        const parsedData = currentData ? JSON.parse(currentData) : {};
        const updatedData = { ...parsedData, [field]: value };
        localStorage.setItem("signatureForm", JSON.stringify(updatedData));
    };

    const validateForm = () => {
        const result = schema.safeParse(formValues);
        if (!result.success) {
            const validationErrors: Partial<Record<keyof SignatureFormValues, string>> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    validationErrors[err.path[0] as keyof SignatureFormValues] = err.message;
                }
            });
            setErrors(validationErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            localStorage.setItem("signatureForm", JSON.stringify(formValues));
            setIsSaved(true);
        }
    };

    useEffect(() => {
        const signature = buildSignature(formValues, signatureTemplate);
        setEditorValue(signature);
    }, [formValues, signatureTemplate]);

    const nextStep = () => setActiveStep((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));

    return (
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <Stepper active={activeStep} onStepClick={setActiveStep} orientation="horizontal">
                <Stepper.Step label="Stap 1" description="Informatie">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <CreateSignatureForm
                            formValues={formValues}
                            errors={errors}
                            isSaved={isSaved}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </Stepper.Step>
                <Stepper.Step label="Stap 2" description="Preview">
                    <div>
                        <h3>Preview</h3>
                        <iframe
                            srcDoc={editorValue}
                            style={{
                                width: "100%",
                                height: "20rem",
                                border: "1px solid #ccc",
                                marginTop: "10px",
                                backgroundColor: "#fff",
                            }}
                        />
                    </div>
                </Stepper.Step>
                <Stepper.Step label="Stap 3" description="Gebruiken">
                    <SignatureUsageInstructions editorValue={editorValue} />
                </Stepper.Step>
            </Stepper>

            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Terug</Button>
                {activeStep !== 2 && <Button onClick={nextStep}>Volgende</Button>}
            </Group>
        </div>
    );
};

export default SignatureEditor;
