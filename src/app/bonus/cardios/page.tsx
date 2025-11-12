'use client';

import Link from 'next/link';
import { ArrowLeft, Crown, Play, X } from 'lucide-react';
import { useState } from 'react';

interface Exercise {
  id: string;
  name: string;
  image: string;
  instruction: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  details: string;
  tips: string[];
}

interface ExerciseCardProps {
  exercise: Exercise;
  onOpenModal: (exercise: Exercise) => void;
}

function ExerciseCard({ exercise, onOpenModal }: ExerciseCardProps) {
  const levelColors = {
    'Iniciante': 'bg-green-100 text-green-700',
    'Intermediário': 'bg-yellow-100 text-yellow-700',
    'Avançado': 'bg-red-100 text-red-700',
  };

  return (
    <div
      onClick={() => onOpenModal(exercise)}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20"></div>
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-[#4CAF50] ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-[#333333] font-inter flex-1">
            {exercise.name}
          </h3>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${levelColors[exercise.level]} font-inter`}>
            {exercise.level}
          </span>
        </div>
        <p className="text-[#666666] font-inter text-sm mb-4">
          {exercise.instruction}
        </p>
        <button className="text-[#4CAF50] font-inter font-semibold text-sm hover:underline">
          Ver detalhes →
        </button>
      </div>
    </div>
  );
}

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

function ExerciseModal({ exercise, onClose }: ExerciseModalProps) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-6 h-6" />
            <span className="text-sm font-bold">EXERCÍCIO PRO</span>
          </div>
          
          <h2 className="text-3xl font-bold font-inter mb-2">
            {exercise.name}
          </h2>
          <p className="text-white/90 font-inter">
            {exercise.instruction}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Image */}
          <div className="relative h-64 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl overflow-hidden mb-6">
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#333333] font-inter mb-3">
              Como Executar
            </h3>
            <p className="text-[#666666] font-inter leading-relaxed">
              {exercise.details}
            </p>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-[#4CAF50]/20">
            <h3 className="text-lg font-bold text-[#333333] font-inter mb-3">
              Dicas de Segurança e Postura
            </h3>
            <ul className="space-y-2">
              {exercise.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-[#666666] font-inter text-sm">
                  <span className="text-[#4CAF50] font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardiosPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Corrida Intervalada (HIIT)',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop',
      instruction: '8 séries: 30s sprint + 90s caminhada',
      level: 'Avançado',
      details: 'Alterne entre períodos de corrida intensa (sprint) e caminhada leve. Comece com aquecimento de 5 minutos, execute 8 intervalos de alta intensidade seguidos de recuperação ativa, e finalize com 5 minutos de desaquecimento.',
      tips: [
        'Aqueça adequadamente antes de começar',
        'Mantenha boa postura durante a corrida',
        'Use tênis adequado para corrida',
        'Hidrate-se antes, durante e depois',
        'Comece com menos intervalos se for iniciante'
      ]
    },
    {
      id: '2',
      name: 'Ciclismo',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
      instruction: '45-60 minutos em ritmo moderado',
      level: 'Intermediário',
      details: 'Pedale em ritmo constante, mantendo uma cadência confortável. Varie a resistência para simular subidas e descidas. Mantenha a postura ereta e os ombros relaxados.',
      tips: [
        'Ajuste o selim na altura correta',
        'Mantenha os joelhos alinhados',
        'Use roupas adequadas',
        'Varie a intensidade durante o treino',
        'Mantenha hidratação constante'
      ]
    },
    {
      id: '3',
      name: 'Natação',
      image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=300&fit=crop',
      instruction: '30-45 minutos, alternando estilos',
      level: 'Intermediário',
      details: 'Nade alternando entre crawl, costas e peito. Mantenha respiração ritmada e técnica adequada. Faça pausas curtas entre as séries se necessário.',
      tips: [
        'Aqueça fora da água antes de entrar',
        'Foque na técnica, não apenas na velocidade',
        'Respire de forma controlada',
        'Use óculos de natação adequados',
        'Varie os estilos para trabalhar diferentes músculos'
      ]
    },
    {
      id: '4',
      name: 'Remo',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
      instruction: '20-30 minutos em ritmo constante',
      level: 'Avançado',
      details: 'No ergômetro de remo, mantenha uma técnica adequada: empurre com as pernas, incline o tronco para trás e puxe com os braços. Retorne na ordem inversa. Mantenha ritmo constante.',
      tips: [
        'Mantenha as costas retas',
        'Use a força das pernas, não apenas dos braços',
        'Coordene o movimento de forma fluida',
        'Ajuste a resistência adequadamente',
        'Respire de forma sincronizada com o movimento'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/bonus"
              className="flex items-center gap-2 text-[#666666] hover:text-[#4CAF50] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter font-semibold">Voltar</span>
            </Link>

            <div className="flex items-center gap-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white px-4 py-2 rounded-full">
              <Crown className="w-5 h-5" />
              <span className="text-sm font-bold font-inter">CONTEÚDO PRO</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white py-12 px-4 sm:py-16 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter">
              Melhores Cardios 💎
            </h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl">
            Fortaleça seu coração, aumente sua resistência e melhore sua saúde cardiovascular
          </p>
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onOpenModal={setSelectedExercise}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

      {/* Footer */}
      <div className="text-center py-8 text-[#666666]">
        <p className="text-sm">SantozzNutri Pro - Coração forte, vida longa ❤️</p>
      </div>
    </div>
  );
}
