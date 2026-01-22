import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
                <span className="text-2xl font-bold text-white tracking-widest uppercase block mb-4">Chronos</span>
                <p className="max-w-xs">Bio-ingeniería para la longevidad de la piel. Sin mitos, solo ciencia estable.</p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Legal</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white">Términos de Servicio</a></li>
                    <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
                    <li><a href="#" className="hover:text-white">Política de Envíos</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Contacto</h4>
                <ul className="space-y-2">
                    <li>soporte@chronos-skin.com</li>
                    <li>Bogotá, Colombia</li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            © {new Date().getFullYear()} CHRONOS-C Shield™. Todos los derechos reservados.
        </div>
    </footer>
  );
};