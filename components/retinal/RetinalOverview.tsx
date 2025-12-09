import React from 'react';
import { Sparkles, ShieldCheck, Moon } from 'lucide-react';
import { BeforeAfterSlider } from '../BeforeAfterSlider';

export const RetinalOverview: React.FC = () => {
  return (
    <section id="overview" className="scroll-mt-40">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Sparkles className="text-purple-500" /> Resultados Sin Compromiso
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
          <ShieldCheck size={32} className="text-purple-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Barrera Intacta</h3>
          <p className="text-slate-400">
            Olvida la descamación. Nuestro sistema de entrega encapsulado libera el activo lentamente para prevenir la &quot;purga&quot;.
          </p>
        </div>
        <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
          <Moon size={32} className="text-purple-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Acción Nocturna</h3>
          <p className="text-slate-400">
            Aprovecha el ritmo circadiano de tu piel. Repara el daño del día mientras duermes profundamente.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <BeforeAfterSlider
                          beforeImageSrc="/images/retinal-before.jpeg" 
                          afterImageSrc="/images/retinal-after.jpeg"           alt="Retinal Before and After Skin Texture"
        />
      </div>
    </section>
  );
};