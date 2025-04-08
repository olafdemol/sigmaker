"use client";

import { useState, useEffect } from "react";
import { buildSignature } from "@/services/signature/signatureBuilder";
import { Editor } from "@monaco-editor/react";
import { Button, Group, Stepper } from "@mantine/core";
import { CreateSignatureForm } from "../Form/CreateSignatureForm";

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

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(editorValue).then(
            () => {
                alert("Copied to clipboard!");
            },
            (err) => {
                console.error("Failed to copy text: ", err);
            }
        );
    };

    return (
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <Stepper active={activeStep} onStepClick={setActiveStep} orientation="horizontal">
                <Stepper.Step label="Stap 1" description="Informatie">
                    <CreateSignatureForm />
                </Stepper.Step>
                <Stepper.Step label="Stap 2" description="Preview">
                    <div>
                        <h3>HTML Preview</h3>
                        <iframe
                            srcDoc={editorValue}
                            style={{
                                width: "100%",
                                height: "20rem",
                                border: "1px solid #ccc",
                                marginTop: "10px",
                            }}
                        />
                    </div>
                </Stepper.Step>
                <Stepper.Step label="Stap 3" description="Gebruiken">
                    <div>
                        <Editor
                            height="20rem"
                            defaultLanguage="html"
                            value={editorValue} // Use the state value for the editor
                            options={{
                                readOnly: true,
                            }}
                        />
                        <Button onClick={handleCopyToClipboard} style={{ marginTop: "10px" }} fullWidth={false}>
                            Copy to Clipboard
                        </Button>
                        <p style={{ marginTop: "10px" }}>Kopieer de tekst en plak deze in outlook</p>
                    </div>
                </Stepper.Step>
            </Stepper>

            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </div>
    );
};

export default ReadOnlyEditor;
