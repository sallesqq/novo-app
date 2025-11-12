'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { CreditCard, Calendar, CheckCircle, ExternalLink, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
    
    if (!user) {
      router.push('/auth');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleManageSubscription = () => {
    // Aqui será integrado com Stripe Customer Portal
    window.open('https://billing.stripe.com/p/login/test_...', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F4F6F8] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] font-inter mb-2">
              Minha Conta
            </h1>
            <p className="text-[#666666] font-inter">
              Gerencie sua assinatura e informações
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all font-inter font-semibold text-[#333333]"
          >
            Voltar ao Início
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white font-inter">
                    {user.email?.[0].toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#333333] font-inter mb-1">
                  {user.user_metadata?.name || 'Usuário'}
                </h2>
                <p className="text-sm text-[#666666] font-inter break-all">
                  {user.email}
                </p>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all font-inter font-semibold"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#333333] font-inter">
                    Plano Pro Ativo
                  </h3>
                  <p className="text-sm text-[#666666] font-inter">
                    Acesso completo a todas as funcionalidades
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-[#4CAF50]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-[#4CAF50]" />
                    <span className="text-sm font-inter font-semibold text-[#666666]">
                      Próxima Cobrança
                    </span>
                  </div>
                  <p className="text-lg font-bold text-[#333333] font-inter">
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-inter font-semibold text-[#666666]">
                      Método de Pagamento
                    </span>
                  </div>
                  <p className="text-lg font-bold text-[#333333] font-inter">
                    •••• 4242
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#F4F6F8] rounded-xl mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] font-inter">Valor Mensal</span>
                  <span className="text-2xl font-bold text-[#4CAF50] font-inter">
                    R$ 27,90
                  </span>
                </div>
              </div>

              <button
                onClick={handleManageSubscription}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-4 rounded-xl font-inter font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Gerenciar Assinatura e Faturas
              </button>

              <p className="text-xs text-center text-[#666666] font-inter mt-4">
                Você será redirecionado para o portal seguro do Stripe
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#333333] font-inter mb-4">
                Benefícios do Plano Pro
              </h3>
              <div className="space-y-3">
                {[
                  'Acesso completo a todas as categorias',
                  'Proteínas, Fibras, Carboidratos e Gorduras Boas',
                  'Atualizações constantes com novos alimentos',
                  'Suporte prioritário',
                  'Experiência sem anúncios'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                    <span className="text-[#666666] font-inter">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
