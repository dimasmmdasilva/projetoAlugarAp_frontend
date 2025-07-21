"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setCredentials, logout } from "@/store/authSlice";
import api from "@/services/api";
import axios from "axios";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha com no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));

      dispatch(
        setCredentials({
          token,
          id: payload.id,
          role: payload.role,
          name: payload.name,
        })
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Erro ao fazer login");
      } else {
        alert("Erro inesperado ao fazer login");
      }
    }
  };

  const handleLogout = () => dispatch(logout());

  return (
    <header className="border-b bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold text-blue-700">AlugarAP</h1>

        {user.token ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-700">Olá, {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-red-600 underline text-sm"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                placeholder="E-mail"
                {...register("email")}
                className="border p-1 rounded text-sm text-black"
              />
              <input
                type="password"
                placeholder="Senha"
                {...register("password")}
                className="border p-1 rounded text-sm text-black"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-800 transition"
              >
                Entrar
              </button>
            </form>

            <Link
              href="/register/escolha"
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-800 transition"
            >
              Cadastro
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
