// Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  maleWight: string;
	femaleWight: string;
	life: string;
}

export const Card: React.FC<CardProps> = ({ title, description, life, maleWight, femaleWight }) => {
  return (
    <div className="bg-white text-gray-900 max-w-sm sm:max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-2xl hover:-translate-y-2 transition-transform">
        {/* Nombre del anime */}
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 text-center">{title}</h2>
        
        {/* Descripción */}
        <p className="text-base sm:text-lg text-gray-700 mb-6 flex-1 overflow-auto">
          {description}
        </p>
        
        {/* Fila de datos */}
        <div className="flex divide-x divide-gray-300 border-t border-gray-300 pt-4 text-center">
          <div className="flex-1 px-4">
            <span className="block text-sm text-gray-500">Vida</span>
            <span className="font-semibold text-lg">{life}</span>
          </div>

          <div className="flex-1 px-4">
            <span className="block text-sm text-gray-500">Peso ♂</span>
            <span className="font-semibold text-lg">{maleWight}</span>
          </div>

          <div className="flex-1 px-4">
            <span className="block text-sm text-gray-500">Peso ♀</span>
            <span className="font-semibold text-lg">{femaleWight}</span>
          </div>
      </div>
    </div>
  );
};

export default Card;