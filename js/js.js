dayjs.locale("es");
let gastos = [] ;
let visualizacionGastos = document.getElementById("visualizacion_gastos");

let tituloGasto= document.getElementById("titulo_gasto");
let ingresoFecha = document.getElementById("fecha_ingreso");
let detalleGasto = document.getElementById("detalle_gasto")
let credorGasto = document.getElementById("boton_crear");
credorGasto.onclick = crearEveto;
let montoGastado = document.getElementById("monto_gastado");

if( localStorage.getItem("gastosUsuario") != null){//control incial para cargar datos de gastos
    gastos = JSON.parse(localStorage.getItem("gastosUsuario"));
    console.log(gastos);
}

function controlIngresos(){
    if(tituloGasto.value == "" ){
        alert("Debe ingresar titulo del gasto")
        return false
    }else if(tituloGasto.length > 30){
        alert("El titulo del gasto no puede tener mas de 30 caracteres")
        return false
    }else if(montoGastado < 0){
        alert("el monto gastado no puede ser negativo")
        return false
    }else if(isNaN(montoGastado)){
        alert("Tiene que ingresar numeros en mono gastado")
    }
    
}

function renderizadoGastos(baseDatos){
    visualizacionGastos.innerHTML = "";
    baseDatos.forEach(el => {
        let contenedorEvento = document.createElement("article");
        contenedorEvento.innerHTML = `
                <p>id:${el.id} ${el.titulo} ${dayjs(el.fecha).format('DD-MMMM-YYYY')} detalle: ${el.detalle} </p>
                <p>Gastado: ${el.gasto}$</p>
                <button id=editar${el.id} class="editar" type=button >editar</button>
                <button id=eliminar${el.id} class="eliminar" type=button >Eliminar</button>
            `
        visualizacionGastos.appendChild(contenedorEvento)
    }); 
    let botonEditar = document.querySelectorAll(`.editar`)//selecicono todas las clases editar
    botonEditar.forEach((el)=>el.onclick = eventoEditar)//le pongo elvento onclick a cada boton editar
    let botonEliminar = document.querySelectorAll(`.eliminar`)
    botonEliminar.forEach((el)=>el.onclick = eventoEliminar)
}

function eventoEditar(e){
    alert(e.target.id)
}
renderizadoGastos(gastos)

function eventoEliminar(e){
    alert(e.target.id)
}
function crearEveto(){
    gastos.push({
        id: gastos.length + 1, 
        titulo: tituloGasto.value, 
        gasto: montoGastado.value,
        fecha: ingresoFecha.value,
        detalle: detalleGasto.value
    });
    //console.log(gastos);
    localStorage.setItem("gastosUsuario",JSON.stringify(gastos));
    gastos.sort((a, b) => new Date(a.fecha)  - new Date(b.fecha));
    renderizadoGastos(gastos)
    tituloGasto.value = "";
    montoGastado.value = "";
    ingresoFecha.value = "";
    detalleGasto.value = "";
}


gastos.sort((a, b) => new Date(a.fecha)  - new Date(b.fecha));

