export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Vista general del rendimiento y actividad escolar
        </p>
      </div>

      {/* Placeholder content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Estadísticas Generales</h2>
          <p className="text-gray-600">Contenido en desarrollo...</p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
          <p className="text-gray-600">Contenido en desarrollo...</p>
        </div>
      </div>
    </div>
  )
}
