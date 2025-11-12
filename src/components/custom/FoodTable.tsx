'use client';

import { useState } from 'react';
import { ArrowUpDown, Home } from 'lucide-react';
import Link from 'next/link';

export interface Food {
  name: string;
  emoji: string;
  portion: string;
  nutrient: number;
  calories: number;
}

interface FoodTableProps {
  title: string;
  nutrientName: string;
  foods: Food[];
  color: string;
}

export default function FoodTable({ title, nutrientName, foods, color }: FoodTableProps) {
  const [sortedFoods, setSortedFoods] = useState(foods);
  const [sortBy, setSortBy] = useState<'name' | 'nutrient'>('nutrient');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'name' | 'nutrient') => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(field);
    setSortOrder(newOrder);

    const sorted = [...sortedFoods].sort((a, b) => {
      if (field === 'name') {
        return newOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return newOrder === 'asc' 
          ? a.nutrient - b.nutrient
          : b.nutrient - a.nutrient;
      }
    });

    setSortedFoods(sorted);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* Header */}
      <div className={`bg-gradient-to-br ${color} text-white py-12 px-4 sm:py-16 sm:px-6`}>
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Voltar para início</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter">
            {title}
          </h1>
          <p className="text-lg text-white/90 mt-3">
            Conheça os melhores alimentos para sua dieta
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F4F6F8]">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 text-[#333333] font-bold hover:text-[#4CAF50] transition-colors"
                    >
                      Alimento
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-center text-[#333333] font-bold">
                    Ilustração
                  </th>
                  <th className="px-6 py-4 text-center text-[#333333] font-bold">
                    Porção Sugerida
                  </th>
                  <th className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleSort('nutrient')}
                      className="flex items-center gap-2 text-[#333333] font-bold hover:text-[#4CAF50] transition-colors mx-auto"
                    >
                      {nutrientName}
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-center text-[#333333] font-bold">
                    Calorias
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedFoods.map((food, index) => (
                  <tr 
                    key={index}
                    className="border-t border-gray-100 hover:bg-[#F4F6F8] transition-colors"
                  >
                    <td className="px-6 py-4 text-[#333333] font-medium">
                      {food.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-5xl">{food.emoji}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-[#666666]">
                      {food.portion}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${color} text-white font-bold`}>
                        {food.nutrient}g
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-[#666666] font-medium">
                      {food.calories} kcal
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            <div className="p-4 bg-[#F4F6F8] flex gap-3">
              <button
                onClick={() => handleSort('name')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-[#333333] hover:bg-[#4CAF50] hover:text-white transition-colors"
              >
                Nome
                <ArrowUpDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSort('nutrient')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-[#333333] hover:bg-[#4CAF50] hover:text-white transition-colors"
              >
                {nutrientName.split(' ')[0]}
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {sortedFoods.map((food, index) => (
                <div key={index} className="p-6 hover:bg-[#F4F6F8] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{food.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#333333] mb-2">
                        {food.name}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#666666]">Porção:</span>
                          <span className="font-medium text-[#333333]">{food.portion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666666]">{nutrientName}:</span>
                          <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white font-bold text-xs`}>
                            {food.nutrient}g
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666666]">Calorias:</span>
                          <span className="font-medium text-[#333333]">{food.calories} kcal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
