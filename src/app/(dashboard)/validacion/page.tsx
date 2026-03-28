import ModulePlaceholder from "@/components/ModulePlaceholder";

export default function ValidacionPage() {
  return (
    <ModulePlaceholder
      title="Validación"
      description="Validación y verificación de facturas y clientes."
      badge="Módulo 3"
      stats={[
        { label: "En validación", value: "—" },
        { label: "Validadas hoy", value: "—" },
        { label: "Observadas", value: "—" },
        { label: "Tiempo promedio", value: "—" },
      ]}
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
    />
  );
}
