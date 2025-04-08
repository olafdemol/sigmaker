"use server";

import * as fs from "fs";
import * as path from "path";

export const getSignature = (): string => {
    const templateName = process.env.TEMPLATE_TO_USE;

    if (!templateName) {
        throw new Error("TEMPLATE_TO_USE environment variable is not set.");
    }

    const templatePath = path.resolve(process.cwd(), "src", "templates", templateName);

    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template file not found: ${templatePath}`);
    }

    const signature = fs.readFileSync(templatePath, "utf-8");

    return signature;
};
