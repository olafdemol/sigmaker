"use server";

import { SignatureFormValues } from "@/components/Form/CreateSignatureForm";
import * as fs from "fs";
import * as path from "path";

export const buildSignature = (signatureForm: SignatureFormValues): string => {
    const templateName = process.env.TEMPLATE_TO_USE;

    if (!templateName) {
        throw new Error("TEMPLATE_TO_USE environment variable is not set.");
    }

    const templatePath = path.resolve(process.cwd(), "src", "templates", templateName);

    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template file not found: ${templatePath}`);
    }

    const templateContent = fs.readFileSync(templatePath, "utf-8");

    const signature = templateContent
        .replace('{{name}}', signatureForm.name)
        .replace('{{function}}', signatureForm.function);
    return signature;
};