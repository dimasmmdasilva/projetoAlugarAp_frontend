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
    <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 p-4">
      {/* Coluna da esquerda: detalhes do imóvel */}
      <div>
        {/* Imagem simulada */}
        <div className="h-64 bg-gray-200 rounded flex items-center justify-center mb-4">
          <span className="text-gray-500">Imagem principal</span>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {property.title}
        </h2>

        {/* Seções de informação */}
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold">Descrição</h3>
            <p>{property.description}</p>
          </div>

          <div>
            <h3 className="font-semibold">Localização</h3>
            <p>{property.location}</p>
          </div>

          {user.token ? (
            <>
              <div>
                <h3 className="font-semibold">Preço</h3>
                <p>R$ {property.price.toFixed(2)}</p>
              </div>

              <div>
                <h3 className="font-semibold">Proprietário</h3>
                <p>{property.owner.name}</p>
                <p>{property.owner.email}</p>
              </div>
            </>
          ) : (
            <p className="text-blue-600 italic">
              Faça login para visualizar mais informações.
            </p>
          )}
        </div>
      </div>

      {/* Coluna da direita: mapa (placeholder) */}
      <div className="h-full bg-gray-100 rounded flex items-center justify-center">
        <span className="text-gray-500">Mapa (Google Maps)</span>
      </div>
    </section>
  );
}
