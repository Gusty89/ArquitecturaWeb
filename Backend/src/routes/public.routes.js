import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";  // Convierte la URL de ESM a ruta de archivo

const router = Router();

// Convierte la URL actual a __filename
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio de __filename
const __dirname = path.dirname(__filename);

// Crea una ruta absoluta a tu carpeta 'pruebasFront'
const publicPath = path.join(__dirname, '../pruebasFront');

// Define las rutas para los archivos HTML
router.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

router.get('/profile', (req, res) => {
    res.sendFile(path.join(publicPath, 'profile.html'));
});

export default router;
