# BANKAPITAL — Demo

Sistema de factoring BANKAPITAL. Demo funcional construida con Next.js, TypeScript y Tailwind CSS.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Build de producción

```bash
npm run build
npm run start
```

## Estructura del proyecto

```
src/
├── app/
│   ├── (dashboard)/          # Layout con sidebar + header
│   │   ├── layout.tsx
│   │   ├── clientes/
│   │   ├── factura/
│   │   ├── validacion/
│   │   ├── operacion/
│   │   ├── desembolso/
│   │   ├── pago-recibido/
│   │   └── informes/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Redirige a /clientes
├── components/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── ModulePlaceholder.tsx
```

## Módulos

| # | Ruta | Descripción |
|---|------|-------------|
| 1 | `/clientes` | Gestión de clientes |
| 2 | `/factura` | Carga de facturas |
| 3 | `/validacion` | Validación de documentos |
| 4 | `/operacion` | Operaciones activas |
| 5 | `/desembolso` | Control de desembolsos |
| 6 | `/pago-recibido` | Pagos recibidos |
| 7 | `/informes` | Reportes y análisis |

## Colores corporativos

- Azul principal: `#0b4f63`
- Amarillo principal: `#f4b400`
