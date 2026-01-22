import React from 'react';
import { YouTubeEmbed } from './YouTubeEmbed'; // New import

export const SocialProof: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">El Test de la Manzana</h2>
          <p className="text-lg text-slate-600">Si protege una manzana de la oxidación, imagina lo que hace por tu piel.</p>
        </div>

        {/* Replaced with YouTube Embed */}
        <YouTubeEmbed videoId="FLa8WvwJBVo" title="Demostración del Test de la Manzana Chronos-C Shield" />

        <div className="mt-8 text-center text-sm text-slate-400">
            *Prueba realizada en ambiente controlado a 25°C durante 24 horas.
        </div>
      </div>
    </section>
  );
};
