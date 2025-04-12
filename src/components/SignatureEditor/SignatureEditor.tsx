"use client";

import { useState, useEffect } from "react";
import { buildSignature } from "@/services/signature/signatureBuilder";
import { Editor } from "@monaco-editor/react";
import { Button, Card, Group, Space, Stepper } from "@mantine/core";
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
                    <div>
                        <h3>Gebruik deze handtekening</h3>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <h4>Optie 1</h4>
                        <p>Deze handtekening is klaar om te gebruiken in Outlook.</p>
                        <p>Om deze handtekening te gebruiken, <b>selecteer</b> de handtekening en sleep deze in Outlook.</p>
                        <p>Kopiëren kan ook, zorg dan dat je de handtekening met originele opmaak plakt. Dit kan je doen met rechtersmuisklik - 'plak met originele opmaak'</p>
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
                        </Card>
                        <Space h={"md"}></Space>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>

                        <h4>Optie 2</h4>
                        <p>Klik op de knop hieronder om een e-mail te versturen naar jouw emailadres.</p>
                        <p>Kopieer de ontvangen email in je mailclient naar keuze en plaats deze in de handtekening instellingen.</p>
                        </Card>
                    </div>
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
