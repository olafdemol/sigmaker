"use client";

import { useState, useEffect } from "react";
import { buildSignature } from "@/services/signature/signatureBuilder";
import { Editor } from "@monaco-editor/react";
import { Button, Card, Group, Space, Stepper } from "@mantine/core";
import { CreateSignatureForm } from "../Form/CreateSignatureForm";
import SignatureUsageInstructions from "./SignatureUsageInstructions";

type ReadOnlyEditorProps = {
    signatureTemplate: string;
};

const ReadOnlyEditor: React.FC<ReadOnlyEditorProps> = ({ signatureTemplate }) => {
    const [editorValue, setEditorValue] = useState("loading...");
    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => setActiveStep((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));

    useEffect(() => {
        const storedData = localStorage.getItem("signatureForm");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                const signature = buildSignature(parsedData, signatureTemplate);
                setEditorValue(signature); // Update the editor value with the generated signature
            } catch (error) {
                console.error("Error parsing signatureForm data:", error);
            }
        }
    }, [signatureTemplate]);

    return (
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <Stepper active={activeStep} onStepClick={setActiveStep} orientation="horizontal">
                <Stepper.Step label="Stap 1" description="Informatie">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <CreateSignatureForm />
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
                    <SignatureUsageInstructions editorValue={editorValue} /> {/* Updated component name */}
                </Stepper.Step>
            </Stepper>

            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Terug</Button>
                {
                    activeStep != 2 ? (
                        <Button onClick={nextStep}>Volgende</Button>
                    ) : (
                        <></>
                    )
                }
            </Group>
        </div>
    );
};

export default ReadOnlyEditor;
