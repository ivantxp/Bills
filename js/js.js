dayjs.locale("es");
let gastos = [] ;
let visualizacionGastos = document.getElementById("visualizacion_gastos");
let tituloGasto= document.getElementById("titulo_gasto");
let ingresoFecha = document.getElementById("fecha_ingreso");
let credorGasto = document.getElementById("btn_crear");
credorGasto.onclick = crearEveto;

let montoGastado = document.getElementById("monto_gastado");





if( localStorage.getItem("gastosUsuario") != null){
    gastos = JSON.parse(localStorage.getItem("gastosUsuario"));
    console.log(gastos);
}

function renderizadoGastos(baseDatos){
    visualizacionGastos.innerHTML = "";
    baseDatos.forEach(el => {
        let contenedorEvento = document.createElement("article");
        contenedorEvento.innerHTML = `
                <p>${el.titulo} ${dayjs(el.fecha).format('DD-MMMM-YYYY')} ----> ${el.gasto}$</p>

                <button id=editar${el.id} class="editar" type=button >editar</button>
                <button id=eliminar${el.id} class="eliminar" type=button >editar</button>
                `
        visualizacionGastos.appendChild(contenedorEvento)
    }); 
    let botonEditar = document.querySelectorAll(`editar`)
    botonEditar.forEach((el)=>el.onclick = eventoEditar)
}

function eventoEditar(e){
    alert(e.target.id)
}
renderizadoGastos(gastos)


function crearEveto(){
    gastos.push({
        id: gastos.length + 1, 
        titulo: tituloGasto.value, 
        gasto: montoGastado.value,
        fecha:ingresoFecha.value})
    console.log(gastos);
    alert(dayjs(gastos[gastos.length-1].fecha).format('DD-MMMM-YYYY'));
    localStorage.setItem("gastosUsuario",JSON.stringify(gastos));
    gastos.sort((a, b) => new Date(a.fecha)  - new Date(b.fecha));
    renderizadoGastos(gastos)
}


gastos.sort((a, b) => new Date(a.fecha)  - new Date(b.fecha));

