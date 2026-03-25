# News Explorer — Frontend
 
Aplicación web para buscar y guardar noticias de todo el mundo. Construida con React y Vite, conectada a una API REST propia.
 
---
 
## 🌐 Demo
 
> _Añade aquí el enlace una vez desplegado_
> Ejemplo: `https://news-explorer.tudominio.com`
 
---
 
## 🚀 Tecnologías
 
- **React 18** — biblioteca de UI
- **React Router v6** — navegación entre páginas
- **Vite** — bundler y servidor de desarrollo
- **Context API** — gestión de estado global del usuario
- **localStorage** — persistencia del token JWT y resultados de búsqueda
- **NewsAPI** — fuente de datos de noticias
 
---
 
## ✨ Funcionalidades
 
- Búsqueda de noticias en tiempo real por palabra clave
- Registro e inicio de sesión de usuarios
- Validación instantánea de formularios
- Guardar artículos favoritos (requiere inicio de sesión)
- Página de artículos guardados con palabras clave ordenadas por popularidad
- Rutas protegidas — `/saved-news` solo accesible para usuarios autenticados
- Persistencia de búsqueda entre sesiones
 
---
 
## 📁 Estructura del proyecto
 
```
vite-project/
├── src/
│   ├── components/
│   │   ├── App/
│   │   │   ├── App.jsx             # Componente raíz con rutas y estado global
│   │   │   └── Main/               # Página principal con buscador
│   │   ├── Header/
│   │   │   ├── Header.jsx          # Encabezado con navegación
│   │   │   └── Navigation/         # Menú con login/logout
│   │   ├── LoginPopup/             # Modal de inicio de sesión
│   │   ├── RegisterPopup/          # Modal de registro
│   │   ├── InfoPopup/              # Modal de confirmación de registro
│   │   ├── PopupWithForm/          # Componente base para modales
│   │   ├── NewsCard/               # Tarjeta de artículo individual
│   │   ├── NewsCardList/           # Lista de tarjetas con paginación
│   │   ├── SavedNews/              # Página de artículos guardados
│   │   ├── SavedNewsHeader/        # Encabezado de artículos guardados
│   │   ├── SearchForm/             # Formulario de búsqueda
│   │   ├── Preloader/              # Indicador de carga
│   │   ├── NoResults/              # Mensaje de sin resultados
│   │   ├── About/                  # Sección "Sobre el autor"
│   │   ├── Footer/                 # Pie de página
│   │   └── ProtectedRoute/         # HOC para rutas protegidas
│   ├── contexts/
│   │   └── CurrentUserContext.js   # Contexto global del usuario
│   ├── hooks/
│   │   └── useFormValidation.js    # Hook de validación de formularios
│   └── utils/
│       ├── MainApi.js              # Llamadas a la API propia (backend)
│       └── NewsApi.js              # Llamadas a NewsAPI
├── public/
├── .env.example
├── package.json
└── vite.config.js
```
 
---
 
## ⚙️ Instalación y ejecución local
 
### Prerrequisitos
 
- Node.js v18 o superior
- El backend de News Explorer corriendo en `http://localhost:3001`
 
### 1. Clonar el repositorio
 
```bash
git clone https://github.com/Alfredosullivan/project-name-frontend.git
cd project-name-frontend/vite-project
```
 
### 2. Instalar dependencias
 
```bash
npm install
```
 
### 3. Configurar variables de entorno
 
Crea un archivo `.env` en la carpeta `vite-project/`:
 
```
VITE_NEWS_API_KEY=tu-api-key-de-newsapi
VITE_API_URL=http://localhost:3001
```
 
Para obtener una API key gratuita de NewsAPI: [newsapi.org](https://newsapi.org)
 
### 4. Arrancar en modo desarrollo
 
```bash
npm run dev
```
 
La aplicación estará disponible en `http://localhost:5173`
 
### 5. Build para producción
 
```bash
npm run build
```
 
---
 
## 🔗 Backend
 
Este frontend se conecta al backend de News Explorer. Repositorio:
👉 [project-name-backend](https://github.com/Alfredosullivan/project-name-backend)
 
---
 
## 📋 Variables de entorno
 
| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `VITE_NEWS_API_KEY` | API key de NewsAPI.org | ✅ |
| `VITE_API_URL` | URL base del backend | ✅ |
 
---
 
## 🗂️ Ramas
 
| Rama | Descripción |
|------|-------------|
| `main` | Código estable en producción |
| `stage-react-auth` | Integración con autenticación y b