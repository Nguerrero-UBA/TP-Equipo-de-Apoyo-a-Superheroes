document.getElementById('crimenForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const crimenData = {
        victima: document.getElementById('victima').value,
        crimen: document.getElementById('crimen').value,
        loc_id: parseInt(document.getElementById('loc_id').value),
        vill_id: parseInt(document.getElementById('vill_id').value),
        en_curso: document.getElementById('en_curso').value === 'true'
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