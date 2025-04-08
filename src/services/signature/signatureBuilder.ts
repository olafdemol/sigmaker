"use client";

import { SignatureFormValues } from "@/components/Form/CreateSignatureForm";

export const buildSignature = (signatureForm: SignatureFormValues, signatureTemplate: string): string => {
    const signature = signatureTemplate
        .replace('{{name}}', signatureForm.name)
        .replace('{{function}}', signatureForm.function);
    return signature;
};