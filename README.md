# AulaMendoza - Plataforma Educativa Inteligente para Nivel Inicial y Primario

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/status-in%20development-blue)]()
[![Python](https://img.shields.io/badge/python-3.11+-green.svg)]()
[![React](https://img.shields.io/badge/react-18+-blue.svg)]()
[![TypeScript](https://img.shields.io/badge/typescript-5+-blue.svg)]()

## 📖 Descripción

**AulaMendoza** es una plataforma educativa open source diseñada específicamente para escuelas de nivel inicial y primario de Mendoza, Argentina. La plataforma está completamente alineada al **Diseño Curricular Provincial (DCP)** y funciona como un ecosistema educativo integral.

### ✨ Características Principales

- 🎯 **100% Open Source** - Código abierto y libre para toda la comunidad
- 📴 **Offline First** - Funciona sin conexión a internet
- 🔄 **Sincronización Automática** - Sync inteligente cuando hay conectividad
- 🤖 **IA Integrada** - Asistentes inteligentes para docentes y estudiantes
- 📚 **Adaptable al DCP** - Diseñado según el currículo mendocino
- 📱 **Multiplataforma** - Web, móvil y desktop
- 🔌 **Arquitectura Modular** - Fácil de extender y personalizar
- ♿ **Accesible e Inclusiva** - Diseño universal para todos los estudiantes
- ⚡ **Escalable** - Desde pequeñas escuelas hasta grandes distritos

## 🏗️ Arquitectura

### Frontend (Cliente Web)
```
├── React 18+
├── TypeScript
├── Vite (Build tool)
├── TailwindCSS
├── PWA (Progressive Web App)
└── IndexedDB (Almacenamiento local)
```

### Backend (API)
```
├── Python 3.11+
├── FastAPI
├── JWT (Autenticación)
├── PostgreSQL (Base de datos principal)
├── Redis (Cache y colas)
├── MinIO (Almacenamiento de archivos)
└── IA Services (Procesamiento inteligente)
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (opcional)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Docker (Recomendado)

```bash
docker-compose up -d
```

## 📁 Estructura del Proyecto

```
aulamendoza/
├── frontend/                 # Aplicación React/TypeScript
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # Servicios API y sync
│   │   ├── store/           # Estado global
│   │   ├── utils/           # Utilidades
│   │   └── types/           # Tipos TypeScript
│   ├── public/              # Assets estáticos
│   └── package.json
├── backend/                  # API Python/FastAPI
│   ├── app/
│   │   ├── api/             # Endpoints REST
│   │   ├── core/            # Configuración y seguridad
│   │   ├── models/          # Modelos SQLAlchemy
│   │   ├── schemas/         # Esquemas Pydantic
│   │   ├── services/        # Lógica de negocio
│   │   └── utils/           # Utilidades
│   ├── tests/               # Tests unitarios
│   └── requirements.txt
├── docs/                     # Documentación
├── infrastructure/           # Docker, K8s, deploy
└── README.md
```

## 🎯 Módulos Principales

### 1. Gestión Curricular
- Planificación de clases alineada al DCP
- Secuencias didácticas
- Objetivos de aprendizaje
- Contenidos por área y grado

### 2. Seguimiento de Estudiantes
- Registro de asistencia
- Evaluaciones formativas
- Portafolio digital
- Reportes automáticos

### 3. Recursos Educativos
- Biblioteca digital
- Actividades interactivas
- Generador de ejercicios con IA
- Repositorio colaborativo

### 4. Comunicación
- Mensajería escuela-familia
- Notificaciones
- Calendario escolar
- Reuniones virtuales

### 5. Analytics & IA
- Dashboard de progreso
- Detección temprana de dificultades
- Recomendaciones personalizadas
- Análisis predictivo

## 🔐 Seguridad y Privacidad

- Autenticación JWT con refresh tokens
- Roles y permisos granulares
- Encriptación de datos sensibles
- Cumplimiento de leyes de protección de datos
- Auditoría de accesos

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](docs/CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

### Formas de contribuir:
- 🐛 Reportar bugs
- 💡 Sugerir características
- 📝 Mejorar documentación
- 👨‍💻 Enviar código
- 🌍 Traducir a otros idiomas

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- Website: [En construcción]
- Email: contacto@aulamendoza.edu.ar
- Comunidad: [Slack/Discord]

## 🙏 Agradecimientos

- Ministerio de Educación de Mendoza
- Comunidad educativa mendocina
- Todos los contribuyentes open source

---

**Hecho con ❤️ para la educación de Mendoza**
