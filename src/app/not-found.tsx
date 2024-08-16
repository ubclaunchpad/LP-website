import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-4xl flex-col flex gap-10 justify-center items-center">
        <h1>404 | Page Not Found</h1>
        <Link
          className="text-2xl bg-white rounded p-1 px-4 text-black hover:scale-125 transition-transform"
          href="/"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
