const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const localidad1 = await prisma.localidad.create({
    data: {
      nombre: 'Ciudad Central',
      poblacion: 500000,
      estado: 'Estado A',
      pais: 'País X',
      nivel_de_inseguridad: 7,
    },
  });

  const localidad2 = await prisma.localidad.create({
    data: {
      nombre: 'Villa Oscura',
      poblacion: 120000,
      estado: 'Estado B',
      pais: 'País Y',
      nivel_de_inseguridad: 9,
    },
  });

  const localidad3 = await prisma.localidad.create({
    data: {
      nombre: 'Pueblo Seguro',
      poblacion: 30000,
      estado: 'Estado C',
      pais: 'País Z',
      nivel_de_inseguridad: 3,
    },
  });

  const localidad4 = await prisma.localidad.create({
    data: {
      nombre: 'Valle Sombrío',
      poblacion: 350000,
      estado: 'Estado D',
      pais: 'País X',
      nivel_de_inseguridad: 8,
    },
  });

  const localidad5 = await prisma.localidad.create({
    data: {
      nombre: 'Puerto Estrella',
      poblacion: 200000,
      estado: 'Estado E',
      pais: 'País Y',
      nivel_de_inseguridad: 4,
    },
  });

  const localidad6 = await prisma.localidad.create({
    data: {
      nombre: 'Ciudad Aurora',
      poblacion: 900000,
      estado: 'Estado F',
      pais: 'País Z',
      nivel_de_inseguridad: 6,
    },
  });

  const hero1 = await prisma.hero.create({
    data: {
      Nombre: 'SuperMan',
      nivel_de_poder: 100,
      loc_id: localidad1.loc_id,
      ocupado: false,
      hero_img: 'https://example.com/superman.jpg',
    },
  });

  const hero2 = await prisma.hero.create({
    data: {
      Nombre: 'Batman',
      nivel_de_poder: 90,
      loc_id: localidad2.loc_id,
      ocupado: true,
      hero_img: 'https://example.com/batman.jpg',
    },
  });

  const hero3 = await prisma.hero.create({
    data: {
      Nombre: 'Wonder Woman',
      nivel_de_poder: 85,
      loc_id: localidad3.loc_id,
      ocupado: false,
      hero_img: 'https://example.com/wonderwoman.jpg',
    },
  });

  const hero4 = await prisma.hero.create({
    data: {
      Nombre: 'Flash',
      nivel_de_poder: 95,
      loc_id: localidad4.loc_id,
      ocupado: true,
      hero_img: 'https://example.com/flash.jpg',
    },
  });

  const hero5 = await prisma.hero.create({
    data: {
      Nombre: 'Green Lantern',
      nivel_de_poder: 85,
      loc_id: localidad5.loc_id,
      ocupado: false,
      hero_img: 'https://example.com/greenlantern.jpg',
    },
  });

  const hero6 = await prisma.hero.create({
    data: {
      Nombre: 'Aquaman',
      nivel_de_poder: 90,
      loc_id: localidad6.loc_id,
      ocupado: true,
      hero_img: 'https://example.com/aquaman.jpg',
    },
  });

  const criminal1 = await prisma.criminal.create({
    data: {
      nombre: 'Lex Luthor',
      nivel_de_poder: 80,
      numero_de_miembros: 5,
      loc_id: localidad1.loc_id,
      capturado: false,
      villano_img: 'https://example.com/lexluthor.jpg',
    },
  });

  const criminal2 = await prisma.criminal.create({
    data: {
      nombre: 'Joker',
      nivel_de_poder: 85,
      numero_de_miembros: 10,
      loc_id: localidad2.loc_id,
      capturado: true,
      villano_img: 'https://example.com/joker.jpg',
    },
  });

  const criminal3 = await prisma.criminal.create({
    data: {
      nombre: 'Harley Quinn',
      nivel_de_poder: 60,
      numero_de_miembros: 2,
      loc_id: localidad3.loc_id,
      capturado: false,
      villano_img: 'https://example.com/harleyquinn.jpg',
    },
  });

  const criminal4 = await prisma.criminal.create({
    data: {
      nombre: 'Ra’s al Ghul',
      nivel_de_poder: 95,
      numero_de_miembros: 15,
      loc_id: localidad4.loc_id,
      capturado: false,
      villano_img: 'https://example.com/rasalghul.jpg',
    },
  });

  const criminal5 = await prisma.criminal.create({
    data: {
      nombre: 'Bane',
      nivel_de_poder: 90,
      numero_de_miembros: 8,
      loc_id: localidad5.loc_id,
      capturado: true,
      villano_img: 'https://example.com/bane.jpg',
    },
  });

  const criminal6 = await prisma.criminal.create({
    data: {
      nombre: 'Two-Face',
      nivel_de_poder: 70,
      numero_de_miembros: 3,
      loc_id: localidad6.loc_id,
      capturado: false,
      villano_img: 'https://example.com/twoface.jpg',
    },
  });

  const crimen1 = await prisma.crimen.create({
    data: {
      victima: 1,
      crimen: 'Robo de banco',
      loc_id: localidad1.loc_id,
      vill_id: criminal1.vill_id,
      en_curso: true,
    },
  });

  const crimen2 = await prisma.crimen.create({
    data: {
      victima: 2,
      crimen: 'Asalto a mano armada',
      loc_id: localidad2.loc_id,
      vill_id: criminal2.vill_id,
      en_curso: false,
    },
  });

  const crimen3 = await prisma.crimen.create({
    data: {
      victima: 3,
      crimen: 'Secuestro',
      loc_id: localidad3.loc_id,
      vill_id: criminal3.vill_id,
      en_curso: true,
    },
  });

  const crimen4 = await prisma.crimen.create({
    data: {
      victima: 4,
      crimen: 'Destrucción de propiedad',
      loc_id: localidad4.loc_id,
      vill_id: criminal4.vill_id,
      en_curso: true,
    },
  });

  const crimen5 = await prisma.crimen.create({
    data: {
      victima: 5,
      crimen: 'Robo en tienda',
      loc_id: localidad5.loc_id,
      vill_id: criminal5.vill_id,
      en_curso: false,
    },
  });

  const crimen6 = await prisma.crimen.create({
    data: {
      victima: 6,
      crimen: 'Extorsión',
      loc_id: localidad6.loc_id,
      vill_id: criminal6.vill_id,
      en_curso: true,
    },
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
