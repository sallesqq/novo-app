'use client';

import Link from 'next/link';
import { Apple, Beef, Wheat, Droplet, User, LogIn, Crown, Dumbbell, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import PaywallModal from '@/components/custom/PaywallModal';

export default function Home() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleCategoryClick = (href: string, title: string, e: React.MouseEvent) => {
    // Proteínas é sempre livre
    if (href === '/proteinas') {
      return;
    }

    // Se não estiver logado ou não for Pro, mostra paywall
    if (!user) {
      e.preventDefault();
      setSelectedCategory(title);
      setShowPaywall(true);
    }
  };

  const categories = [
    {
      title: 'Proteínas',
      icon: Beef,
      color: 'from-red-400 to-red-600',
      href: '/proteinas',
      description: 'Essenciais para músculos e tecidos',
      isFree: true
    },
    {
      title: 'Fibras',
      icon: Apple,
      color: 'from-green-400 to-green-600',
      href: '/fibras',
      description: 'Importantes para digestão saudável',
      isFree: false
    },
    {
      title: 'Carboidratos',
      icon: Wheat,
      color: 'from-amber-400 to-amber-600',
      href: '/carboidratos',
      description: 'Fonte principal de energia',
      isFree: false
    },
    {
      title: 'Gorduras Boas',
      icon: Droplet,
      color: 'from-yellow-400 to-yellow-600',
      href: '/gorduras',
      description: 'Fundamentais para saúde celular',
      isFree: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-lg flex items-center justify-center">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#333333] font-inter">
                SantozzNutri
              </span>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <Link
                  href="/account"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-xl hover:shadow-lg transition-all font-inter font-semibold"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Minha Conta</span>
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-xl hover:shadow-lg transition-all font-inter font-semibold"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="hidden sm:inline">Entrar</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white py-16 px-4 sm:py-20 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-inter mb-4">
            Seu Guia para uma Alimentação Inteligente
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Descubra alimentos classificados por macronutrientes e faça escolhas conscientes para sua saúde
          </p>
          {!user && (
            <div className="mt-8">
              <Link
                href="/auth"
                className="inline-block px-8 py-4 bg-white text-[#4CAF50] rounded-xl font-inter font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Começar Agora - Grátis
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bonus Pro Card - Only for logged Pro users */}
      {user && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 mb-8 space-y-6">
          <Link
            href="/bonus"
            className="group block bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wide">Exclusivo Pro</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold font-inter mb-2">
                    Área Bônus Pro: Guias de Exercícios 💎
                  </h2>
                  <p className="text-white/90 text-lg">
                    Acesse guias exclusivos de exercícios para potencializar seus resultados
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <div className="h-2 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>

          {/* Plano Alimentar Card */}
          <Link
            href="/plano-alimentar"
            className="group block bg-gradient-to-br from-[#4CAF50] via-[#45a049] to-[#2E7D32] rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <Utensils className="w-10 h-10 text-white" />
                </div>
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wide">Exclusivo Pro</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold font-inter mb-2">
                    Plano Alimentar Personalizado 🥗
                  </h2>
                  <p className="text-white/90 text-lg">
                    Crie seu plano alimentar completo de 26 semanas com IA
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <div className="h-2 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>
        </div>
      )}

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isLocked = !category.isFree && !user;
            
            return (
              <Link
                key={category.href}
                href={category.href}
                onClick={(e) => handleCategoryClick(category.href, category.title, e)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden relative"
              >
                {isLocked && (
                  <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white text-xs font-bold px-3 py-1 rounded-full font-inter">
                    PRO
                  </div>
                )}
                
                <div className="p-8 text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 ${isLocked ? 'opacity-50' : ''}`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#333333] mb-3 font-inter">
                    {category.title}
                  </h2>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {category.description}
                  </p>
                  {category.isFree && (
                    <span className="inline-block mt-3 text-xs font-bold text-[#4CAF50] bg-green-50 px-3 py-1 rounded-full font-inter">
                      GRÁTIS
                    </span>
                  )}
                </div>
                <div className={`h-2 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-[#666666]">
        <p className="text-sm">SantozzNutri - Alimentação consciente, vida saudável</p>
      </div>

      {/* Paywall Modal */}
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
}
