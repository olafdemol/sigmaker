"use client";

import { useState, useEffect } from "react";
import { buildSignature } from "@/services/signature/signatureBuilder";
import { Editor } from "@monaco-editor/react";
import { Button } from "@mantine/core";

type ReadOnlyEditorProps = {
    signatureTemplate: string;
};

const ReadOnlyEditor: React.FC<ReadOnlyEditorProps> = ({ signatureTemplate }) => {
    const [editorValue, setEditorValue] = useState("loading...");

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
        <div>
            <div style={{ height: "400px", marginBottom: "10px" }}>
                <Editor
                    height="100%"
                    defaultLanguage="html"
                    value={editorValue} // Use the state value for the editor
                    options={{
                        readOnly: true,
                    }}
                />
            </div>
            <Button onClick={handleCopyToClipboard} style={{ marginTop: "10px" }}>
                Copy to Clipboard
            </Button>
            <p style={{ marginTop: "10px" }}>Kopieer de tekst en plak deze in outlook</p>
        </div>
    );
};

export default ReadOnlyEditor;
