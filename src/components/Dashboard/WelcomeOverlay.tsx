import React, { useState, useEffect } from 'react';
import { X, Zap, Brain, Database, TrendingUp, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeOverlayProps {
  onClose: () => void;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: Database,
      title: 'Data Fabric',
      description: 'Unificazione completa dei dati aziendali con governance integrata',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      icon: Brain,
      title: 'AI Intelligente',
      description: 'Moduli AI specializzati per automazione e ottimizzazione processi',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      icon: Zap,
      title: 'Real-Time Analytics',
      description: 'Monitoraggio e previsioni in tempo reale per decisioni data-driven',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
    {
      icon: Shield,
      title: 'Sicurezza Enterprise',
      description: 'Protezione avanzata dei dati con controlli di accesso granulari',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Benvenuti in Neosperience Enterprise Cloud
              </h1>
              <p className="text-lg text-gray-600">
                La piattaforma AI-driven per la trasformazione digitale delle PMI manifatturiere
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: currentStep === index ? 1 : 0.7,
                    y: 0,
                    scale: currentStep === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentStep === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                  }`}
                >
                  <div className={`inline-flex p-3 rounded-lg ${feature.bg} mb-3`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Percorso Evolutivo in 3 Fasi
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-white rounded-full mr-2"></span>
                    <span className="text-sm">Fase 1: Armonizzazione dati e backbone digitale</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-white rounded-full mr-2"></span>
                    <span className="text-sm">Fase 2: Automazione intelligente dei processi</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-white rounded-full mr-2"></span>
                    <span className="text-sm">Fase 3: Piattaforma AI-nativa completa</span>
                  </div>
                </div>
              </div>
              <TrendingUp className="h-16 w-16 text-white opacity-20" />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Esplora la Dashboard
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeOverlay;