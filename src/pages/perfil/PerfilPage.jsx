// Página vacía (Avance 1): muestra solo su título.
export default function PerfilPage() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Mi perfil</h1>
      <p className="text-muted-foreground">Aquí se mostrará la información del usuario autenticado.</p>
    </section>
  );
}
