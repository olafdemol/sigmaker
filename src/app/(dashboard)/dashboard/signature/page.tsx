import { useEffect, useRef, useState } from "react";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import Editor, { Monaco } from "@monaco-editor/react";
import { Button } from "@mantine/core";
import { buildSignature } from "@/services/signature/signatureBuilder"; // Adjust the import path as needed

export default function Signature() {
    // add a string state to hold the signature
    const [signature, setSignature] = useState<string>("");
    const editorRef = useRef<any>(null);

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;
    };

    useEffect(() => {
        loadSignature(); // Load the signature when the component mounts
    }, []);

    // if signature state changes, set the value of the editor to the signature state
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setValue(signature);
        }
    }
    , [signature]);

    const loadSignature = async () => {
        const storedData = localStorage.getItem("signatureForm");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                const signature = await buildSignature(parsedData); // Process data through signatureBuilder
                // set the signature state to the processed data
                setSignature(signature);
            } catch (error) {
                console.error("Error parsing signatureForm data:", error);
            }
        }
    };

    const copyToClipboard = () => {
        if (editorRef.current) {
            const value = editorRef.current.getValue();
            navigator.clipboard.writeText(value).then(() => {
                alert("Copied to clipboard!");
            });
        }
    };

    return (
        <PageContainer title="Tables">
            <div style={{ height: "400px", marginBottom: "10px" }}>
                <Editor
                    height="100%"
                    defaultLanguage="html"
                    defaultValue="// Write your code here"
                    onMount={handleEditorDidMount}
                    options={{
                        readOnly: true,
                    }}
                />
            </div>
            <Button onClick={copyToClipboard} style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Copy to Clipboard</span>
            </Button>
        </PageContainer>
    );
}