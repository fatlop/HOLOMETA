# Guía de Ejecución - HoloMeta

## 🚀 Cómo Ejecutar el Proyecto Localmente

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/fatlop/HOLOMETA.git
cd HOLOMETA
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

Esto descarga todo lo que React, Vite y TailwindCSS necesitan. 

**Requisitos:** Asegúrate de tener Node.js 18 o superior instalado.

### 3️⃣ Configurar Acceso (Protegido)

Por defecto, el proyecto requiere un código de acceso. Para configurarlo:

```bash
cp .env.example .env
```

Edita el archivo `.env` y ajusta:
- `VITE_ACCESS_CODE=tu_codigo` - Tu código personal de 6 dígitos
- `VITE_PUBLIC_MODE=false` - Modo cerrado (requiere código)

Para **abrir al público sin código (solo demos)**, cambia a `VITE_PUBLIC_MODE=true`.

En **producción**, debes configurar las variables en tu plataforma (Vercel/Netlify):

- En Vercel: Project Settings → Environment Variables → añade `VITE_ACCESS_CODE` y deja `VITE_PUBLIC_MODE=false`.
- En Netlify: Site settings → Environment variables → añade `VITE_ACCESS_CODE` y deja `VITE_PUBLIC_MODE=false`.

Si despliegas sin configurar `VITE_ACCESS_CODE`, la app no permitirá el acceso y mostrará un aviso para que lo configures.

### 3.1 Ambientes por modo (recomendado)

Ya incluimos dos archivos:

- `.env.development`: abre el acceso en local (`VITE_PUBLIC_MODE=true`) para pruebas rápidas
- `.env.production`: exige código en producción (`VITE_PUBLIC_MODE=false`) y deja `VITE_ACCESS_CODE` vacío para obligar a configurarlo en la plataforma

Esto garantiza que el repo sea público, pero el acceso a producción esté protegido por código.

### 4️⃣ Ejecutar el Proyecto

```bash
npm run dev
```

Esto levanta el servidor de desarrollo de Vite. Deberías ver:

```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5️⃣ Abrir en el Navegador

Abre: **http://localhost:5173**

Debes ver la app de HoloMeta corriendo, lista para interactuar.

---

## 💡 Tips y Trucos

### Hot Reload Automático
Si quieres ver cambios al vuelo, solo edita archivos y Vite recargará automáticamente. No necesitas reiniciar el servidor.

### Cerrar el Servidor
Para cerrar el servidor, presiona **Ctrl + C** en la terminal.

### Modo Producción Local
Para ver cómo se verá en producción:
```bash
npm run build
npm run preview
```

---

## 📋 Comandos Útiles

### Desarrollo

```bash
npm run dev          # Inicia servidor de desarrollo con hot reload
```

### Producción

```bash
npm run build        # Compila el proyecto para producción
npm run preview      # Previsualiza la versión de producción
```

### Calidad de Código

```bash
npm run lint         # Ejecuta ESLint para verificar el código
```

---

## 🔧 Solución de Problemas

### Error: "Module not found"

```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 5173 is already in use"

```bash
# Opción 1: Mata el proceso que usa el puerto
lsof -ti:5173 | xargs kill -9

# Opción 2: Usa otro puerto
npm run dev -- --port 3000
```

### Error de TypeScript

```bash
# Limpia la caché de TypeScript
rm -rf node_modules/.vite
npm run dev
```

---

## 🌐 Desplegar Demo Online (Opcional)

¿Quieres mostrar HoloMeta al mundo? Puedes desplegarlo en **Vercel** con un click:

### Opción 1: Deploy con Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com) y conecta tu cuenta de GitHub
2. Importa el repo `fatlop/HOLOMETA`
3. Vercel detectará automáticamente Vite y hará build
4. Listo, tu app estará en línea con URL pública

#### Dominios y redirecciones (Vercel)

- Dominio principal: qpandatecnovador.com (laboratorio y apps)
- Dominio secundario: vibexlegend.com (comunidad)

Incluimos `vercel.json` con una regla que redirige todo el tráfico de `vibexlegend.com` → `https://qpandatecnovador.com` (código 308), preservando las rutas.

Para mantener rutas en el secundario, añade reglas específicas adicionales en Vercel (o crea un proyecto aparte para vibexlegend con su propia configuración).

Además, se agregan headers de seguridad (HSTS, nosniff, SAMEORIGIN, Referrer-Policy, Permissions-Policy y `upgrade-insecure-requests`) para forzar HTTPS y mejorar seguridad.

### Opción 2: Deploy con Netlify

#### Dominios y redirecciones (Netlify)

Si despliegas el sitio secundario en Netlify, hemos añadido `public/_redirects` con:

```
/*    https://qpandatecnovador.com/:splat    301!
```

Esto redirige todo a tu dominio principal. Asegúrate de configurar `qpandatecnovador.com` como dominio primario en Netlify para evitar duplicidades.

También incluimos `public/_headers` con HSTS y headers de seguridad equivalentes.

---

## 🔐 SSL/TLS y CORS (Producción)

### SSL/TLS
- Vercel y Netlify emiten certificados automáticamente (Let’s Encrypt).
- Forzamos HTTPS vía HSTS y `upgrade-insecure-requests`.

### CORS (si usas backend compartido)
Permite solo tus dominios.

Ejemplo Express/Node:

```js
import express from 'express';
import cors from 'cors';

const app = express();
const allowedOrigins = [
  'https://qpandatecnovador.com',
  'https://vibexlegend.com'
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
```

Ejemplo Nginx:

```nginx
add_header Access-Control-Allow-Origin "https://qpandatecnovador.com https://vibexlegend.com";
add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type, Authorization";
add_header Access-Control-Allow-Credentials "true";
```

## ✅ Chequeo automatizado de deploy
Usa `npm run check:deploy` para validar:
- Redirecciones de dominio
- HTTPS forzado
- CORS del backend (si configuras `CHECK_API_URL`)

1. Ve a [netlify.com](https://netlify.com)
2. "Add new site" → Import from Git
3. Conecta GitHub y selecciona `HOLOMETA`
4. Build command: `npm run build`
5. Publish directory: `dist`

**Importante:** Si usas control de acceso (`.env`), configura las variables de entorno en la plataforma de deploy.

---

## 💡 Notas Importantes

- **Node.js**: Asegúrate de tener Node.js 18 o superior
- **Puerto**: El proyecto usa el puerto 5173 por defecto
- **Hot Reload**: Los cambios se reflejan automáticamente sin reiniciar
- **Build**: El proyecto compilado se guarda en la carpeta `dist/`
- **Licencia**: CC BY-NC 4.0 - Uso no comercial con atribución

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Verifica que Node.js está instalado: `node --version`
2. Verifica que npm está instalado: `npm --version`
3. Lee los mensajes de error cuidadosamente
4. Revisa el archivo [README.md](README.md) para más detalles
5. Abre un issue en: https://github.com/fatlop/HOLOMETA/issues

---

**¡Listo para comenzar tu viaje en HoloMeta!** 🌱✨
