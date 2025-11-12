'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, User, Activity, DollarSign, Clock, ChefHat, MapPin, Heart, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function PlanoAlimentarPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    objetivo: '',
    inicioPlano: '',
    sexo: '',
    idade: '',
    altura: '',
    peso: '',
    gordura: '',
    nivelAtividade: '',
    treinos: '',
    restricoes: '',
    preferencias: '',
    orcamento: '',
    tempoCozinha: '',
    equipamentos: '',
    localidade: '',
    dadosClinicos: '',
    horarios: ''
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);

    try {
      // Obter token de autenticação
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert('Você precisa estar logado para gerar um plano');
        router.push('/auth');
        return;
      }

      const response = await fetch('/api/gerar-plano', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar plano');
      }

      const data = await response.json();
      
      // Redirecionar para página de visualização do plano
      router.push(`/plano-alimentar/${data.planoId}`);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao gerar plano. Tente novamente.');
    } finally {
      setGenerating(false);
    }
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

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#333333] font-inter">
                Plano Alimentar
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white py-12 px-4 sm:py-16 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-4">
            Crie Seu Plano Alimentar Personalizado
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            26 semanas de refeições planejadas especialmente para você alcançar seus objetivos
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-8">
          
          {/* Objetivo Principal */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold text-[#333333] font-inter">Objetivo Principal</h2>
            </div>
            <select
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
            >
              <option value="">Selecione seu objetivo</option>
              <option value="Emagrecimento">Emagrecimento</option>
              <option value="Melhora da saúde">Melhora da saúde</option>
              <option value="Ganho de massa muscular">Ganho de massa muscular</option>
            </select>
          </div>

          {/* Dados Pessoais */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-6 h-6 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold text-[#333333] font-inter">Dados Pessoais</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                  Início do Plano
                </label>
                <input
                  type="date"
                  name="inicioPlano"
                  value={formData.inicioPlano}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                  Sexo
                </label>
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                  Idade (anos)
                </label>
                <input
                  type="number"
                  name="idade"
                  value={formData.idade}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  name="altura"
                  value={formData.altura}
                  onChange={handleChange}
                  required
                  min="100"
                  max="250"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  required
                  min="30"
                  max="300"
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                  % de Gordura (opcional)
                </label>
                <input
                  type="number"
                  name="gordura"
                  value={formData.gordura}
                  onChange={handleChange}
                  min="5"
                  max="60"
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
                />
              </div>
            </div>
          </div>

          {/* Atividade Física */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold text-[#333333] font-inter">Atividade Física</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                Nível de Atividade (NEAT)
              </label>
              <select
                name="nivelAtividade"
                value={formData.nivelAtividade}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
              >
                <option value="">Selecione</option>
                <option value="sedentário">Sedentário</option>
                <option value="leve">Leve</option>
                <option value="moderado">Moderado</option>
                <option value="alto">Alto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                Treinos por semana / tipo
              </label>
              <input
                type="text"
                name="treinos"
                value={formData.treinos}
                onChange={handleChange}
                placeholder="Ex: musculação 4x, futebol 2x"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
              />
            </div>
          </div>

          {/* Preferências Alimentares */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-6 h-6 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold text-[#333333] font-inter">Preferências Alimentares</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                Restrições/Alergias
              </label>
              <textarea
                name="restricoes"
                value={formData.restricoes}
                onChange={handleChange}
                rows={2}
                placeholder="Ex: alergia a amendoim, intolerância à lactose"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                Preferências
              </label>
              <textarea
                name="preferencias"
                value={formData.preferencias}
                onChange={handleChange}
                rows={2}
                placeholder="Ex: sem lactose, sem glúten, vegetariano"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter resize-none"
              />
            </div>
          </div>

          {/* Logística */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold text-[#333333] font-inter">Logística</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                  Orçamento diário (R$)
                </label>
                <input
                  type="number"
                  name="orcamento"
                  value={formData.orcamento}
                  onChange={handleChange}
                  placeholder="Ex: 50"
                  min="10"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                  Tempo para cozinhar (min/dia)
                </label>
                <input
                  type="number"
                  name="tempoCozinha"
                  value={formData.tempoCozinha}
                  onChange={handleChange}
                  placeholder="Ex: 60"
                  min="10"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                Equipamentos disponíveis
              </label>
              <input
                type="text"
                name="equipamentos"
                value={formData.equipamentos}
                onChange={handleChange}
                placeholder="Ex: fogão, forno, airfryer, liquidificador"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                Localidade/País
              </label>
              <input
                type="text"
                name="localidade"
                value={formData.localidade}
                onChange={handleChange}
                placeholder="Ex: São Paulo, Brasil"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                Horários de refeições preferidos
              </label>
              <input
                type="text"
                name="horarios"
                value={formData.horarios}
                onChange={handleChange}
                placeholder="Ex: 7h, 10h, 13h, 16h, 19h, 22h"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter"
              />
            </div>
          </div>

          {/* Dados Clínicos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold text-[#333333] font-inter">Dados Clínicos</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#666666] mb-2 font-inter">
                Dados clínicos relevantes e medicamentos
              </label>
              <textarea
                name="dadosClinicos"
                value={formData.dadosClinicos}
                onChange={handleChange}
                rows={3}
                placeholder="Ex: hipertensão, diabetes, medicamentos em uso"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none font-inter resize-none"
              />
            </div>
          </div>

          {/* Aviso de Segurança */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-[#666666] font-inter">
              ⚠️ <strong>Importante:</strong> Este plano é gerado automaticamente e não substitui a consulta com um nutricionista ou médico. 
              Em caso de condições clínicas específicas, sempre consulte um profissional de saúde antes de iniciar qualquer plano alimentar.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={generating}
            className="w-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-4 rounded-xl font-inter font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Gerando seu plano personalizado...
              </span>
            ) : (
              'Gerar Plano Alimentar de 26 Semanas'
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-[#666666]">
        <p className="text-sm">SantozzNutri - Seu sucesso começa com um bom plano 🥗</p>
      </div>
    </div>
  );
}
