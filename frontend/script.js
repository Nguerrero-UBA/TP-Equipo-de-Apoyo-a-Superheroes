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