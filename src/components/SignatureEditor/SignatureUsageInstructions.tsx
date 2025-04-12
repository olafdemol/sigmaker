"use client";

import { useState } from "react";
import { Card, Space, Button, TextInput } from "@mantine/core";
import { sendMail } from "@/actions/sendMail";

type SignatureUsageInstructionsProps = {
    editorValue: string;
};

const SignatureUsageInstructions: React.FC<SignatureUsageInstructionsProps> = ({ editorValue }) => {
    const [email, setEmail] = useState("");

    const handleSendMail = async () => {
        try {
            await sendMail(email, "Your Signature", editorValue);
            alert("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email.");
        }
    };

    return (
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
                <p style={{ maxWidth: "600px" }}>
                    Kopieer de ontvangen email in je mailclient naar keuze en plaats deze in de handtekening instellingen.
                </p>
                <TextInput
                    label="Emailadres"
                    placeholder="Voer je emailadres in"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    style={{ maxWidth: "400px" }}
                />
                <Space h={"sm"} />
                <Button onClick={handleSendMail} style={{ maxWidth: "400px" }}>
                    Verstuur e-mail
                </Button>
            </Card>
        </div>
    );
};

export default SignatureUsageInstructions;
