import { urlImagen } from "@/api/client";

// Imagen guardada en el API. Si el archivo no existe se muestra
// "image-not-found.jpg" una sola vez (evita reintentar en bucle).
export function ImagenApi({ archivo, alt, className }) {
  function manejarError(e) {
    if (e.currentTarget.dataset.respaldo) return;
    e.currentTarget.dataset.respaldo = "1";
    e.currentTarget.src = urlImagen(null);
  }

  return <img src={urlImagen(archivo)} alt={alt} className={className} onError={manejarError} />;
}
