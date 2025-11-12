'use client';

import Link from 'next/link';
import { Apple, Flame, Activity, Heart, ArrowLeft, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function BonusProPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        router.push('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
    
    if (!user) {
      router.push('/auth');
    }
  };

  const bonusCategories = [
    {
      title: 'Exercícios para Queimar Calorias',
      icon: Flame,
      color: 'from-orange-400 to-red-600',
      href: '/bonus/queimar-calorias',
      description: 'Maximize sua queima calórica com exercícios intensos',
    },
    {
      title: 'Exercícios de Flexibilidade',
      icon: Activity,
      color: 'from-purple-400 to-pink-600',
      href: '/bonus/flexibilidade',
      description: 'Melhore sua mobilidade e previna lesões',
    },
    {
      title: 'Melhores Cardios',
      icon: Heart,
      color: 'from-cyan-400 to-blue-600',
      href: '/bonus/cardios',
      description: 'Fortaleça seu coração e resistência',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#666666] hover:text-[#4CAF50] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter font-semibold">Voltar</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#333333] font-inter">
                Área Bônus Pro
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] text-white py-16 px-4 sm:py-20 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <Crown className="w-6 h-6" />
            <span className="font-bold font-inter">CONTEÚDO EXCLUSIVO PRO</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-inter mb-4">
            Sua Área de Bônus Pro 💎
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Parabéns por ser Pro! Aproveite estes guias de exercícios exclusivos para potencializar seus resultados.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bonusCategories.map((category) => {
            const Icon = category.icon;
            
            return (
              <Link
                key={category.href}
                href={category.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden relative"
              >
                {/* Pro Badge */}
                <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white text-xs font-bold px-3 py-1 rounded-full font-inter flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  PRO
                </div>
                
                <div className="p-8 text-center">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-xl`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#333333] mb-3 font-inter">
                    {category.title}
                  </h2>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className={`h-2 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </Link>
            );
          })}
        </div>

        {/* Motivational Section */}
        <div className="mt-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-[#4CAF50]/20">
          <div className="text-center">
            <Apple className="w-12 h-12 text-[#4CAF50] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#333333] mb-3 font-inter">
              Nutrição + Exercício = Resultados Incríveis
            </h3>
            <p className="text-[#666666] font-inter max-w-2xl mx-auto">
              Combine os guias de alimentação com estes exercícios exclusivos para alcançar seus objetivos de forma mais rápida e saudável.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-[#666666]">
        <p className="text-sm">SantozzNutri Pro - Seu sucesso é nossa missão 💪</p>
      </div>
    </div>
  );
}
