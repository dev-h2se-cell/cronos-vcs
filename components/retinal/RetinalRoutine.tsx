import React from 'react';
import { ProductData } from '../../types'; // Import ProductData

interface Props {
  productsData: ProductData;
}

export const RetinalRoutine: React.FC<Props> = ({ productsData }) => {
  const retinalProduct = productsData.products.find(p => p.id === 'infinity-retinal');
  const chronosCProduct = productsData.products.find(p => p.id === 'chronos-c-shield');
  const invisibleShieldProduct = productsData.products.find(p => p.id === 'invisible-shield-spf');


  if (!retinalProduct || !chronosCProduct || !invisibleShieldProduct) {
    return <div>Error: Retinal product data not found.</div>;
  }

  const routineSteps = [
    { title: 'Noches 1-2', action: 'Tratamiento', desc: `Aplica ${retinalProduct.name} sobre piel limpia y seca.` },
    { title: 'Noches 3-4', action: 'Recuperación', desc: 'Solo hidratación y descanso.' },
    { title: 'Mañanas', action: 'Protección', desc: `Siempre usa ${chronosCProduct.name} y ${invisibleShieldProduct.name}.` }
  ];

  return (
    <section id="routine" className="scroll-mt-40">
      <h2 className="text-2xl font-bold mb-8">Skin Cycling Simplificado</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {routineSteps.map((step, i) => (
          <div key={i} className="flex-1 bg-slate-900 p-6 rounded-xl border border-white/5">
            <span className="block text-purple-500 font-bold text-lg mb-2">{step.title}</span>
            <h4 className="text-white font-bold mb-2">{step.action}</h4>
            <p className="text-slate-400 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};