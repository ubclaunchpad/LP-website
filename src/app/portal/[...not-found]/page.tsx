import NotFoundWrapper from "@/components/layouts/notFoundWrapper";

export default function Page() {
  return (
    <NotFoundWrapper
      links={[
        { href: "/", label: "Find your way back home" },
        {
          href: "/portal",
          label: "Go to the portal",
        },
      ]}
    />
  );
}
