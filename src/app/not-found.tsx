import NotFoundWrapper from "@/components/layouts/notFoundWrapper";

export default function NotFound() {
  return (
    <NotFoundWrapper
      links={[{ href: "/", label: "Find your way back home" }]}
    />
  );
}
