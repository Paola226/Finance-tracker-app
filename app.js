// 1. Seleccionar los elementos del DOM
const conceptoInput = document.getElementById('concepto');
const montoInput = document.getElementById('monto');
const btnAgregar = document.getElementById('btn-agregar');
const listaGastos = document.getElementById('lista-gastos');
const totalGastosTexto = document.getElementById('total-gastos');

let totalAcumulado = 0;

// 2. Función para agregar un gasto
btnAgregar.addEventListener('click', () => {
    const concepto = conceptoInput.value.trim();
    const monto = parseFloat(montoInput.value);

    // Validación básica
    if (concepto === '' || isNaN(monto) || monto <= 0) {
        alert('Por favor, ingresa un concepto válido y un monto mayor a 0');
        return;
    }

    // Crear el elemento de la lista (li)
    const nuevoItem = document.createElement('li');
    
    // Guardamos el monto en un atributo personalizado del HTML para usarlo al eliminar
    nuevoItem.dataset.monto = monto; 

    // Insertamos el texto del gasto y el botón de eliminar
    nuevoItem.innerHTML = `
        <span>${concepto}: $${monto}</span>
        <button class="btn-eliminar" style="background-color: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; margin-left: 10px;">X</button>
    `;

    // Agregar el elemento a la lista en pantalla
    listaGastos.appendChild(nuevoItem);

    // Actualizar el total acumulado
    totalAcumulado += monto;
    totalGastosTexto.textContent = totalAcumulado;

    // Limpiar los inputs
    conceptoInput.value = '';
    montoInput.value = '';
});

// 3. Función para ELIMINAR el gasto al hacer clic en la "X"
listaGastos.addEventListener('click', (evento) => {
    // Verificar si el usuario hizo clic específicamente en el botón de eliminar
    if (evento.target.classList.contains('btn-eliminar')) {
        const itemAEliminar = evento.target.parentElement; // Obtenemos el <li> completo
        const montoREliminar = parseFloat(itemAEliminar.dataset.monto); // Obtenemos su valor guardado

        // Restar el monto del total acumulado
        totalAcumulado -= montoREliminar;
        totalGastosTexto.textContent = totalAcumulado;

        // Borrar el elemento visualmente de la pantalla
        itemAEliminar.remove();
    }
});