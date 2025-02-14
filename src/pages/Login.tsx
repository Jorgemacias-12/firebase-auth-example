import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al iniciar sesión:", error.message);
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
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[var(--color-black-rain-800)] p-2 border border-transparent rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[var(--color-black-rain-800)] p-2 border border-transparent rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 active:scale-95 active:bg-blue-600"
        >
          Login
        </button>
      </form>
    </main>
  );
};
