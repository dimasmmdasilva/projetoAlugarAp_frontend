"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/services/api";

interface PropertyDetail {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  owner: {
    name: string;
    email: string;
  };
  // Em breve: imagens, coordenadas etc.
}

export default function PropertyDetailPage() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.auth);
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const response = await api.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        console.error("Erro ao buscar imóvel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p className="p-4 text-gray-600">Carregando imóvel...</p>;
  }

  if (!property) {
    return <p className="p-4 text-red-500">Imóvel não encontrado.</p>;
  }

  return (
    <div className="p-4 grid md:grid-cols-2 gap-6">
      {/* Seção da esquerda: imagem + detalhes */}
      <div>
        {/* Imagem principal simulada */}
        <div className="h-64 bg-gray-200 rounded flex items-center justify-center mb-4">
          <span className="text-gray-500">Imagem principal</span>
        </div>

        {/* Título e descrição */}
        <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
        <p className="text-sm text-gray-700">{property.description}</p>

        {/* Informações públicas */}
        <p className="mt-4 text-sm text-gray-800">
          Localização: <strong>{property.location}</strong>
        </p>

        {/* Informações privadas (usuário logado) */}
        {user.token && (
          <>
            <p className="text-sm text-gray-800 mt-1">
              Preço: R$ {property.price.toFixed(2)}
            </p>
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>
                Proprietário: <strong>{property.owner.name}</strong>
              </p>
              <p>
                Contato: <span>{property.owner.email}</span>
              </p>
            </div>
          </>
        )}

        {!user.token && (
          <p className="mt-4 text-sm text-blue-600 italic">
            Faça login para ver mais detalhes sobre o imóvel.
          </p>
        )}
      </div>

      {/* Seção da direita: mapa simulado */}
      <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
        <span className="text-gray-500">Mapa (Google Maps)</span>
      </div>
    </div>
  );
}
