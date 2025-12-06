import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';
import faqData from '../faq.json';

const faqs: FAQItem[] = faqData.faqs;

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Preguntas Frecuentes</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-slate-200 pb-4">
              <button 
                className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-bold text-slate-800 text-lg pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-orange-500 shrink-0" />
                ) : (
                  <ChevronDown className="text-slate-400 shrink-0" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 pb-4 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};