import { getForms } from "@/app/portal/admin/actions";
import AnalyticsFormPicker from "@/components/portal/admin/analyticsFormPicker";

export default async function AnalyticsPage() {
  const forms = (await getForms()) as unknown as {
    id: number;
    title: string;
    type: string | null;
    open_at: string | Date | null;
    close_at: string | Date | null;
  }[];

  return (
    <div className="min-h-screen bg-background-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">
            Pick a form to see application and member statistics.
          </p>
        </div>
        <AnalyticsFormPicker
          forms={forms.map((f) => ({
            id: Number(f.id),
            title: f.title,
            type: f.type,
            open_at: f.open_at ? new Date(f.open_at).toISOString() : null,
            close_at: f.close_at ? new Date(f.close_at).toISOString() : null,
          }))}
        />
      </div>
    </div>
  );
}
