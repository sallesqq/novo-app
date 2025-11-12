'use client';

import Link from 'next/link';
import { ArrowLeft, Plus, Calendar, TrendingUp, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface PlanoAlimentar {
  id: string;
  dados_usuario: any;
  plano_completo: any;
  created_at: string;
}

export default function MeusPlanos() {
  const [planos, setPlanos] = useState<PlanoAlimentar[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    carregarPlanos();
  }, []);

  const carregarPlanos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('planos_alimentares')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPlanos(data || []);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

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

            <Link
              href="/plano-alimentar"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-xl hover:shadow-lg transition-all font-inter font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Novo Plano</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white py-12 px-4 sm:py-16 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-4">
            Meus Planos Alimentares
          </h1>
          <p className="text-lg sm:text-xl text-white/90">
            Acesse e gerencie seus planos personalizados
          </p>
        </div>
      </div>

      {/* Planos List */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        {planos.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#333333] font-inter mb-2">
              Nenhum plano criado ainda
            </h2>
            <p className="text-[#666666] font-inter mb-6">
              Crie seu primeiro plano alimentar personalizado agora!
            </p>
            <Link
              href="/plano-alimentar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-xl hover:shadow-lg transition-all font-inter font-semibold"
            >
              <Plus className="w-5 h-5" />
              Criar Meu Primeiro Plano
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planos.map((plano) => (
              <Link
                key={plano.id}
                href={`/plano-alimentar/${plano.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-[#4CAF50]" />
                        <span className="text-sm font-bold text-[#4CAF50] font-inter uppercase">
                          {plano.dados_usuario.objetivo}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#333333] font-inter mb-2">
                        Plano de 26 Semanas
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#4CAF50]" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#666666]">
                      <Calendar className="w-4 h-4" />
                      <span>Criado em {formatarData(plano.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#666666]">
                      <span>Início: {plano.dados_usuario.inicioPlano}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-[#666666] mb-1">Peso</p>
                      <p className="text-sm font-bold text-[#333333]">{plano.dados_usuario.peso} kg</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-[#666666] mb-1">Altura</p>
                      <p className="text-sm font-bold text-[#333333]">{plano.dados_usuario.altura} cm</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-[#666666] mb-1">Idade</p>
                      <p className="text-sm font-bold text-[#333333]">{plano.dados_usuario.idade} anos</p>
                    </div>
                  </div>
                </div>

                <div className="h-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-[#666666]">
        <p className="text-sm">SantozzNutri - Seu sucesso começa com um bom plano 🥗</p>
      </div>
    </div>
  );
}
