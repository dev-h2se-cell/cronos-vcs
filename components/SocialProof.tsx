import React from 'react';
import { Play } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">El Test de la Manzana</h2>
          <p className="text-lg text-slate-600">Si protege una manzana de la oxidación, imagina lo que hace por tu piel.</p>
        </div>

        <div className="relative aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group cursor-pointer">
          {/* Video/GIF Placeholder replaced with Local Asset */}
          <img 
            src="/apple-comparison.jpg" 
            onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/apple/1920/1080'} // Fallback only if local missing
            alt="Apple Oxidation Test Timelapse" 
            className="w-full h-full object-cover filter brightness-75 transition-all duration-500 group-hover:brightness-50"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 transition-transform transform group-hover:scale-110">
                <Play className="text-white fill-white ml-1" size={32} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/90 to-transparent text-white">
            <div className="flex justify-between items-end font-mono text-xs md:text-sm tracking-wider">
                <div className="text-left">
                    <span className="block text-red-400 font-bold mb-1">LADO IZQUIERDO</span>
                    <span className="opacity-80">Sin Tratar (24h)</span>
                </div>
                <div className="text-right">
                    <span className="block text-green-400 font-bold mb-1">LADO DERECHO</span>
                    <span className="opacity-80">Escudo Chronos-C</span>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-400">
            *Prueba realizada en ambiente controlado a 25°C durante 24 horas.
        </div>
      </div>
    </section>
  );
};