import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Heart, Leaf } from 'lucide-react';

/**
 * HoloRaíces: "El Momento de Paz"
 * La pantalla única que encarna el Principio No Negociable:
 * "Nada de este sistema puede crecer si no regenera algo: a una persona, a una comunidad o al entorno."
 */

interface PeaceMetrics {
  peopleInPeace: number;
  peaceSharesToday: number;
  energyRegenerated: number;
}

export default function MomentoDePaz() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showBreathing, setShowBreathing] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [peaceLevel, setPeaceLevel] = useState(5);
  const [peaceSentToday, setPeaceSentToday] = useState(0);
  const [metrics, setMetrics] = useState<PeaceMetrics>({
    peopleInPeace: 247,
    peaceSharesToday: 1234,
    energyRegenerated: 89,
  });
  const [showLightTrail, setShowLightTrail] = useState(false);

  // Simular actualización de métricas cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        peopleInPeace: prev.peopleInPeace + Math.floor(Math.random() * 10),
        peaceSharesToday: prev.peaceSharesToday + Math.floor(Math.random() * 50),
        energyRegenerated: Math.min(100, prev.energyRegenerated + Math.random() * 5),
      }));
    }, 300000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  const handleSharePeace = () => {
    setShowLightTrail(true);
    setPeaceSentToday(prev => prev + peaceLevel);

    // Animación de luz viajando
    setTimeout(() => {
      setShowLightTrail(false);
      setShowShareModal(false);
    }, 2000);
  };

  if (!isAuthenticated) {
    return <AuthenticationScreen onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center p-8">
      {/* Zona de Respiración */}
      <div className="mb-16 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-8">
          {/* Círculo respirando */}
          <div
            className="absolute inset-0 rounded-full border-4 border-green-600 opacity-30"
            style={{
              animation: 'breathe 10s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-blue-500 opacity-20"
            style={{
              animation: 'breathe 10s ease-in-out infinite 0.5s',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-12 h-12 text-green-600 opacity-60" />
          </div>
        </div>
        <p className="text-lg text-gray-700 font-light text-center">
          Respira. Estás en paz.
        </p>
      </div>

      {/* Zona de Conexión */}
      <div className="w-full max-w-md mb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Video Thumbnail */}
          <div className="relative w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <div className="text-center">
              <Leaf className="w-16 h-16 text-white mx-auto mb-2" />
              <p className="text-white text-sm font-light">Meditación Ho'oponopono</p>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            <h3 className="text-xl font-serif text-gray-800 mb-2">
              Meditación Ho'oponopono: Limpia Tu Energía Hoy
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-light">
              Una práctica ancestral hawaiana para liberar memorias y permitir que la paz fluya nuevamente.
            </p>
            <Button
              onClick={() => setShowVideoModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-light py-3 rounded-lg transition-colors"
            >
              Escuchar
            </Button>
          </div>
        </div>
      </div>

      {/* Zona de Cooperación */}
      <div className="w-full max-w-md mb-12 text-center">
        <Button
          onClick={() => setShowShareModal(true)}
          variant="outline"
          className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 font-light py-6 rounded-lg transition-colors"
        >
          Compartir Paz
        </Button>
        <p className="text-xs text-gray-600 mt-4 font-light">
          Tu energía ayuda a alguien más a encontrar tranquilidad. Sin esperar nada a cambio.
        </p>
      </div>

      {/* Pie: Datos Vivos */}
      <div className="w-full max-w-md border-t border-green-200 pt-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-mono text-green-600">{metrics.peopleInPeace}</p>
            <p className="text-xs text-gray-600 font-light">Personas en paz ahora</p>
          </div>
          <div>
            <p className="text-2xl font-mono text-blue-500">{metrics.peaceSharesToday}</p>
            <p className="text-xs text-gray-600 font-light">Paz compartida hoy</p>
          </div>
          <div>
            <p className="text-2xl font-mono text-green-500">{metrics.energyRegenerated}%</p>
            <p className="text-xs text-gray-600 font-light">Energía regenerada</p>
          </div>
        </div>
      </div>

      {/* Modal de Video */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-2xl">
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
            {/* Placeholder para video de YouTube */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ncogj6dHsiY"
              title="Meditación Ho'oponopono"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Compartir Paz */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-sm">
          <div className="text-center py-6">
            <h3 className="text-xl font-serif text-gray-800 mb-6">
              ¿Cuánta paz quieres compartir hoy?
            </h3>

            {/* Slider con símbolos */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl">🌱</span>
              <Slider
                value={[peaceLevel]}
                onValueChange={(value) => setPeaceLevel(value[0])}
                min={1}
                max={10}
                step={1}
                className="flex-1 mx-4"
              />
              <span className="text-2xl">🌳</span>
            </div>

            <p className="text-2xl font-mono text-green-600 mb-6">{peaceLevel} unidades</p>

            {/* Luz viajando */}
            {showLightTrail && (
              <div className="mb-6 h-12 relative">
                <div
                  className="absolute left-0 top-1/2 w-3 h-3 bg-green-400 rounded-full shadow-lg"
                  style={{
                    animation: 'travelUp 2s ease-in forwards',
                  }}
                />
              </div>
            )}

            {!showLightTrail && (
              <Button
                onClick={handleSharePeace}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-light py-3 rounded-lg transition-colors"
              >
                Enviar
              </Button>
            )}

            {showLightTrail && (
              <p className="text-sm text-green-600 font-light">
                Tu paz está en la red. Alguien la recibirá cuando la necesite.
              </p>
            )}

            {peaceSentToday > 0 && !showLightTrail && (
              <p className="text-xs text-gray-600 mt-4 font-light">
                Paz compartida hoy: {peaceSentToday} de 10
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Estilos de animación */}
      <style>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes travelUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Pantalla de Autenticación
 */
function AuthenticationScreen({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [step, setStep] = useState<'facial' | 'code'>('facial');
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        <h1 className="text-3xl font-serif text-green-600 mb-2">HoloRaíces</h1>
        <p className="text-sm text-gray-600 mb-8 font-light">Conciencia Viva</p>

        {step === 'facial' ? (
          <div>
            <p className="text-gray-700 mb-6 font-light">
              Bienvenido. Aquí tu presencia importa.
            </p>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-6">
              <p className="text-gray-500 text-sm font-light">Cámara lista</p>
            </div>
            <Button
              onClick={() => setStep('code')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-light py-3 rounded-lg transition-colors"
            >
              Continuar
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-6 font-light">
              Ingresa el código de 6 dígitos que recibiste
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              className="w-full text-center text-3xl font-mono tracking-widest border-2 border-green-300 rounded-lg p-4 mb-6 focus:outline-none focus:border-green-600"
            />
            <Button
              onClick={onAuthenticated}
              disabled={code.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-light py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              Entrar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
