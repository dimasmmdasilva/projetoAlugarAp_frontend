"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import api from "@/services/api";
import PropertyCard from "@/components/propertyCard";
import { RootState } from "@/store";

// Tipagem dos dados do imóvel
interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
}

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const user = useSelector((state: RootState) => state.auth);

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
                // imageUrl={property.imageUrl} // Quando disponível pela API
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
