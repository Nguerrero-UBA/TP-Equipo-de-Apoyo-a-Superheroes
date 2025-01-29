# TP-Equipo-de-Apoyo-a-Superheroes
Integrantes: Salvador Tartaglia - Matteo Babasso - Jorge Arratia - Nicolas Guerrero

## Breve descripcion
Nuestra pagina web es una herramienta con el objetivo de ayudar a los heroes del mundo a estar informado de los crimenes ocurriendo en el mundo, con la ayuda de los usuarios estos heroes van a ser avisados de donde son necesitados. Con la ayuda de 2 tipos de usuarios de la pagina, los civiles y los operadores. Los operadores son quienes tienen completo acceso a la web, siendo capaces de completar un formulario para agregar crimenes y criminales a la base de datos. Mientras que los civiles solo pueden completar un formulario para agregar un crimen. Todos los usuarios pueden ver que criminales ya fueron capturados y que crimenes estan en progreso en el momento.

Para la base de datos necesitamos las siguientes tablas:
- Localidad: loc_id, nombre, poblacion, estado, pais,nivel_de_inseguridad
- Heroes:id, Nombre, nivel_de_poder, localidad(loc_id), ocupado, hero_img
- Criminales:vill_id, nombre, nivel_de_poder, cantidad, localidad(loc_id), capturado, villano_img
- Crimenes:crimen_id, victima, criminal(vill_id), crimen, localidad(loc_id), en_curso

Para el frontend necesitamos 3 paginas como minimo:
- Ingreso de informacion(formulario) para crimenes y criminales
- Crimenes en progreso
- Criminales capturados

## Instrucciones para iniciar la base de datos
