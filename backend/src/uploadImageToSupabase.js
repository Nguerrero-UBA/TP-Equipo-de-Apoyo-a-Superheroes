const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const uploadImageToSupabase = async (file) => {
  const { originalname, buffer, mimetype } = file;

  // Generar un nombre único para la imagen
  const fileName = Date.now() + path.extname(originalname);

  console.log('Filename: ', fileName);

  // Subir el archivo a Supabase Storage
  const { data, error } = await supabase.storage
    .from('Imagenes_vill_hero')
    .upload(fileName, buffer, {
      contentType: mimetype,
      upsert: false,
    });
    console.log('Upload response:', data);
  if (error) {
    throw new Error(`Error al subir la imagen: ${error.message}`);
  }

  // Obtener la URL pública del archivo cargado
  const publicUrl = supabase.storage
    .from('Imagenes_vill_hero')
    .getPublicUrl(data.path).publicURL;

  console.log('PublicUrl: ',publicUrl)
  return publicUrl;
};

module.exports = uploadImageToSupabase;