import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Heart, Leaf } from 'lucide-react';
import AuthenticationScreen from '@/components/Auth';

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
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [peaceLevel, setPeaceLevel] = useState(5);
  const [peaceSentToday, setPeaceSentToday] = useState(0);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<PeaceMetrics>({
    peopleInPeace: 247,
    peaceSharesToday: 1234,
    energyRegenerated: 89,
  });
  const [showLightTrail, setShowLightTrail] = useState(false);

  // Control de acceso mediante variables de entorno
  const PUBLIC_MODE = import.meta.env.VITE_PUBLIC_MODE === 'true';
  const ACCESS_CODE = (import.meta.env.VITE_ACCESS_CODE as string) || '';
  const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000';

  // Si está en modo público, autentica automáticamente
  useEffect(() => {
    if (PUBLIC_MODE) {
      setIsAuthenticated(true);
      fetchUserData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PUBLIC_MODE]);

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

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${API_URL}/user`);
      if (res.ok) {
        const data = await res.json();
        setCurrentUserName(data.name);
      }
    } catch (e) {
      console.warn('API no disponible, usando nombre local:', e);
    }
  };

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
    return (
      <AuthenticationScreen
        onAuthenticated={() => setIsAuthenticated(true)}
        accessCode={ACCESS_CODE}
        onFetchUserData={fetchUserData}
      />
    );
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
        {currentUserName && (
          <p className="text-sm text-green-600 font-light mt-2">
            Bienvenido, {currentUserName} ✨
          </p>
        )}
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
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center gap-6 p-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Meditación Ho'oponopono
            </h3>
            <p className="text-gray-600 text-center">
              Esta meditación ancestral hawaiana te guiará hacia la paz interior y el perdón.
            </p>
            <a
              href="https://www.youtube.com/watch?v=ncogj6dHsiY"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Ver en YouTube
            </a>
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
