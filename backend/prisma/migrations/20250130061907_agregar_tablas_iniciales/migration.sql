-- CreateTable
CREATE TABLE "Localidad" (
    "loc_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "poblacion" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "nivel_de_inseguridad" INTEGER NOT NULL,

    CONSTRAINT "Localidad_pkey" PRIMARY KEY ("loc_id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "nivel_de_poder" INTEGER NOT NULL,
    "loc_id" INTEGER NOT NULL,
    "ocupado" BOOLEAN NOT NULL DEFAULT false,
    "hero_img" TEXT,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criminal" (
    "vill_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nivel_de_poder" INTEGER NOT NULL,
    "numero_de_miembros" INTEGER NOT NULL,
    "loc_id" INTEGER NOT NULL,
    "capturado" BOOLEAN NOT NULL DEFAULT false,
    "villano_img" TEXT,

    CONSTRAINT "Criminal_pkey" PRIMARY KEY ("vill_id")
);

-- CreateTable
CREATE TABLE "Crimen" (
    "crimen_id" SERIAL NOT NULL,
    "victima" TEXT NOT NULL,
    "crimen" TEXT NOT NULL,
    "loc_id" INTEGER NOT NULL,
    "vill_id" INTEGER NOT NULL,
    "en_curso" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Crimen_pkey" PRIMARY KEY ("crimen_id")
);

-- AddForeignKey
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "Localidad"("loc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "Localidad"("loc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crimen" ADD CONSTRAINT "Crimen_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "Localidad"("loc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crimen" ADD CONSTRAINT "Crimen_vill_id_fkey" FOREIGN KEY ("vill_id") REFERENCES "Criminal"("vill_id") ON DELETE RESTRICT ON UPDATE CASCADE;
