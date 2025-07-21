"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CadastroPage() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("type"); // "RENTER" ou "OWNER"
  const [role, setRole] = useState<"RENTER" | "OWNER" | null>(null);

  useEffect(() => {
    if (userType === "RENTER" || userType === "OWNER") {
      setRole(userType);
    }
  }, [userType]);

  if (!role) {
    return <p className="p-4 text-red-600">Tipo de cadastro inválido.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Cadastro de {role === "RENTER" ? "locatário" : "anunciante"}
      </h2>

      {/* Aqui virá o formulário completo... */}
      <p className="text-sm text-gray-500 mb-2">Tipo de usuário: {role}</p>

      {/* Em breve: formulário de cadastro com envio de código por e-mail */}
    </div>
  );
}
