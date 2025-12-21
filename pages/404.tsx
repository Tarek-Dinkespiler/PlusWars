import Link from "next/link";

export default function Custom404() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>

      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link href="/" className="neo-btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
