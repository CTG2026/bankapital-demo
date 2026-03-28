"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Cliente {
  id: string;
  nombre: string;
  rut: string;
  correo: string;
  telefono: string;
  banco: string;
  tipo_cuenta: string;
  numero_cuenta: string;
  created_at: string;
}

const EMPTY_FORM = {
  nombre: "",
  rut: "",
  correo: "",
  telefono: "",
  banco: "",
  tipo_cuenta: "",
  numero_cuenta: "",
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  async function cargarClientes() {
    setFetching(true);
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[BANKAPITAL] Error al cargar clientes:", error);
      setMensaje({ tipo: "error", texto: "Error al cargar clientes: " + error.message });
    } else {
      setClientes(data ?? []);
    }
    setFetching(false);
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    const { error } = await supabase.from("clientes").insert([form]);

    if (error) {
      console.error("[BANKAPITAL] Error al insertar cliente:", error);
      setMensaje({ tipo: "error", texto: "Error al guardar: " + error.message });
    } else {
      setMensaje({ tipo: "ok", texto: "Cliente guardado correctamente." });
      setForm(EMPTY_FORM);
      setMostrarFormulario(false);
      await cargarClientes();
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#0b4f63" }}>Clientes</h2>
          <p className="text-gray-500 text-sm mt-1">
            Gestión y registro de clientes del sistema de factoring.
          </p>
        </div>
        <button
          onClick={() => { setMostrarFormulario((v) => !v); setMensaje(null); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          style={{ backgroundColor: "#f4b400", color: "#0b4f63" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={mostrarFormulario ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
          </svg>
          {mostrarFormulario ? "Cancelar" : "Nuevo cliente"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total clientes", value: fetching ? "..." : clientes.length.toString() },
          { label: "Registrados hoy", value: fetching ? "..." : clientes.filter((c) => c.created_at?.startsWith(new Date().toISOString().slice(0, 10))).length.toString() },
          { label: "Módulo", value: "1 — Clientes" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: "#0b4f63" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Mensaje de estado */}
      {mensaje && (
        <div
          className={`px-4 py-3 rounded-lg text-sm font-medium border ${
            mensaje.tipo === "ok"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {mensaje.tipo === "ok" ? "✓ " : "✕ "}{mensaje.texto}
        </div>
      )}

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-semibold mb-5" style={{ color: "#0b4f63" }}>
            Nuevo cliente
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Nombre */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Nombre
              </label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Razón social o nombre completo"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "#0b4f63" } as React.CSSProperties}
              />
            </div>

            {/* RUT */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">RUT</label>
              <input
                name="rut"
                value={form.rut}
                onChange={handleChange}
                required
                placeholder="12.345.678-9"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>

            {/* Correo */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Correo</label>
              <input
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                placeholder="correo@empresa.cl"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Teléfono</label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>

            {/* Banco */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Banco</label>
              <select
                name="banco"
                value={form.banco}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white"
              >
                <option value="">Seleccionar banco</option>
                {["Banco de Chile", "Banco Estado", "BCI", "Santander", "Itaú", "Scotiabank", "BICE", "Security", "Falabella", "Ripley", "Otro"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Tipo de cuenta */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipo de cuenta</label>
              <select
                name="tipo_cuenta"
                value={form.tipo_cuenta}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white"
              >
                <option value="">Seleccionar tipo</option>
                {["Cuenta corriente", "Cuenta vista", "Cuenta de ahorro", "Chequera electrónica"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Número de cuenta */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Número de cuenta
              </label>
              <input
                name="numero_cuenta"
                value={form.numero_cuenta}
                onChange={handleChange}
                placeholder="000-00000-00"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>

            {/* Botón */}
            <div className="sm:col-span-2 flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60 transition-opacity"
                style={{ backgroundColor: "#0b4f63", color: "#fff" }}
              >
                {loading ? "Guardando..." : "Guardar cliente"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de clientes */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold" style={{ color: "#0b4f63" }}>
            Listado de clientes
          </h3>
          <button
            onClick={cargarClientes}
            disabled={fetching}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors disabled:opacity-50"
          >
            <svg className={`w-3.5 h-3.5 ${fetching ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refrescar
          </button>
        </div>

        {fetching ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
            Cargando clientes...
          </div>
        ) : clientes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2 text-gray-400">
            <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm">No hay clientes registrados aún.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Nombre", "RUT", "Correo", "Teléfono", "Banco", "Tipo cuenta", "N° cuenta", "Fecha"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {clientes.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{c.nombre}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.rut}</td>
                    <td className="px-4 py-3 text-gray-600">{c.correo || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.telefono || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.banco || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.tipo_cuenta || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.numero_cuenta || "—"}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                      {c.created_at ? new Date(c.created_at).toLocaleDateString("es-CL") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
