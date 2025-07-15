"use client";

import Image from "next/image";

interface PropertyCardProps {
  title: string;
  location: string;
  imageUrl?: string; // opcional, virá da API no futuro
}

export default function PropertyCard({
  title,
  location,
  imageUrl,
}: PropertyCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-md transition duration-200 bg-white border cursor-pointer">
      {/* Imagem otimizada com fallback */}
      <div className="w-full h-48 relative">
        <Image
          src={imageUrl || "https://via.placeholder.com/400x200"}
          alt={`Imagem de ${title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Informações resumidas */}
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600 truncate">{location}</p>
      </div>
    </div>
  );
}
