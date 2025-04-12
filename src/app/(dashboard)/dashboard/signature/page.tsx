import { useEffect, useRef, useState } from "react";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import Editor, { Monaco } from "@monaco-editor/react";
import { Button } from "@mantine/core";
import { buildSignature } from "@/services/signature/signatureBuilder"; // Adjust the import path as needed
import SignatureEditor from "@/components/SignatureEditor/SignatureEditor";
import { getSignature } from "@/services/signature/getSignatureTemplate";

export default function Signature() {
    const signatureTemplate = getSignature();
    return (
        <PageContainer title="">
            <SignatureEditor signatureTemplate={signatureTemplate}></SignatureEditor>
        </PageContainer>
    );
}