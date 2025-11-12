'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, CreditCard, Check } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Aqui será integrado com Stripe
    setTimeout(() => {
      setLoading(false);
      router.push('/success');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#4CAF50] hover:text-[#45a049] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-inter">Voltar</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-bold text-[#333333] font-inter mb-6">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-[#4CAF50]/20">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#333333] font-inter mb-1">
                    Assinatura NutriGuia Pro
                  </h3>
                  <p className="text-sm text-[#666666] font-inter">Plano Mensal</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t-2 border-gray-100">
                <div className="flex items-center gap-2 text-[#666666]">
                  <Check className="w-5 h-5 text-[#4CAF50]" />
                  <span className="font-inter">Acesso a todas as categorias</span>
                </div>
                <div className="flex items-center gap-2 text-[#666666]">
                  <Check className="w-5 h-5 text-[#4CAF50]" />
                  <span className="font-inter">Atualizações constantes</span>
                </div>
                <div className="flex items-center gap-2 text-[#666666]">
                  <Check className="w-5 h-5 text-[#4CAF50]" />
                  <span className="font-inter">Suporte prioritário</span>
                </div>
                <div className="flex items-center gap-2 text-[#666666]">
                  <Check className="w-5 h-5 text-[#4CAF50]" />
                  <span className="font-inter">Sem anúncios</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#666666] font-inter">Subtotal</span>
                <span className="text-[#333333] font-inter font-semibold">R$ 27,90</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-[#333333] font-inter mt-4">
                <span>Total</span>
                <span className="text-[#4CAF50]">R$ 27,90/mês</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#333333] font-inter">
                Pagamento Seguro
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-inter font-semibold text-[#333333] mb-2">
                  Nome no Cartão
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none transition-colors font-inter"
                  placeholder="João Silva"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-inter font-semibold text-[#333333] mb-2">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none transition-colors font-inter"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-inter font-semibold text-[#333333] mb-2">
                    Validade
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none transition-colors font-inter"
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-[#333333] mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none transition-colors font-inter"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-4 rounded-xl font-inter font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pagar e Assinar Agora
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div className="pt-6 border-t-2 border-gray-100">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-[#666666]">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs font-inter">Pagamento Seguro</span>
                  </div>
                  <div className="text-xs text-[#666666] font-inter">
                    Powered by <span className="font-bold text-[#635BFF]">Stripe</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-4 opacity-60">
                  <svg className="h-6" viewBox="0 0 38 24" fill="none">
                    <rect width="38" height="24" rx="4" fill="#1434CB"/>
                    <path d="M19 12L15 8V16L19 12Z" fill="white"/>
                    <path d="M19 12L23 16V8L19 12Z" fill="white"/>
                  </svg>
                  <svg className="h-6" viewBox="0 0 38 24" fill="none">
                    <rect width="38" height="24" rx="4" fill="#EB001B"/>
                    <circle cx="15" cy="12" r="7" fill="#FF5F00"/>
                    <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
