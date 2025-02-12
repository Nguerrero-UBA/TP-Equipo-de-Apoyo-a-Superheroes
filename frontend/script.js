if(document.getElementById('Inicio')){
    document.getElementById('crimenForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const crimenData = {
            victima: document.getElementById('victima').value,
            crimen: document.getElementById('crimen').value,
            loc_id: document.getElementById('SelectLoc').value,
            vill_id: document.getElementById('SelectVill').value,
            en_curso: 'true'
        };

        fetch('http://localhost:3000/EAS/crimenes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crimenData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Crimen creado exitosamente');
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al crear el crimen');
        });
    });

    document.addEventListener("DOMContentLoaded", async () => {
        const selectLocalidad = document.getElementById("SelectLoc");

        try {
            const response = await fetch("http://localhost:3000/EAS/localidades");
            const localidades = await response.json();

            localidades.forEach(localidad => {
                let option = document.createElement("option");
                option.value = localidad.loc_id; 
                option.textContent = localidad.nombre; 
                selectLocalidad.appendChild(option);
            });
        } catch (error) {
            console.error("Error al cargar localidades:", error);
        }
    });

    document.addEventListener("DOMContentLoaded", async () => {
        const selectVillano = document.getElementById("SelectVill");

        try {
            const response = await fetch("http://localhost:3000/EAS/v1/Lista_Criminales");
            const villanos = await response.json();

            villanos.forEach(villano => {
                let option = document.createElement("option");
                option.value = villano.vill_id; 
                option.textContent = villano.nombre; 
                selectVillano.appendChild(option);
            });
        } catch (error) {
            console.error("Error al cargar Criminales:", error);
        }
    });
    console.log("test")
}

async function cargarCrimenesEnCurso() {
    const listaCrimenes = document.getElementById("lista-crimenes");
    console.log("crimen");
    if(!listaCrimenes) return;
    try {
        // solicitud al back para obtener los crímenes en curso
        const response = await fetch("http://localhost:3000/EAS/crimenes?en_curso=true");
        const crimenes = await response.json();
        
        listaCrimenes.innerHTML = "";

        // Mostrar un "template" con cada crimen
        crimenes.forEach(crimen => {
            const crimenCard = document.createElement("div");
            crimenCard.className = "col-md-4 mb-4";
            crimenCard.innerHTML = `
                <div class="card bg-secondary text-white">
                    <div class="card-body">
                        <h5 class="card-title">${crimen.crimen}</h5>
                        <p class="card-text"><strong>Víctima:</strong> ${crimen.victima}</p>
                        <p class="card-text"><strong>Ubicación:</strong> ${crimen.localidad.nombre}</p>
                        <p class="card-text"><strong>Criminal:</strong> ${crimen.criminal.nombre}</p>
                        <p class="card-text"><strong>Estado:</strong> ${crimen.en_curso ? "En curso" : "Resuelto"}</p>
                    </div>
                </div>
            `;
            listaCrimenes.appendChild(crimenCard);
        });
    } catch (error) {
        console.error("Error al cargar los crímenes en curso:", error);
        }    
    }


if(document.getElementById('Crimenes')){
    document.addEventListener("DOMContentLoaded", cargarCrimenesEnCurso);
}

if(document.getElementById('Capturados')){
    document.addEventListener("DOMContentLoaded", async () => {
        const container = document.getElementById("criminales-container");
    
        try {
            
            const response = await fetch("http://localhost:3000/EAS/v1/Lista_criminales/capturados/true");
            const criminales = await response.json();
    
            if (!Array.isArray(criminales)) {
                console.error("La API no devolvió una lista de criminales.");
                return;
            }
    
            
            if (criminales.length === 0) {
                container.innerHTML = "<p class='text-light text-center'>No hay criminales capturados.</p>";
                return;
            }
    
            
            criminales.forEach(criminal => {
                const card = document.createElement("div");
                card.classList.add("col-md-4"); 
    
                card.innerHTML = `
                    <div class="card p-1 text-bg-warning h-100  shadow-lg" style="padding: 10px; margin:20px;" >
                        <img src="${criminal.villano_img || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${criminal.nombre}">
                        <div class="card-body p-3">
                            <h5 class="card-title"><strong>${criminal.nombre}</strong></h5>
                            <p class="card-text"><strong>Nivel de Poder:</strong> ${criminal.nivel_de_poder}</p>
                            <p class="card-text"><strong>Miembros:</strong> ${criminal.numero_de_miembros}</p>
                            <p class="card-text"><strong>Localidad:</strong> ${criminal.localidad.nombre}</p>
                        </div>
                    </div>
                `;
    
                container.appendChild(card);
            });
        } catch (error) {
            console.error("Error al obtener los criminales capturados:", error);
            container.innerHTML = "<p class='text-light text-center'>Error al cargar la lista.</p>";
        }
    });
}

// const response = await fetch("/api/criminales/capturados");
// const criminalesCapturados = await response.json();

// // Mostrar los criminales capturados en la página
// criminalesCapturados.forEach(criminal => {
//   console.log(criminal.nombre);
// });