import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">Oops! Algo salió mal</h1>
      <p className="text-gray-600 mt-2">
        {error.statusText || error.message || "Error inesperado"}
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Volver al inicio
      </a>
    </div>
  );
}
