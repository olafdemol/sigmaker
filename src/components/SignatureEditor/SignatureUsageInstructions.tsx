"use client";

import { useState } from "react";
import { Card, Space, Button, TextInput, Modal } from "@mantine/core";
import { sendMail } from "@/actions/sendMail";
import { showNotification } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

type SignatureUsageInstructionsProps = {
    editorValue: string;
};

const SignatureUsageInstructions: React.FC<SignatureUsageInstructionsProps> = ({ editorValue }) => {
    const [email, setEmail] = useState("");
    const [opened, { open, close }] = useDisclosure(false);

    const handleSendMail = async () => {
        try {
            let mail = `<p>Onderstaand vind je jouw nieuwe handtekening.</p>
                <p>Voor het instellen graag de volgende stappen goed doorlezen/volgen:</p>
                <ol>
                    <li>Zorg dat je eerst het font van jouw e-mails hebt aangepast naar “Arial 11” zoals verzocht in de editor, stap 2.</li>
                    <li>Kopieer/selecteer onderstaande handtekening.</li>
                    <li>Ga in het menu via Bestand - Opties – E-mail - Handtekeningen naar het handtekening selectiescherm.</li>
                    <li>Maak een nieuwe handtekening aan of bewerk een bestaande.</li>
                    <li>Let op: plak de nieuwe handtekening met behoudt van de originele opmaak. Dit kan je doen met de rechter muisknop – ‘opmaak van bron behouden’. Het lettertype van de handtekening niet handmatig aanpassen.</li>
                    <li>Controleer of de nieuwe handtekening gekoppeld is aan je standaardhandtekening instellingen (rechtsboven in het handtekening selectiescherm).</li>
                    <li>Indien je met verschillende handtekeningen werkt, bijv. door het gebruik van meerdere e-mailadressen, deze ook graag aanpassen.</li>
                </ol>
                <br/><br/><br/>`
                + editorValue;
            await sendMail(email, "FloriSignature - your signature", mail);

            // Show success dialog
            open();
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email.");
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="E-mail verzonden!">
                <img
                        src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
                        alt="Funny gif"
                        style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                    />
                <Button mt={20} onClick={close}>Ok</Button>
            </Modal>
            <div>
                <h3>Gebruik de handtekening</h3>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <p>Verstuur de handtekening met de knop. Je ontvangt daarna een e-mail met de nieuwe footer en een uitleg hoe je deze kan gebruiken.</p>

                    <TextInput
                        label="Emailadres"
                        placeholder="Voer je emailadres in"
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                        error={email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ? "Ongeldig emailadres" : null}
                        style={{ maxWidth: "400px" }}
                    />
                    <Space h={"sm"} />
                    <Button onClick={handleSendMail} style={{ maxWidth: "400px" }}>
                        Verstuur e-mail
                    </Button>
                </Card>
                <Space h={"md"}></Space>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
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
            </div>
        </>
    );
};

export default SignatureUsageInstructions;
