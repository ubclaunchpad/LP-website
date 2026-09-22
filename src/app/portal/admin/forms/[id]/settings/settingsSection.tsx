import { ReactNode } from "react";

export default function SettingsSection({
  title,
  description,
  action,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-background-500 pb-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="font-heading text-lg font-semibold text-neutral-100">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-neutral-400">{description}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
