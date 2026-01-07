// mock-backend.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Configurar CORS para los dos dominios y entorno local
const allowedOrigins = [
  'https://qpandatecnovador.com',
  'https://vibexlegend.com',
  'http://localhost:5173', // Vite default
  'http://localhost:5174'  // Vite alternative when 5173 is in use
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permitir requests sin origin (postman, curl)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS no permitido para este origen: ' + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Endpoint de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mock backend funcionando correctamente' });
});

// Otros endpoints que quieras simular
app.get('/user', (req, res) => {
  res.json({ id: 1, name: 'Usuario de prueba', role: 'admin' });
});

app.listen(PORT, () => {
  console.log(`Mock backend corriendo en http://localhost:${PORT}`);
});
