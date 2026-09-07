"use client";
import { useState, useMemo } from "react";
import { marked } from "marked";
import Input from "@/components/general/input";
import { formContext } from "@/components/layouts/formTabView";
import { Textarea } from "@/components/primitives/textArea";
import { useContext } from "react";
import { Button } from "@/components/primitives/button";
import MultiSelect from "@/components/general/multiSelect";
import { FormStep } from "@/lib/types/questions";
import { updateOrCreateEmailTemplate } from "./actions";
import { toast } from "sonner";
import { Dialog } from "@/components/primitives/dialog";
import { number } from "zod";

// Helper function to extract template tags
const extractTemplateTags = (content: string): string[] => {
  const regex = /{{([^{}]+)}}/g;
  const matches = content.match(regex);
  if (!matches) return [];
  return matches.map((match) => match.slice(2, -2));
};

// Helper to find unclosed tags
const findInvalidTags = (content: string): string[] => {
  const regex = /{{([^{}]*$)|{{([^{}]*)}(?!})/g;
  const matches = content.match(regex);
  return matches || [];
};

export default function FormSettingsPage() {
  const { rawForm: form, submissions } = useContext(formContext);
  const emailStatuses = form?.config.application?.emails?.status || {};
  const statusOptions = form?.config.application?.status || [];
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openTemplates, setOpenTemplates] = useState<string[]>([]);

  async function applyTemplateChange(templateData: {
    status: string;
    title: string;
    content: string;
  }) {
    try {
      await updateOrCreateEmailTemplate(form.id, templateData.status, {
        title: templateData.title,
        content: templateData.content,
      });
      toast.success("Template updated successfully", {
        action: {
          label: "Refresh",
          onClick: () => window.location.reload(),
        },
      });
      return true;
    } catch (error) {
      toast.error("Error updating template");
      console.error("Error updating template:", error);
      return false;
    }
  }

  const templateFields = useMemo(() => {
    const fields: Record<string, string> = {};
    form.questions.forEach((fStep: FormStep) => {
      fStep.questions.forEach((question) => {
        fields[question.id] = question.label;
      });
    });
    form.config.application?.subfields?.forEach(
      (field: { id: string; label: string }) => {
        fields[field.id] = field.label;
      },
    );
    return fields;
  }, [form]);

  const handleSave = async (templateData) => {
    await applyTemplateChange(templateData);
    setEditingStatus(null);
  };

  const handleCreateNew = async (templateData) => {
    await applyTemplateChange(templateData);
    setShowNewTemplate(false);
    setSelectedStatus("");
    setTitle("");
    setContent("");
  };

  const availableStatuses = statusOptions
    .filter(
      (status) =>
        !emailStatuses[status.id] || !emailStatuses[status.id.toString()],
    )
    .map((status) => ({
      id: status.id,
      label: status.label,
    }));

  return (
    <div className="flex flex-col dark gap-4  items-center w-full px-4">
      <div className="flex w-full sticky top-0 justify-between items-center gap-2 flex-wrap">
        <h2 className="font-semibold text-xl sticky top-0">Email Settings</h2>
        {availableStatuses.length > 0 && (
          <Button onClick={() => setShowNewTemplate(true)}>
            Create New Template
          </Button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full ">
        <section className="flex flex-col w-full rounded-md p-4 gap-4 items-center *:w-full">
          <details className="bg-background-700 border border-background-600 max-w-4xl rounded-lg">
            <summary className="px-4 py-2 cursor-pointer font-medium">
              Important Information About Email Templates
            </summary>
            <div className="p-4 space-y-4 border-t border-background-600">
              <div>
                <h4 className="font-medium mb-2">Email Sending Limits</h4>
                <p className="text-sm">
                  Due to email service provider restrictions, we can only send
                  up to 100 automated emails per day. Please plan your bulk
                  notifications accordingly.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Available Template Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(templateFields).map(([key, value]) => (
                    <span
                      key={key}
                      className="px-2 py-1 bg-background-600 rounded-md text-sm flex items-center gap-1"
                    >
                      <span className="font-mono text-lp-500">{`{{${key}}}`}</span>
                      <span className="text-xs opacity-75">: {value}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </details>

          <div className="flex flex-col max-w-4xl gap-4 ">
            <MultiSelect
              options={Object.entries(emailStatuses).map(
                ([status, emailConfig]) => ({
                  value: status,
                  label: (
                    <div className="flex items-center gap-2">
                      <span className="border text-xs border-background-500 rounded-full px-2 py-0.5 bg-lp-500 min-w-16 text-center">
                        {status}
                      </span>
                      <span className="text-sm truncate opacity-75">
                        {emailConfig.title}
                      </span>
                    </div>
                  ),
                }),
              )}
              value={openTemplates}
              onChange={setOpenTemplates}
              allowMultiple={true}
              className="w-full"
              emptyText="Select templates to view..."
            />
            {showNewTemplate && (
              <div className="border rounded-lg p-4 bg-background-700">
                <h3 className="font-medium mb-4">Create New Template</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Status</h4>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-2 rounded-md bg-background-600"
                    >
                      <option value="">Select a status...</option>
                      {availableStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Subject Line</h4>
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter email subject"
                      className="w-full p-2 border rounded-md bg-background-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Email Content</h4>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter email content"
                      rows={8}
                      className="w-full resize-none p-2 border rounded-md font-mono text-sm bg-background-600"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewTemplate(false);
                        setSelectedStatus("");
                        setTitle("");
                        setContent("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() =>
                        handleCreateNew({
                          status: selectedStatus,
                          title,
                          content,
                        })
                      }
                      disabled={!title || !content}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 max-w-4xl flex-1">
            {Object.entries(emailStatuses)
              .filter(([status]) => openTemplates.includes(status))
              .map(([status, emailConfig]) => {
                const isEditing = editingStatus === status;
                const currentContent = isEditing
                  ? content
                  : emailConfig.content;
                const currentTitle = isEditing ? title : emailConfig.title;
                const tags = extractTemplateTags(currentContent);
                const invalidTags = findInvalidTags(currentContent);

                return (
                  <div
                    key={status}
                    className="border rounded-lg bg-background-700 min-w-0 w-full flex-1 border-background-600 p-4 "
                  >
                    <div className="flex items-center justify-between w-full gap-2 pb-4">
                      <span className="border text-base border-background-500 rounded-full font-semibold px-2 py-1 text-center w-24 bg-background-500 capitalize">
                        {status}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowPreview(true)}
                        >
                          Preview
                        </Button>
                        {!isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingStatus(status);
                              setContent(emailConfig.content);
                              setTitle(emailConfig.title);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                      </div>

                      {showPreview && (
                        <TemplatePreview
                          template={{
                            title: currentTitle,
                            content: currentContent,
                          }}
                          onClose={() => setShowPreview(false)}
                          submissions={submissions}
                          templateFields={templateFields}
                        />
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Subject Line</h4>
                        <Input
                          type="text"
                          value={currentTitle}
                          onChange={(e) => setTitle(e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-2 border rounded-md bg-background-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Email Content</h4>
                        <Textarea
                          value={currentContent}
                          onChange={(e) => setContent(e.target.value)}
                          disabled={!isEditing}
                          className="w-full 
                         min-h-[300px]  field-sizing-content p-2 border rounded-md font-mono text-sm bg-background-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Template Fields Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-md text-sm flex items-center gap-1 bg-background-600"
                            >
                              <span
                                className={`font-mono ${
                                  Object.keys(templateFields).includes(tag)
                                    ? "text-lp-500"
                                    : "text-red-500"
                                }`}
                              >{`{{${tag}}}`}</span>
                            </span>
                          ))}
                        </div>
                        {invalidTags.length > 0 && (
                          <p className="text-sm text-red-500">
                            Found unclosed template tags. Please fix them before
                            saving.
                          </p>
                        )}
                      </div>

                      {isEditing && (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingStatus(null);
                              setContent(emailConfig.content);
                              setTitle(emailConfig.title);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() =>
                              handleSave({ status, title, content })
                            }
                            disabled={
                              invalidTags.length > 0 ||
                              tags.some(
                                (tag) =>
                                  !Object.keys(templateFields).includes(tag),
                              )
                            }
                          >
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
}

function TemplatePreview({
  template,
  onClose,
  submissions,
  templateFields,
}: {
  template: { title: string; content: string };
  onClose: () => void;
  submissions: any[];
  templateFields: Record<string, string>;
}) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const previewContent = useMemo(() => {
    if (!selectedUser) return template.content;

    let content = template.content;
    // Replace template variables
    Object.keys(templateFields).forEach((key) => {
      const value = selectedUser[key] || selectedUser.details?.[key];
      if (value) {
        content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
      }
    });

    // Convert markdown links to HTML
    return marked(content, { breaks: true });
  }, [selectedUser, template.content, templateFields]);

  // Update the preview content display to render HTML

  return (
    <Dialog open onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 bg-black/80">
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background-800 p-6 shadow-lg sm:rounded-lg">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Preview Template</h2>

            <div className="flex gap-2 items-center">
              <Input
                className="p-2 w-full bg-background-600 rounded-md"
                list="preview-emails"
                placeholder="Search user by email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <datalist id="preview-emails">
                {submissions.map((submission) => (
                  <option key={submission.id}>{submission.email}</option>
                ))}
              </datalist>
              <Button
                disabled={!search || search.length < 3}
                onClick={() => {
                  setSelectedUser(submissions.find((s) => s.email === search));
                }}
              >
                Preview
              </Button>
            </div>

            <div className="space-y-2 mt-4">
              <h3 className="font-medium">Subject</h3>
              <div className="p-2 bg-background-600 rounded-md">
                {template.title}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Content</h3>
              <div className="p-2 bg-background-600 rounded-md whitespace-pre-wrap ">
                <div
                  className="p-2 bg-background-600 rounded-md whitespace-pre-wrap min-h-[200px] max-h-[600px] overflow-y-auto prose prose-sm prose-invert [&>*]:!my-0.5 [&_p]:!my-0.5 [&_ul]:!my-0.5 [&_li]:!my-0.5 [&_ul]:!pl-4 [&_ol]:!pl-4"
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
