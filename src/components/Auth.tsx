import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AuthenticationScreenProps {
  onAuthenticated: () => void;
  accessCode: string;
  onFetchUserData?: () => void;
}

/**
 * Componente de Autenticación HoloMeta
 * Gestiona el flujo de login con:
 * - Paso 1: Verificación facial (placeholder)
 * - Paso 2: Usuario + Código de acceso
 * - localStorage para recordar usuario
 * - Animaciones de éxito/error
 * - Validación en desarrollo y producción
 */
export default function AuthenticationScreen({
  onAuthenticated,
  accessCode,
  onFetchUserData,
}: AuthenticationScreenProps) {
  const [step, setStep] = useState<'facial' | 'credentials'>('facial');
  const [usuario, setUsuario] = useState('');
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // En desarrollo permite código por defecto; en producción exige ACCESS_CODE configurado
  const CODIGO_CORRECTO = accessCode || (import.meta.env.DEV ? '246810' : '');

  // Al cargar, pre-llenar usuario si existe en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('usuarioHoloMeta');
    if (storedUser) {
      setUsuario(storedUser);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (CODIGO_CORRECTO && codigo === CODIGO_CORRECTO && usuario.trim() !== '') {
      // Guardar usuario
      localStorage.setItem('usuarioHoloMeta', usuario.trim());
      setError(false);
      setSuccess(true);

      // Llamar callback y fetch de datos del usuario después de animación
      setTimeout(() => {
        setSuccess(false);
        if (onFetchUserData) {
          onFetchUserData();
        }
        onAuthenticated();
      }, 800);
    } else {
      setError(true);
      setSuccess(false);
      setCodigo('');
      
      // Quitar error después de animación
      setTimeout(() => setError(false), 500);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('usuarioHoloMeta');
    setUsuario('');
    setCodigo('');
    setError(false);
    setSuccess(false);
  };

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
              onClick={() => setStep('credentials')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-light py-3 rounded-lg transition-colors"
            >
              Continuar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`space-y-4 ${error ? 'auth-error' : success ? 'auth-success' : ''}`}>
            <p className="text-gray-700 mb-6 font-light">
              Ingresa tus credenciales
            </p>
            
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-all ${
                error ? 'border-red-500 bg-red-50' : success ? 'border-green-500 bg-green-50' : 'border-green-300 focus:border-green-600'
              }`}
            />
            
            {/* Código de acceso */}
            <input
              type="text"
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.slice(0, 6))}
              maxLength={6}
              className={`w-full border-2 rounded-lg p-3 text-center text-2xl font-mono tracking-widest focus:outline-none transition-all ${
                error ? 'border-red-500 bg-red-50' : success ? 'border-green-500 bg-green-50' : 'border-green-300 focus:border-green-600'
              }`}
            />
            {!CODIGO_CORRECTO && (
              <p className="text-amber-600 text-sm font-light">
                Configura VITE_ACCESS_CODE en producción para habilitar el acceso.
              </p>
            )}
            
            {error && (
              <p className="text-red-600 text-sm font-light">Código incorrecto. Intenta de nuevo.</p>
            )}
            
            <button
              type="submit"
              disabled={!usuario.trim() || codigo.length < 6 || !CODIGO_CORRECTO}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-light py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              Entrar
            </button>

            {usuario && (
              <button
                type="button"
                onClick={handleClear}
                className="w-full text-sm text-gray-500 hover:text-gray-700 font-light py-2 px-4 rounded-lg transition-colors border border-gray-300 hover:border-gray-400"
              >
                Cambiar usuario
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
