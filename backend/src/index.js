const express = require('express');
const cors = require('cors');
const { PrismaClient } = require("@prisma/client");
const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
const multer = require('multer');
const upload = require('./multerConfig');
const uploadImageToSupabase = require('./uploadImageToSupabase');
app.use(express.json());
app.use(cors());
const path = require('path');
// const { connect } = require('http2');
app.use(express.static(path.join(__dirname,'../../frontend/public')));

app.use(express.static(path.join(__dirname, '../../frontend')));
app.options('*', cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/Inicio.html'))
  })

 app.get("/EAS/localidades", async (req, res) => {
   try {
     const localidades = await prisma.localidad.findMany();
     res.json(localidades);
   } catch (error) {
     res.status(500).json({ error: "Error al obtener localidades" });
   }
 });

 app.get("/EAS/localidades/:id", async (req, res) => {
   const  {id}  = req.params;
   try {
     const localidad = await prisma.localidad.findUnique({
       where: { loc_id: parseInt(id) },
     });
 
     if (!localidad) return res.status(404).json({ error: "Localidad no encontrada" });
 
     res.json(localidad);
   } catch (error) {
     res.status(500).json({ error: "Error al obtener la localidad" });
   }
 });

 app.post("/EAS/localidades", async (req, res) => {
   
   
  try {
    const nuevaLocalidad = await prisma.localidad.create({
      data: { 
        nombre:req.body.nombre,
        poblacion:req.body.poblacion,
        estado:req.body.estado,
        pais:req.body.pais,
        nivel_de_inseguridad:req.body.nivel_de_inseguridad 
      }
    });
    res.status(201).json(nuevaLocalidad);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la localidad" });
  }
 });
  
app.put("/EAS/localidades/:id", async (req, res) => {
  const  {id}  = req.params;
  try {
    const ActualizarLocalidad = await prisma.localidad.update({
      where: { loc_id: parseInt(id) },
      data: { 
        nombre:req.body.nombre,
        poblacion:req.body.poblacion,
        estado:req.body.estado,
        pais:req.body.pais,
        nivel_de_inseguridad:req.body.nivel_de_inseguridad 
      }
    });

    res.json(ActualizarLocalidad);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la localidad" });
  }
});

app.delete("/EAS/localidades/:id", async (req, res) => {
  const  {id}  = req.params;
  try {
    await prisma.localidad.delete({
      where: { loc_id: parseInt(id) },
    });
    res.json({ message: "Localidad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la localidad" });
  }
});

app.get("/EAS/heroes", async (req, res) => {
  try {
      const heroe = await prisma.hero.findMany({
        include:{localidad:true}
      });
      res.json(heroe);
  } catch (error) {
      console.error(error); 
      res.status(500).json({ error: "Error al obtener los heroes", details: error.message });
  }
});


app.post("/EAS/heroes", upload.single('hero_img'), async (req, res) => {
  try {
    let imageUrl = req.body.hero_img?.trim();


    if (!req.file && (!imageUrl || imageUrl === "")) {
      return res.status(400).json({ error: "Se debe proporcionar una imagen (archivo o URL)" });
    }
    
      const localidadExistente = await prisma.localidad.findUnique({
        where: {
          loc_id: parseInt(req.body.loc_id),
        },
      });

      if (!localidadExistente) {
        return res.status(400).json({ error: "La localidad no existe" });
      }

      if (req.file) {
        const file = {
          originalname: req.file.originalname,
          buffer: req.file.buffer,
          mimetype: req.file.mimetype,
        };
        imageUrl = await uploadImageToSupabase(file); // Obtener la URL pública de la imagen
        console.log("ImgUrl Heroe:", imageUrl);
      }

      const nuevoHeroe = await prisma.hero.create({
        data: {
          Nombre: req.body.Nombre,
          nivel_de_poder: parseInt(req.body.nivel_de_poder), // Corregido aquí
          localidad: {
            connect: {
              loc_id: parseInt(req.body.loc_id),
            },
          },
          ocupado: JSON.parse(req.body.ocupado),
          hero_img: imageUrl,
        },
      });

      res.status(201).json(nuevoHeroe);
  } catch (error) {
    console.error("Error al crear el héroe:", error); // Depuración
    res.status(500).json({ error: "Error al crear el héroe" });
  }
});

app.get("/EAS/heroes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const heroe = await prisma.hero.findUnique({
      where: { hero_id: parseInt(id) },
      include: { localidad: true }, 
    });

    if (!heroe) return res.status(404).json({ error: "Héroe no encontrado" });

    res.json(heroe);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el héroe" });
  }
});

app.put("/EAS/heroes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const localidadExistente = await prisma.localidad.findUnique({
      where: {
        loc_id: req.body.loc_id,
      },
    });

    if (!localidadExistente) {
      return res.status(400).json({ error: "La localidad no existe" });
    }
    const heroeActualizado = await prisma.hero.update({
      where: { hero_id: parseInt(id) },
      data: {
        Nombre: req.body.Nombre,
        nivel_de_poder: req.body.nivel_de_poder,
        localidad: {
          connect: {
            loc_id: req.body.loc_id,
          },
        },  
        ocupado: req.body.ocupado,
        hero_img: req.body.hero_img,
      },
    });

    res.json(heroeActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el héroe" });
  }
});

app.delete("/EAS/heroes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.hero.delete({
      where: { hero_id: parseInt(id) },
    });
    res.json({ message: "Héroe eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el héroe" });
  }
});

app.get("/EAS/crimenes", async (req, res) => {
    try {
        const crimenes = await prisma.crimen.findMany();
        res.json(crimenes);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Error al obtener los crimenes", details: error.message });
    }
});

app.get('/EAS/crimenes-encurso', async (req, res) => {
  try {
      const enCurso = req.query.en_curso === 'true';
      const crimenes = await prisma.crimen.findMany({
          where: { en_curso: enCurso },
          include: { localidad: true, criminal: true }
      });
      
      res.json(crimenes);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener los crímenes" });
  }
});

app.get("/EAS/crimenes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const crimen = await prisma.crimen.findUnique({
            where: {crimen_id: parseInt(id)}
        });

        if (!crimen) return res.status(404).json({error: "Crimen no encontrado"});

        res.json(crimen);
    } catch (error) {
        res.status(500).json({error: "Error al obtener el crimen"});
    }
});

app.post("/EAS/crimenes", async (req, res) => {
    try {
      const { victima, crimen, loc_id, vill_id, en_curso } = req.body;
      const localidadExistente = await prisma.localidad.findUnique({
        where: {
          loc_id: loc_id,
        },
      });
  
      if (!localidadExistente) {
        return res.status(400).json({ error: "La localidad no existe" });
      }
      const criminalExistente = await prisma.criminal.findUnique({
        where: {
          vill_id: vill_id,
        },
      });
  
      if (!criminalExistente) {
        return res.status(400).json({ error: "El criminal no existe" });
      }
        const nuevoCrimen = await prisma.crimen.create({
            data: {
                victima,
                crimen,
                localidad: {
                  connect: {
                    loc_id: loc_id,
                  },
                },
                criminal:{
                  connect:{
                    vill_id: vill_id
                  }
                },
                en_curso: true
            },
        });
        res.status(201).json(nuevoCrimen);
    } catch (error) {
        res.status(500).json({error: "Error al crear el crimen"});
    }
});

app.put("/EAS/crimenes/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const localidadExistente = await prisma.localidad.findUnique({
        where: {
          loc_id: req.body.loc_id,
        },
      });
  
      if (!localidadExistente) {
        return res.status(400).json({ error: "La localidad no existe" });
      }
        const crimenActualizado = await prisma.crimen.update({
            where: {crimen_id: parseInt(id)},
            data: {
                victima: req.body.victima,
                crimen: req.body.crimen,
                localidad: {
                  connect: {
                    loc_id: req.body.loc_id,
                  },
                },
                vill_id: req.body.vill_id,
                en_curso: req.body.en_curso
            },
        });
        res.json(crimenActualizado);
    } catch (error) {
        res.status(500).json({error: "Error al actualizar el crimen"});
    }
});

app.delete("/EAS/crimenes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.crimen.delete({
            where: {crimen_id: parseInt(id)},
        });
        res.json({message: "Crimen eliminado correctamente"});
    } catch (error) {
        res.status(500).json({error: "Error al eliminar el crimen"});
    }
});

app.get('/EAS/v1/Lista_Criminales', async (req, res) => {
  const Lista_criminales = await prisma.criminal.findMany();
  res.json(Lista_criminales);
})

app.get('/EAS/v1/Lista_Criminales/:id', async (req, res) => {
   const { id }=req.params
   vill_id=parseInt(id,10)
  const Lista_criminales = await prisma.criminal.findUnique({
    where: {
      vill_id: vill_id
    }
  });

  if (Lista_criminales === null){
    res.sendStatus(404);
    return;
  }

  res.json(Lista_criminales);  
})

app.post('/EAS/v1/Lista_Criminales', upload.single('villano_img'),async (req, res) => {
  try {
    
    let imageUrl = req.body.villano_img?.trim();

    if (!req.file && (!imageUrl || imageUrl === "")) {
      return res.status(400).json({ error: "Se debe proporcionar una imagen" });
    }

    const localidadExistente = await prisma.localidad.findUnique({
      where: {
        loc_id: parseInt(req.body.loc_id),
      },
    });

    if (!localidadExistente) {
      return res.status(400).json({ error: "La localidad no existe" });
    }

    if (req.file) {
      const file = {
        originalname: req.file.originalname,
        buffer: req.file.buffer,
        mimetype: req.file.mimetype,
      };
      imageUrl = await uploadImageToSupabase(file); // Obtener la URL pública de la imagen
      console.log('ImgUrl Villano: ',imageUrl)
    }
    

    const Criminal = await prisma.criminal.create({
      data: {
        nombre: req.body.nombre,
        nivel_de_poder: parseInt(req.body.nivel_de_poder),
        numero_de_miembros: parseInt(req.body.numero_de_miembros),
        capturado: JSON.parse(req.body.capturado),
        villano_img: imageUrl,
        localidad: {
          connect: {
            loc_id: parseInt(req.body.loc_id),
          },
        },
      },
    });

    res.status(201).send(Criminal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el criminal", details: error.message });
  }
});


app.delete('/EAS/v1/Lista_Criminales/:id', async (req, res) => {
  const criminal_eliminar = await prisma.criminal.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (criminal_eliminar === null){
    res.sendStatus(404);
    return;
  }

  await prisma.criminal.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.send(criminal_eliminar);
})


app.put('/EAS/v1/Lista_Criminales/:id', async (req, res) => {
  const { id } = req.params;

  try {
    
    const criminalExistente = await prisma.criminal.findUnique({
      where: {
        vill_id: parseInt(id, 10),
      },
    });

    if (!criminalExistente) {
      return res.status(404).json({ error: "Criminal no encontrado" });
    }

    
    const localidadExistente = await prisma.localidad.findUnique({
      where: {
        loc_id: req.body.loc_id,
      },
    });

    if (!localidadExistente) {
      return res.status(400).json({ error: "La localidad no existe" });
    }

    
    const criminalActualizado = await prisma.criminal.update({
      where: {
        vill_id: parseInt(id, 10), 
      },
      data: {
        nombre: req.body.nombre,
        nivel_de_poder: req.body.nivel_de_poder,
        numero_de_miembros: req.body.numero_de_miembros,
        capturado: req.body.capturado,
        villano_img: req.body.villano_img,
        localidad: {
          connect: {
            loc_id: req.body.loc_id,
          },
        },
      },
    });

   
    res.status(200).json(criminalActualizado);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error al actualizar el criminal", details: error.message });
  }
});


app.get('/EAS/v1/Lista_criminales/capturados/:estado', async (req, res) => {
  try {
    const { estado } = req.params;

    
    const capturado = estado === "true"; 

    
    const criminales = await prisma.criminal.findMany({
      where: {
        capturado: capturado,
        
      },
      include:{
        localidad:true
      }
    });

    
    res.status(200).json(criminales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la lista de criminales" });
  }
});



app.post('/EAS/asignar-hero', async (req, res) => {
  const { crimen_id, hero_id,vill_id} = req.body;

  try {
      await prisma.crimen.update({
          where: { crimen_id },
          data: { en_curso: false } 
      });

      await prisma.hero.update({
          where: { id: hero_id },
          data: { ocupado: true }
      });
      await prisma.criminal.update({
        where: { vill_id },
        data: { capturado: true }
    });

      res.json({ message: 'Héroe asignado correctamente' });
  } catch (error) {
      console.error('Error al asignar héroe:', error);
      res.status(500).json({ error: 'No se pudo asignar el héroe' });
  }
});



app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
}); 

