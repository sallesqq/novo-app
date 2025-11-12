'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Calendar, TrendingUp, ShoppingCart, ChefHat, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

interface PlanoAlimentar {
  id: string;
  dados_usuario: any;
  plano_completo: any;
  created_at: string;
}

export default function VisualizarPlanoPage() {
  const [plano, setPlano] = useState<PlanoAlimentar | null>(null);
  const [loading, setLoading] = useState(true);
  const [semanaAtual, setSemanaAtual] = useState(1);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    carregarPlano();
  }, [params.id]);

  const carregarPlano = async () => {
    try {
      const { data, error } = await supabase
        .from('planos_alimentares')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      setPlano(data);
    } catch (error) {
      console.error('Erro ao carregar plano:', error);
      alert('Erro ao carregar plano');
      router.push('/plano-alimentar');
    } finally {
      setLoading(false);
    }
  };

  const exportarPDF = () => {
    // Implementar exportação para PDF
    alert('Funcionalidade de exportação em desenvolvimento');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  if (!plano) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-[#666666] mb-4">Plano não encontrado</p>
          <Link
            href="/plano-alimentar"
            className="text-[#4CAF50] hover:underline"
          >
            Voltar para criar novo plano
          </Link>
        </div>
      </div>
    );
  }

  const { plano_completo, dados_usuario } = plano;

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/plano-alimentar"
              className="flex items-center gap-2 text-[#666666] hover:text-[#4CAF50] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter font-semibold">Voltar</span>
            </Link>

            <button
              onClick={exportarPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-xl hover:shadow-lg transition-all font-inter font-semibold"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Exportar PDF</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white py-12 px-4 sm:py-16 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-4">
            Seu Plano Alimentar Personalizado
          </h1>
          <p className="text-lg sm:text-xl text-white/90">
            26 semanas de refeições planejadas para {dados_usuario.objetivo}
          </p>
        </div>
      </div>

      {/* Resumo do Usuário */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-6 h-6 text-[#4CAF50]" />
            <h2 className="text-2xl font-bold text-[#333333] font-inter">Resumo do Seu Perfil</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-[#666666] font-inter mb-1">Objetivo</p>
              <p className="text-lg font-bold text-[#333333] font-inter">{dados_usuario.objetivo}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-[#666666] font-inter mb-1">Peso Atual</p>
              <p className="text-lg font-bold text-[#333333] font-inter">{dados_usuario.peso} kg</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-sm text-[#666666] font-inter mb-1">Altura</p>
              <p className="text-lg font-bold text-[#333333] font-inter">{dados_usuario.altura} cm</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-[#666666] font-inter mb-1">Atividade</p>
              <p className="text-lg font-bold text-[#333333] font-inter capitalize">{dados_usuario.nivelAtividade}</p>
            </div>
          </div>

          {plano_completo.resumo && (
            <div className="mt-6 p-4 bg-[#F4F6F8] rounded-xl">
              <h3 className="font-bold text-[#333333] font-inter mb-2">Metas Nutricionais Diárias:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-[#666666]">Calorias</p>
                  <p className="text-xl font-bold text-[#4CAF50]">{plano_completo.resumo?.calorias || 'N/A'} kcal</p>
                </div>
                <div>
                  <p className="text-sm text-[#666666]">Proteínas</p>
                  <p className="text-xl font-bold text-[#4CAF50]">{plano_completo.resumo?.proteinas || 'N/A'} g</p>
                </div>
                <div>
                  <p className="text-sm text-[#666666]">Carboidratos</p>
                  <p className="text-xl font-bold text-[#4CAF50]">{plano_completo.resumo?.carboidratos || 'N/A'} g</p>
                </div>
                <div>
                  <p className="text-sm text-[#666666]">Gorduras</p>
                  <p className="text-xl font-bold text-[#4CAF50]">{plano_completo.resumo?.gorduras || 'N/A'} g</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seletor de Semana */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-[#4CAF50]" />
            <h2 className="text-2xl font-bold text-[#333333] font-inter">Selecione a Semana</h2>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-13 gap-2">
            {Array.from({ length: 26 }, (_, i) => i + 1).map((semana) => (
              <button
                key={semana}
                onClick={() => setSemanaAtual(semana)}
                className={`py-2 px-3 rounded-lg font-inter font-semibold transition-all ${
                  semanaAtual === semana
                    ? 'bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-[#666666] hover:bg-gray-200'
                }`}
              >
                {semana}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo da Semana */}
        {plano_completo.semanas && plano_completo.semanas[semanaAtual - 1] ? (
          <div className="space-y-8">
            {/* Cardápio da Semana */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <ChefHat className="w-6 h-6 text-[#4CAF50]" />
                <h2 className="text-2xl font-bold text-[#333333] font-inter">
                  Cardápio - Semana {semanaAtual}
                </h2>
              </div>

              <div className="space-y-6">
                {plano_completo.semanas[semanaAtual - 1].dias?.map((dia: any, index: number) => (
                  <div key={index} className="border-2 border-gray-100 rounded-xl p-4">
                    <h3 className="text-xl font-bold text-[#333333] font-inter mb-4">
                      {dia.diaSemana || `Dia ${index + 1}`}
                    </h3>

                    <div className="space-y-3">
                      {dia.refeicoes?.map((refeicao: any, idx: number) => (
                        <div key={idx} className="bg-[#F4F6F8] rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-[#4CAF50] font-inter">{refeicao.tipo}</p>
                              <p className="text-[#333333] font-inter">{refeicao.prato}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-[#666666]">{refeicao.kcal} kcal</p>
                              <p className="text-xs text-[#999999]">
                                P: {refeicao.proteinas}g | C: {refeicao.carboidratos}g | G: {refeicao.gorduras}g
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-[#666666] mb-1">
                            <strong>Porção:</strong> {refeicao.porcao}
                          </p>
                          <p className="text-sm text-[#666666] mb-1">
                            <strong>Preparo:</strong> {refeicao.preparo}
                          </p>
                          <p className="text-xs text-[#999999]">
                            ⏱️ {refeicao.tempo}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t-2 border-gray-200">
                      <p className="text-sm font-bold text-[#333333] font-inter">
                        Total do dia: {dia.totalKcal} kcal | P: {dia.totalProteinas}g | C: {dia.totalCarboidratos}g | G: {dia.totalGorduras}g
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de Compras */}
            {plano_completo.semanas[semanaAtual - 1].listaCompras && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingCart className="w-6 h-6 text-[#4CAF50]" />
                  <h2 className="text-2xl font-bold text-[#333333] font-inter">
                    Lista de Compras - Semana {semanaAtual}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(plano_completo.semanas[semanaAtual - 1].listaCompras).map(([categoria, itens]: [string, any]) => (
                    <div key={categoria} className="bg-[#F4F6F8] rounded-xl p-4">
                      <h3 className="font-bold text-[#333333] font-inter mb-3 capitalize">{categoria}</h3>
                      <ul className="space-y-2">
                        {Array.isArray(itens) && itens.map((item: string, idx: number) => (
                          <li key={idx} className="text-sm text-[#666666] flex items-start gap-2">
                            <span className="text-[#4CAF50] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {plano_completo.semanas[semanaAtual - 1].custoEstimado && (
                  <div className="mt-6 p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-[#666666] font-inter">
                      <strong>Custo estimado da semana:</strong> R$ {plano_completo.semanas[semanaAtual - 1].custoEstimado}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Batch Cooking */}
            {plano_completo.semanas[semanaAtual - 1].batchCooking && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-[#4CAF50]" />
                  <h2 className="text-2xl font-bold text-[#333333] font-inter">
                    Batch Cooking - Domingo
                  </h2>
                </div>

                <div className="space-y-3">
                  {plano_completo.semanas[semanaAtual - 1].batchCooking.map((item: string, idx: number) => (
                    <div key={idx} className="bg-[#F4F6F8] rounded-lg p-3">
                      <p className="text-[#666666] font-inter">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-[#666666] font-inter">
              Dados da semana {semanaAtual} não disponíveis
            </p>
          </div>
        )}

        {/* Aviso de Segurança */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <p className="text-sm text-[#666666] font-inter">
            ⚠️ <strong>Importante:</strong> Este plano é gerado automaticamente e não substitui a consulta com um nutricionista ou médico. 
            Em caso de condições clínicas específicas, sempre consulte um profissional de saúde antes de iniciar qualquer plano alimentar.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-[#666666]">
        <p className="text-sm">SantozzNutri - Seu sucesso começa com um bom plano 🥗</p>
      </div>
    </div>
  );
}
