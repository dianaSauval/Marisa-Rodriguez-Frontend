// services/uploadService.js
export const subirImagenACloudinary = async (archivo) => {
    const url = 'https://api.cloudinary.com/v1_1/tu_usuario/image/upload'; // Cambia tu_usuario
  
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', 'tu_upload_preset'); // Cambia esto también
  
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Error al subir imagen");
  
    return data.secure_url; // esta es la URL que vas a guardar
  };
  