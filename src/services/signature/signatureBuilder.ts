"use client";

import { SignatureFormValues } from "@/components/SignatureEditor/CreateSignatureForm";

export const buildSignature = (signatureForm: SignatureFormValues, signatureTemplate: string): string => {
    const signature = signatureTemplate
        .replace('{{name}}', signatureForm.name)
        .replace('{{function}}', signatureForm.function)
        .replace('{{subtitle}}', signatureForm.subtitle || '');
    return signature;
};