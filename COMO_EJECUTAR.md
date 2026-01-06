# Guía de Ejecución - HoloMeta

## 🚀 Cómo Ejecutar el Proyecto

### Paso 1: Navegar a la Carpeta del Proyecto

```bash
cd /workspaces/desktop-tutorial/holometa
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias listadas en `package.json`.

### Paso 3: Instalar Dependencias Adicionales

Algunas dependencias de Radix UI necesitan instalarse por separado:

```bash
npm install @radix-ui/react-dialog @radix-ui/react-slider @radix-ui/react-slot tailwindcss-animate
```

### Paso 4: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Deberías ver un mensaje como:

```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Paso 5: Abrir en el Navegador

1. **Opción A**: Haz clic en el enlace que aparece en la terminal (http://localhost:5173/)

2. **Opción B**: Abre tu navegador manualmente y navega a:
   ```
   http://localhost:5173
   ```

3. **Opción C**: Usa el comando de terminal:
   ```bash
   "$BROWSER" http://localhost:5173
   ```

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

## 📦 Estructura de Ejecución

```
1. npm install → Instala dependencias
2. Vite carga configuración → vite.config.ts
3. TypeScript compila → tsconfig.json
4. Tailwind procesa estilos → tailwind.config.js
5. React renderiza → src/main.tsx → src/App.tsx
6. Servidor listo → http://localhost:5173
```

## 🌐 Crear Repositorio en GitHub

### Opción 1: Usando GitHub CLI (gh)

```bash
# Desde la carpeta holometa
cd /workspaces/desktop-tutorial/holometa

# Crear repositorio en GitHub
gh repo create HoloMeta --public --source=. --remote=origin --push

# O si prefieres privado
gh repo create HoloMeta --private --source=. --remote=origin --push
```

### Opción 2: Manualmente

1. Ve a https://github.com/new
2. Nombre del repositorio: `HoloMeta`
3. Descripción: "Proyecto inmersivo del Multiverso Cheperiano"
4. Elige público o privado
5. **NO** inicialices con README (ya lo tenemos)
6. Crea el repositorio

Luego en tu terminal:

```bash
cd /workspaces/desktop-tutorial/holometa
git remote add origin https://github.com/fatlop/HoloMeta.git
git branch -M main
git push -u origin main
```

## 🎯 Próximos Pasos

1. ✅ Proyecto creado
2. ✅ Git inicializado
3. ⏳ Instalar dependencias
4. ⏳ Ejecutar proyecto
5. ⏳ Crear repositorio en GitHub
6. ⏳ Hacer push a GitHub

## 💡 Notas Importantes

- **Node.js**: Asegúrate de tener Node.js 18 o superior
- **Puerto**: El proyecto usa el puerto 5173 por defecto
- **Hot Reload**: Los cambios se reflejan automáticamente sin reiniciar
- **Build**: El proyecto compilado se guarda en la carpeta `dist/`

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Verifica que Node.js está instalado: `node --version`
2. Verifica que npm está instalado: `npm --version`
3. Lee los mensajes de error cuidadosamente
4. Revisa el archivo README.md para más detalles

---

**¡Listo para comenzar tu viaje en HoloMeta!** 🌱✨

---

## 🔐 Control de Acceso (Primero controlar, luego abrir)

Por defecto, el proyecto requiere un código de acceso antes de entrar. Configúralo así:

1) Crea tu archivo `.env` a partir del ejemplo:

```bash
cd /workspaces/desktop-tutorial/holometa
cp .env.example .env
```

2) Edita `.env` y define tu código de acceso:

```
VITE_PUBLIC_MODE=false
VITE_ACCESS_CODE=246810   # cámbialo por tu código
```

3) Ejecuta normalmente (`npm run dev`) y usa ese código en la pantalla de autenticación.

4) Cuando quieras “abrirlo” al público, cambia en `.env`:

```
VITE_PUBLIC_MODE=true
```

Esto saltará la autenticación y permitirá el acceso directo.

> Nota importante: Este control es del lado del cliente (frontend). Para seguridad real en producción, usa verificación en un servidor (backend) o un proveedor de autenticación.
