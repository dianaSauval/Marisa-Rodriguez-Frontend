// services/subirImagen.js
export const subirImagenACloudinary = async (archivo) => {
    const data = new FormData();
    data.append("file", archivo);
    data.append("upload_preset", "marisa_upload"); // reemplazá con el tuyo ("tu_upload_preset")
    data.append("folder", "Marisa Rodriguez"); // opcional: organizá las imágenes en una carpeta
  
    const res = await fetch("https://api.cloudinary.com/v1_1/dkdhdy9e5/image/upload", {
      method: "POST",
      body: data,
    });
  
    if (!res.ok) {
      throw new Error("No se pudo subir la imagen");
    }
  
    const json = await res.json();
    return {
      url: json.secure_url,
      public_id: json.public_id,
    };

  };
  