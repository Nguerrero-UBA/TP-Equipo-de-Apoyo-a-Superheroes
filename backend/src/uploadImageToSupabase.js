import { supabase } from './config/supabaseClient';
import path from 'path';

const uploadImageToSupabase = async (file) => {
  const { originalname, buffer, mimetype } = file;

  // Generar un nombre único para la imagen
  const fileName = Date.now() + path.extname(originalname);

  // Subir el archivo a Supabase Storage
  const { data, error } = await supabase.storage
    .from('Imagenes_vill_hero')
    .upload(fileName, buffer, {
      contentType: mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Error al subir la imagen: ${error.message}`);
  }

  // Obtener la URL pública del archivo cargado
  const publicUrl = supabase.storage
    .from('images')
    .getPublicUrl(fileName).publicURL;

  return publicUrl;
};

export default uploadImageToSupabase;