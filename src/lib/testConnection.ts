import { supabase } from "./supabaseClient";

export async function testClientesQuery() {
  const { data, error } = await supabase.from("clientes").select("*");

  if (error) {
    console.error("[BANKAPITAL] Error al consultar tabla clientes:", error.message);
    return;
  }

  console.log(`[BANKAPITAL] Registros encontrados en 'clientes': ${data.length}`);
  console.table(data);
}
