import ModulePlaceholder from "@/components/ModulePlaceholder";

export default function InformesPage() {
  return (
    <ModulePlaceholder
      title="Informes"
      description="Reportes y análisis del portafolio de factoring."
      badge="Módulo 7"
      stats={[
        { label: "Reportes disponibles", value: "—" },
        { label: "Última generación", value: "—" },
        { label: "Exportaciones", value: "—" },
        { label: "Alertas", value: "—" },
      ]}
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      }
    />
  );
}
