import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null); // Nuevo estado local
  const { login } = useAuth();
  const navigate = useNavigate();

  const isEmailValid =
    email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null); // Limpiar errores previos

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLocalError("Correo o contraseña incorrectos.");
      }
    }
  };

  return (
    <main className="mt-10 w-[var(--max-w-screen-xs)] p-2 flex flex-col justify-center items-center">
      <h2 className="text-4xl text-center font-bold">Inicio de sesión</h2>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full mt-10 p-4 bg-[var(--color-black-rain-400)]"
      >
        {/* Muestra el error si existe */}
        {localError && (
          <p className="text-red-500 p-2 rounded-md bg-red-200">{localError}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-2 border rounded ${
            !isEmailValid && email
              ? "border-red-500"
              : "border-[var(--color-black-rain-900)]"
          }`}
        />
        {!isEmailValid && email && (
          <p className="text-red-500 text-sm">Correo inválido</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-2 border rounded ${
            !isPasswordValid && password
              ? "border-red-500"
              : "border-[var(--color-black-rain-900)]"
          }`}
        />
        {!isPasswordValid && password && (
          <p className="text-red-500 text-sm">Mínimo 6 caracteres</p>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full p-2 rounded cursor-pointer ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Login
        </button>
      </form>
    </main>
  );
};
