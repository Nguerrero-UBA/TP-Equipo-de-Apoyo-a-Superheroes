if(document.getElementById('Inicio')){
    document.getElementById('crimenForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const crimenData = {
            victima: parseInt(document.getElementById('InputDNI').value), 
            crimen: document.getElementById('InputCrimen').value, 
            loc_id: parseInt(document.getElementById('SelectLoc').value), 
            vill_id: parseInt(document.getElementById('SelectVill').value), 
            
        };
        console.log(crimenData);
       

        fetch('http://localhost:3000/EAS/crimenes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crimenData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                alert('Crimen creado exitosamente');
                console.log(data);
            }
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
            const response = await fetch("http://localhost:3000/EAS/v1/Lista_Criminales/capturados/false");
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
        const response = await fetch("http://localhost:3000/EAS/crimenes-encurso?en_curso=true");
        const crimenes = await response.json();
        const heroesResponse = await fetch("http://localhost:3000/EAS/heroes?ocupado=false");
        const heroes = await heroesResponse.json();       

        listaCrimenes.innerHTML = "";

        // Mostrar un "template" con cada crimen
        crimenes.forEach(crimen => {
            const crimenCard = document.createElement("div");
            crimenCard.className = "col-md-4 mb-4";
            crimenCard.innerHTML = `
                <div class="card bg-warning">
                    <div class="card-body" data-villano-id="${crimen.criminal.vill_id}">
                        <h5 class="card-title"><strong>${crimen.crimen}</strong></h5>
                        <p class="card-text"><strong>Víctima:</strong> ${crimen.victima}</p>
                        <p class="card-text"><strong>Ubicación:</strong> ${crimen.localidad.nombre}</p>
                        <p class="card-text"><strong>Criminal:</strong> ${crimen.criminal.nombre}</p>
                        <p class="card-text"><strong>Nivel de Poder del Criminal:</strong> ${crimen.criminal.nivel_de_poder}</p>
                        <p class="card-text"><strong>Estado:</strong> ${crimen.en_curso ? "En curso" : "Resuelto"}</p>
                    
                        <form class="assign-hero-form">
                            <label for="heroSelect-${crimen.crimen_id}">Asignar Héroe:</label>
                            <select class="form-select mb-2" id="heroSelect-${crimen.crimen_id}">
                                <option value="">Seleccione un héroe</option>
                                ${heroes.map(hero => `<option value="${hero.id}" data-power="${hero.nivel_de_poder}">${hero.Nombre} (Poder: ${hero.nivel_de_poder})</option>`).join('')}
                            </select>
                            <button type="submit" class="btn btn-primary">Asignar</button>
                        </form>
                    </div>
                </div>
            `;
            listaCrimenes.appendChild(crimenCard);
        });
        document.querySelectorAll('.assign-hero-form').forEach(form => {
            form.addEventListener('submit', async function(event) {
                event.preventDefault();
                const select = this.querySelector('select');
                const crimenId = select.id.split('-')[1];
                const heroId = select.value;
                const heroPower = parseInt(select.options[select.selectedIndex].getAttribute("data-power"));
                const criminalPower = crimenes.find(c => c.crimen_id == crimenId).criminal.nivel_de_poder;

                if (!heroId) {
                    alert('Seleccione un héroe antes de asignar.');
                    return;
                }
                let escapeChance = 0;
                if (criminalPower > heroPower) {
                    const powerDifference = criminalPower - heroPower;
                    escapeChance = Math.min(80, powerDifference * 10); 
                }

                const escapa = Math.random() * 100 < escapeChance;

                if (escapa) {
                    alert(`¡El criminal escapó! 
                           Probabilidad de escape: ${escapeChance}%`);
                    return; 
                }
                const crimenCard = this.closest('.card-body'); 
                const villId = crimenCard.dataset.villanoId;
                try {
                    await fetch(`http://localhost:3000/EAS/asignar-hero`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ crimen_id: parseInt(crimenId), hero_id: parseInt(heroId), vill_id: parseInt(villId) })
                    });
                    alert('Héroe asignado con éxito!');
                    cargarCrimenesEnCurso();
                } catch (error) {
                    console.error('Error al asignar héroe:', error);
                }
            });
        });

    } catch (error) {
        console.error("Error al cargar los crímenes en curso:", error);
        }    
    }

document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const toggleLabel = document.getElementById('toggleLabel');
    const crimenForm = document.getElementById('crimenForm');
    const criminalForm = document.getElementById('criminalForm');
    const divCrimenForm = document.getElementById('divCrimenForm');
    const titulo = document.getElementById('titulo');
    const divCriminalForm = document.getElementById('divCriminalForm');

    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            divCriminalForm.style.display = 'block';
            crimenForm.style.display = 'none';
            divCrimenForm.style.display = 'none';
            criminalForm.style.display = 'block';
            toggleLabel.textContent = 'Crear Crimen/Criminal';
            titulo.style.display = 'block';
        } else {
            divCriminalForm.style.display = 'none';
            crimenForm.style.display = 'block';
            criminalForm.style.display = 'none';
            toggleLabel.textContent = 'Crear Crimen/Criminal';
            divCrimenForm.style.display = 'block';
            titulo.style.display = 'none';
        }
    });
    
    const selectLocCriminal = document.getElementById("SelectLocCriminal");
    fetch("http://localhost:3000/EAS/localidades")
        .then(response => response.json())
        .then(localidades => {
            localidades.forEach(localidad => {
                let option = document.createElement("option");
                option.value = localidad.loc_id;
                option.textContent = localidad.nombre;
                selectLocCriminal.appendChild(option);
            });
        })
        .catch(error => console.error("Error al cargar localidades:", error));
        
        criminalForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const criminalData = {
            nombre: document.getElementById('InputNombre').value,
            nivel_de_poder: parseInt(document.getElementById('InputPoder').value),
            numero_de_miembros: parseInt(document.getElementById('InputMiembros').value),
            loc_id: parseInt(document.getElementById('SelectLocCriminal').value),
            capturado: false
        };

        fetch('http://localhost:3000/EAS/criminales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(criminalData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Criminal creado exitosamente');
            console.log(data);
            criminalForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al crear el criminal');
        });
    });
});

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
                    <div class="card p-1 text-bg-secondary h-100  shadow-lg" style="padding: 10px; margin:20px;" >
                        <img src="${criminal.villano_img || 'https://placehold.co/600x400/png'}" class="card-img-top" alt="${criminal.nombre}">
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
if(document.getElementById('Heores')){
    document.addEventListener("DOMContentLoaded", async () => {
        const container = document.getElementById("heroes-container");

        try {

            const response = await fetch('http://localhost:3000/EAS/heroes');
            const heroes = await response.json();

            if (!Array.isArray(heroes)) {
                console.error("La API no devolvió una lista de heroes.");
                return;
            }


            if (heroes.length === 0) {
                container.innerHTML = "<p class='text-light text-center'>No tenemos heroes reclutados.</p>";
                return;
            }

            heroes.forEach(heroe => {
                const card = document.createElement("div");
                card.classList.add("col-md-4");

                card.innerHTML = `
                    <div class="card p-1 text-bg-secondary shadow-lg" style="padding: 10px; margin:20px;" >
                        <img src="${heroe.hero_img || 'https://placehold.co/600x400/png'}" class="card-img-top" alt="${heroe.Nombre}">
                        <div class="card-body p-3">
                            <h5 class="card-title"><strong>${heroe.Nombre}</strong></h5>
                            <p class="card-text"><strong>Nivel de Poder:</strong> ${heroe.nivel_de_poder}</p>
                            <p class="card-text"><strong>Localidad:</strong> ${heroe.localidad.nombre}</p>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        } catch (error) {
            console.error("Error al obtener los Heroes: ", error);
            
        }
    });
}
Capturar_criminal_script



