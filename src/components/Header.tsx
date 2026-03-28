"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/clientes": "Clientes",
  "/factura": "Factura",
  "/validacion": "Validación",
  "/operacion": "Operación",
  "/desembolso": "Desembolso",
  "/pago-recibido": "Pago recibido",
  "/informes": "Informes",
};

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "BANKAPITAL";

  return (
    <header
      className="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold" style={{ color: "#0b4f63" }}>
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Badge de entorno */}
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "#f4b400", color: "#0b4f63" }}
        >
          DEMO
        </span>

        {/* Avatar de usuario */}
        <div
          className="flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: "#0b4f63" }}
          title="Usuario demo"
        >
          AD
        </div>
      </div>
    </header>
  );
}
