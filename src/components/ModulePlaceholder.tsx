interface ModulePlaceholderProps {
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  stats?: { label: string; value: string }[];
}

export default function ModulePlaceholder({
  title,
  description,
  badge,
  icon,
  stats,
}: ModulePlaceholderProps) {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#0b4f63" }}>
            {title}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
        {badge && (
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full mt-1"
            style={{ backgroundColor: "#0b4f63", color: "#fff" }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Stats row */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                {s.label}
              </p>
              <p className="text-2xl font-bold" style={{ color: "#0b4f63" }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Main placeholder card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center text-center gap-4">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-2xl"
          style={{ backgroundColor: "#f4b400" }}
        >
          <span style={{ color: "#0b4f63" }}>{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Módulo en construcción
          </h3>
          <p className="text-sm text-gray-400 mt-1 max-w-sm">
            Este módulo estará disponible próximamente. La estructura y navegación ya están listas.
          </p>
        </div>
        <div
          className="inline-block mt-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: "#0b4f63", color: "#fff" }}
        >
          Próximamente
        </div>
      </div>
    </div>
  );
}
