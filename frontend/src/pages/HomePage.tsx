import { Link } from 'react-router-dom'
import { BookOpen, Users, TrendingUp, Award, Calendar, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      name: 'Gestión Curricular',
      description: 'Planificaciones alineadas al Diseño Curricular Provincial de Mendoza',
      icon: BookOpen,
      href: '/lesson-plans'
    },
    {
      name: 'Seguimiento de Estudiantes',
      description: 'Registro de asistencia, evaluaciones y portafolio digital',
      icon: Users,
      href: '/students'
    },
    {
      name: 'Analytics & IA',
      description: 'Dashboard de progreso y recomendaciones personalizadas',
      icon: TrendingUp,
      href: '/dashboard'
    },
    {
      name: 'Recursos Educativos',
      description: 'Biblioteca digital y generador de ejercicios con IA',
      icon: Award,
      href: '/resources'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">
          ¡Bienvenido a AulaMendoza!
        </h1>
        <p className="text-lg text-primary-100 max-w-2xl mb-6">
          Plataforma educativa inteligente para nivel inicial y primario, 
          diseñada específicamente para las escuelas de Mendoza.
        </p>
        <div className="flex gap-4">
          <Link 
            to="/dashboard" 
            className="btn-primary bg-white text-primary-600 hover:bg-primary-50"
          >
            Ir al Dashboard
          </Link>
          <Link 
            to="/lesson-plans" 
            className="btn-secondary bg-primary-500 text-white hover:bg-primary-400"
          >
            Nueva Planificación
          </Link>
        </div>
      </div>

      {/* Features grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Características principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.href}
              className="card p-6 hover:shadow-md transition-shadow group"
            >
              <feature.icon className="h-12 w-12 text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-primary-600 text-sm font-medium">
                Explorar
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Estudiantes</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">--</p>
          <p className="text-sm text-gray-500 mt-1">Total registrados</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Planificaciones</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">--</p>
          <p className="text-sm text-gray-500 mt-1">Este ciclo lectivo</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Asistencia hoy</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">--%</p>
          <p className="text-sm text-gray-500 mt-1">Presentismo</p>
        </div>
      </div>

      {/* Offline-first info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900">
              Funciona sin conexión
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              AulaMendoza está diseñado para funcionar incluso sin internet. 
              Los cambios se guardan localmente y se sincronizan automáticamente 
              cuando recuperes la conexión.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
