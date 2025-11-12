'use client';

import { X, Check, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const benefits = [
    'Acesso completo a todas as categorias de alimentos',
    'Fibras, Carboidratos e Gorduras Boas desbloqueados',
    'Atualizações constantes com novos alimentos',
    'Suporte prioritário',
    'Sem anúncios',
  ];

  const handleUpgrade = () => {
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#4CAF50] to-[#45a049] p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center font-inter mb-2">
            Desbloqueie o Guia Completo!
          </h2>
          <p className="text-center text-white/90 font-inter">
            Tenha acesso ilimitado a todas as categorias
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Benefits */}
          <div className="space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-[#4CAF50]" />
                </div>
                <p className="text-[#333333] font-inter">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border-2 border-[#4CAF50]/20">
            <div className="text-center">
              <p className="text-[#666666] font-inter mb-2">Plano Mensal</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-bold text-[#4CAF50] font-inter">
                  R$ 27,90
                </span>
                <span className="text-[#666666] font-inter">/mês</span>
              </div>
              <p className="text-sm text-[#666666] font-inter mt-2">
                Cancele quando quiser
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-4 rounded-xl font-inter font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            QUERO SER PRO - R$ 27,90/mês
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-[#666666] font-inter mt-4">
            Pagamento seguro • Cancele a qualquer momento
          </p>
        </div>
      </div>
    </div>
  );
}
