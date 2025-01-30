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
Para iniciar la base de datos por primera vez, seguir estos pasos:

- usando como guia el .env_example crear un .env adentro de la carpeta /backend
- La informacion para rellenar la url de `DATABASE_URL` esta adentro del docker-compose
- Una vez que se creo el .env con la informacion correcta, ejecutar el docker compose con el comando `docker compose up -d --build`(puede ser que no tenga suficientes permisos, si ese es el caso usar sudo)
- El Dockerfile del backend tiene la linea `CMD ["npm", "run", "dev"]` que ejecuta el comando de node para empezar el servidor, al cual deberias poder acceder entrando a localhost:3000

Para ver si los contenedores se construlleron correctamente usar `docker ps`

Para cerrar el servidor y los contenedores de docker usar el comando `docker compose down`
