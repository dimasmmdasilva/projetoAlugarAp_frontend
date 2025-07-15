"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";

import api from "@/services/api";
import PropertyCard from "@/components/propertyCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setCredentials, logout } from "@/store/authSlice";

// Validação do formulário de login
const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

// Tipagem dos dados do imóvel
interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  owner: {
    name: string;
    email: string;
  };
  // futuramente: imageUrl: string;
}

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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
        })
      );
      setError("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Erro ao fazer login");
      } else {
        setError("Erro inesperado ao fazer login");
      }
    }
  };

  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties");
        setProperties(response.data);
      } catch (err) {
        console.error("Erro ao carregar imóveis:", err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="p-4">
      {/* Header com login/logout */}
      <header className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold">AlugarAP</h1>

        {user.token ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Logado como: <strong>{user.role}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 underline text-sm"
            >
              Sair
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 items-center"
          >
            <input
              type="email"
              placeholder="E-mail"
              {...register("email")}
              className="border p-1 rounded text-sm"
            />
            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
              className="border p-1 rounded text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Entrar
            </button>
          </form>
        )}
      </header>

      {/* Erros de validação e login */}
      {errors.email && (
        <p className="text-red-500 text-sm mb-1">{errors.email.message}</p>
      )}
      {errors.password && (
        <p className="text-red-500 text-sm mb-1">{errors.password.message}</p>
      )}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Lista de imóveis */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Imóveis disponíveis</h2>

        {properties.length === 0 ? (
          <p className="text-gray-600 text-sm">
            Nenhum imóvel disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="block"
              >
                <PropertyCard
                  title={property.title}
                  location={property.location}
                  // imageUrl={property.imageUrl} // quando disponível pela API
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
