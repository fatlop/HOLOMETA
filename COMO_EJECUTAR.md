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

### Opción 2: Deploy con Netlify

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
