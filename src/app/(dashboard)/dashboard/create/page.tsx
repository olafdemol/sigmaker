import { CreateSignatureForm } from "@/components/SignatureEditor/CreateSignatureForm";
import { SimpleForm } from "@/components/Form/SimpleForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";

export default function Form() {
  return (
    <PageContainer title="Forms">
      <CreateSignatureForm />
    </PageContainer>
  );
}
