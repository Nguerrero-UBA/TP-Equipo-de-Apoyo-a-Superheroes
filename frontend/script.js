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
            option.value = localidad.loc_id; // Guardamos el ID
            option.textContent = localidad.nombre; // Mostramos el nombre
            selectLocalidad.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar localidades:", error);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const selectVillano = document.getElementById("SelectVill");

    try {
        const response = await fetch("http://localhost:3000/EAS/Criminales");
        const villanos = await response.json();

        villanos.forEach(villano => {
            let option = document.createElement("option");
            option.value = villano.vill_id; // Guardamos el ID
            option.textContent = villano.nombre; // Mostramos el nombre
            selectVillano.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar Criminales:", error);
    }
});
console.log("test")


async function cargarCrimenesEnCurso() {
    const listaCrimenes = document.getElementById("lista-crimenes");

    try {
        // solicitud al back para obtener los crímenes en curso
        const response = await fetch("http://localhost:3000/EAS/crimenes?en_curso=true");
        const crimenes = await response.json();
        const heroesResponse = await fetch("http://localhost:3000/EAS/heroes?ocupado=false");
        const heroes = await heroesResponse.json();       

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
                    
                        <form class="assign-hero-form">
                                <label for="heroSelect-${crimen.crimen_id}">Asignar Héroe:</label>
                                <select class="form-select mb-2" id="heroSelect-${crimen.crimen_id}">
                                    <option value="">Seleccione un héroe</option>
                                    ${heroes.map(hero => `<option value="${hero.id}">${hero.Nombre}</option>`).join('')}
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
                const crimenId = this.querySelector('select').id.split('-')[1];
                const heroId = this.querySelector('select').value;
                
                if (!heroId) {
                    alert('Seleccione un héroe antes de asignar.');
                    return;
                }
                
                try {
                    await fetch(`http://localhost:3000/EAS/asignar-hero`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ crimen_id: parseInt(crimenId), hero_id: parseInt(heroId) })
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



document.addEventListener("DOMContentLoaded", cargarCrimenesEnCurso);