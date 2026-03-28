import ModulePlaceholder from "@/components/ModulePlaceholder";

export default function PagoRecibidoPage() {
  return (
    <ModulePlaceholder
      title="Pago recibido"
      description="Registro y conciliación de pagos recibidos de deudores."
      badge="Módulo 6"
      stats={[
        { label: "Pagos hoy", value: "—" },
        { label: "Monto recibido", value: "—" },
        { label: "Pendientes cobro", value: "—" },
        { label: "Este mes", value: "—" },
      ]}
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      }
    />
  );
}
