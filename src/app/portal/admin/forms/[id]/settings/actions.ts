"use server";
import { db } from "@/db";
import { requireAdmin } from "@/lib/utils/auth";

type EmailTemplate = {
  title: string;
  content: string;
};

export async function updateOrCreateEmailTemplate(
  formId: number,
  status: string,
  template: EmailTemplate,
) {
  await requireAdmin();
  try {
    // First get the current form to access existing config
    const form = await db.forms.findFirst({
      where: { id: BigInt(formId) },
    });

    if (!form) {
      throw new Error(`Form with id ${formId} not found`);
    }

    // Get existing config or initialize if doesn't exist
    const currentConfig = (form.config as Record<string, any>) || {};

    // Safely create nested structure if it doesn't exist
    const updatedConfig = {
      ...currentConfig,
      application: {
        ...currentConfig.application,
        emails: {
          ...(currentConfig.application?.emails || {}),
          status: {
            ...(currentConfig.application?.emails?.status || {}),
            [status]: template,
          },
        },
      },
    };

    // Update only the config field
    await db.forms.update({
      where: { id: BigInt(formId) },
      data: {
        config: updatedConfig,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating email template:", error);
    throw error;
  }
}
