'use client';

import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  useEffect(() => {
    // Confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] to-[#45a049] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center animate-in zoom-in-95 duration-500">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-700 delay-200">
              <Check className="w-12 h-12 text-white animate-in zoom-in duration-500 delay-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-[#333333] font-inter mb-4 animate-in slide-in-from-bottom duration-700 delay-300">
            Pagamento Aprovado!
          </h1>
          
          <p className="text-xl text-[#4CAF50] font-inter font-semibold mb-6 animate-in slide-in-from-bottom duration-700 delay-400">
            Bem-vindo(a) ao Pro! 🎉
          </p>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border-2 border-[#4CAF50]/20 animate-in slide-in-from-bottom duration-700 delay-500">
            <p className="text-[#666666] font-inter mb-4">
              Agora você tem acesso completo a:
            </p>
            <div className="space-y-2">
              {['Todas as categorias de alimentos', 'Atualizações exclusivas', 'Suporte prioritário', 'Experiência sem anúncios'].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 justify-center">
                  <Check className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-[#333333] font-inter text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/"
            className="inline-block w-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-4 rounded-xl font-inter font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom duration-700 delay-600"
          >
            Começar a Explorar
          </Link>

          {/* Footer */}
          <p className="text-sm text-[#666666] font-inter mt-6 animate-in fade-in duration-700 delay-700">
            Um email de confirmação foi enviado para você
          </p>
        </div>
      </div>
    </div>
  );
}
