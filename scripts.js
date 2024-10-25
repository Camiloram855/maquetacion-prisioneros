// Seleccionar los elementos importantes
const celdaForm = document.getElementById('celda-form');
const formTitle = document.getElementById('form-title');
const saveCeldaBtn = document.getElementById('save-celda-btn');
const cancelBtn = document.getElementById('cancel-btn');
const celdaTable = document.getElementById('celda-table').getElementsByTagName('tbody')[0];
const showAddFormBtn = document.getElementById('show-add-form');

// Variables para controlar el estado de edición
let editingRow = null;

// Mostrar el formulario de agregar celda
showAddFormBtn.addEventListener('click', function() {
    celdaForm.style.display = 'block';
    formTitle.textContent = 'Agregar Nueva Celda';
    clearForm();
});

// Cancelar el formulario
cancelBtn.addEventListener('click', function() {
    celdaForm.style.display = 'none';
    clearForm();
});

// Guardar la celda (ya sea una nueva o una editada)
saveCeldaBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const celdaNumber = document.getElementById('celda-number').value;
    const celdaCapacity = document.getElementById('celda-capacity').value;
    const celdaInternos = document.getElementById('celda-internos').value;
    const celdaStatus = document.getElementById('celda-status').value;

    if (editingRow) {
        // Editar la fila existente
        editingRow.cells[0].textContent = celdaNumber;
        editingRow.cells[1].textContent = celdaCapacity;
        editingRow.cells[2].textContent = celdaInternos;
        editingRow.cells[3].textContent = celdaStatus;
        editingRow = null;
    } else {
        // Agregar una nueva fila
        const newRow = celdaTable.insertRow();
        newRow.innerHTML = `
            <td>${celdaNumber}</td>
            <td>${celdaCapacity}</td>
            <td>${celdaInternos}</td>
            <td>${celdaStatus}</td>
            <td><button class="edit-btn">Editar</button> <button class="delete-btn">Eliminar</button></td>
        `;
        addEventListenersToButtons(newRow);
    }

    celdaForm.style.display = 'none';
    clearForm();
});

// Añadir eventos a los botones de editar y eliminar
function addEventListenersToButtons(row) {
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');

    // Editar una celda
    editBtn.addEventListener('click', function() {
        formTitle.textContent = 'Editar Celda';
        celdaForm.style.display = 'block';

        // Cargar los datos de la celda en el formulario
        editingRow = row;
        document.getElementById('celda-number').value = row.cells[0].textContent;
        document.getElementById('celda-capacity').value = row.cells[1].textContent;
        document.getElementById('celda-internos').value = row.cells[2].textContent;
        document.getElementById('celda-status').value = row.cells[3].textContent;
    });

    // Eliminar una celda
    deleteBtn.addEventListener('click', function() {
        celdaTable.deleteRow(row.rowIndex - 1);
    });
}

// Inicializar los eventos de los botones existentes
document.querySelectorAll('tbody tr').forEach(addEventListenersToButtons);

// Limpiar el formulario después de guardar o cancelar
function clearForm() {
    document.getElementById('celda-number').value = '';
    document.getElementById('celda-capacity').value = '';
    document.getElementById('celda-internos').value = '';
    document.getElementById('celda-status').value = 'Ocupada';
}
