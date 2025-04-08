"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Space, Text, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    function: z.string().min(1, { message: "Function is required" }),
});

export type SignatureFormValues = z.infer<typeof schema>;

export const CreateSignatureForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignatureFormValues>({
        resolver: zodResolver(schema),
    });

    const handleConfirmDialog = (data: SignatureFormValues) => {
        localStorage.setItem("signatureForm", JSON.stringify(data));
        router.push("/dashboard/signature");
    };

    const onSubmit = (data: SignatureFormValues) => {
        modals.openConfirmModal({
            title: "Handtekening aanmaken!",
            children: (
                <Text size="sm">
                    Naam: {data.name}
                    <br />
                    Functie: {data.function}
                </Text>
            ),
            labels: { confirm: "Confirm", cancel: "Cancel" },
            onConfirm: () => handleConfirmDialog(data),
        });
    };

    return (
        <Paper withBorder shadow="md" p="md" w="400px">
            <Box<"form">>
                <Text<"h2"> component="h2" fw="bold" fz="lg">
                    Handtekening maken
                </Text>
                <TextInput
                    label="Naam"
                    error={errors.name?.message}
                    {...register("name")}
                />
                <Space h="sm" />
                <TextInput
                    label="Functie"
                    error={errors.function?.message}
                    {...register("function")}
                />
                <Space h="md" />
                <Button onClick={handleSubmit(onSubmit)}>Create Signature</Button>
            </Box>
        </Paper>
    );
};
