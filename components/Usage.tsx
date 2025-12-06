import React from 'react';
import { Sun, Droplets, Clock } from 'lucide-react';

export const Usage: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-2 block">El Ritual Diario</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Cómo Maximizar la Absorción</h2>
          <p className="text-slate-600">Sigue este protocolo cada mañana para garantizar 24 horas de protección antioxidante.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mb-6 mx-auto border-4 border-white shadow-sm z-10 relative">
              1
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Sun className="text-slate-400 group-hover:text-orange-500 transition-colors" size={32} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Limpiar & Secar</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Usa un limpiador suave. Es crítico que tu piel esté <span className="font-bold text-slate-700">completamente seca</span> antes de aplicar la Vitamina C para evitar hormigueo.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mb-6 mx-auto border-4 border-white shadow-sm z-10 relative">
              2
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Droplets className="text-slate-400 group-hover:text-orange-500 transition-colors" size={32} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">1-2 Pumps</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Dispensa 1-2 dosis en la palma de tu mano. Calienta el producto frotando las palmas para activar los lípidos THD.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mb-6 mx-auto border-4 border-white shadow-sm z-10 relative">
              3
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="text-slate-400 group-hover:text-orange-500 transition-colors" size={32} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Presionar & Esperar</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Presiona suavemente sobre rostro y cuello. <span className="font-bold text-slate-700">Espera 2 minutos</span> antes de aplicar tu hidratante o protector solar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};