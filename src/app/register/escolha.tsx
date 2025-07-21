"use client";
import Link from "next/link";

export default function EscolhaCadastro() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 bg-gray-100 px-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Escolha o tipo de cadastro
      </h1>

      <div className="flex gap-6">
        <Link
          href="/register/cadastro?type=RENTER"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Quero alugar imóvel
        </Link>

        <Link
          href="/register/cadastro?type=OWNER"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Quero divulgar imóvel
        </Link>
      </div>
    </div>
  );
}
