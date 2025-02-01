const express = require('express');
const { PrismaClient } = require("@prisma/client");
const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Equipo de Apoyo de Superheroes')
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
   const  id  = req.params;
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
  const  id  = req.params;
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

app.delete("/api/localidades/:id", async (req, res) => {
  const  id  = req.params;
  try {
    await prisma.localidad.delete({
      where: { loc_id: parseInt(id) },
    });
    res.json({ message: "Localidad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la localidad" });
  }
});

app.listen(PORT, ()=> {
    
    console.log("Server listening on PORT", PORT);
}); 
