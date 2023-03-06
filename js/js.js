//librerias https://programacion.net/articulo/9_librerias_de_javascript_para_crear_graficos_interactivos_1365
dayjs.locale("es");
let gastos = [] ;
let visualizacionGastos = document.getElementById("visualizacion_gastos");

let tituloGasto = document.getElementById("titulo_gasto");
let ingresoFecha = document.getElementById("fecha_ingreso");
let tipoGasto = document.getElementById("tipo_gasto");
let detalleGasto = document.getElementById("detalle_gasto");
let credorGasto = document.getElementById("boton_crear");
credorGasto.onclick = controlIngresos;
let montoGastado = document.getElementById("monto_gastado");
let buscar = document.getElementById("boton_buscar");
buscar.onclick = buscarFiltrados;
let limpiarCampo = document.getElementById("limpiar_campos");
limpiarCampo.onclick = a

function a(){
    let b = document.getElementById("tipo_gasto")
    console.log (tipoGasto.value)
}
//captura de chack
let checkBajoAlto = document.getElementById("check_bajo_alto");
let checkAltoBajo = document.getElementById("check_alto_bajo");
let CheckRecienteAntiguo = document.getElementById("check_reciente_antiguo");
let CheckAntguoReciente = document.getElementById("check_antiguo_reciente");
checkBajoAlto.onclick = OrdenarBajoAlto;
checkAltoBajo.onclick = OrdenarAltoBajo;
CheckRecienteAntiguo.onclick = OrdenarRecienteAntiguo;
CheckAntguoReciente.onclick = OrdenarAntguoReciente;

if( localStorage.getItem("gastosUsuario") != null){//control incial para cargar datos de gastos
    gastos = JSON.parse(localStorage.getItem("gastosUsuario"));
}
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        controlIngresos()
    }
});

function caracterEspecial(inspeccionar){
    for(i=0; i<= inspeccionar.value.length;i++){
        let resultado = false
        if(inspeccionar.value[i] == ">" || inspeccionar.value[i] == "<") {
            resultado = true
            break
        }
        return resultado
    }
} 

function OrdenarBajoAlto(){
    if(checkBajoAlto.checked){
        checkAltoBajo.checked = false;
        CheckRecienteAntiguo.checked = false;
        CheckAntguoReciente.checked = false;
/*          gastos.sort((a, b) => b.gasto  - a.gasto);
        renderizadoGastos(gastos) 
    } else{
        gastos.sort((a, b) => a.id - b.id);
        renderizadoGastos(gastos) */
    }
}

function OrdenarAltoBajo(){
    if(checkAltoBajo.checked){
        checkBajoAlto.checked =  false;
        CheckRecienteAntiguo.checked = false;
        CheckAntguoReciente.checked = false;

      /*    gastos.sort((a, b) => a.gasto  - b.gasto);
        renderizadoGastos(gastos) 
     }else{
        gastos.sort((a, b) => a.i - b.id);
        renderizadoGastos(gastos) */
    } 
}

function OrdenarRecienteAntiguo(){
    if(CheckRecienteAntiguo.checked){
        checkBajoAlto.checked =  false;
        checkAltoBajo.checked = false;
        CheckAntguoReciente.checked = false;
/*         gastos.sort((a, b) => new Date(b.fecha)  - new Date(a.fecha));
        renderizadoGastos(gastos)

    }else{
        gastos.sort((a, b) =>a.id  -b.id);
        renderizadoGastos(gastos)
    */} 
}

function OrdenarAntguoReciente(){
    if(CheckAntguoReciente.checked){
        checkBajoAlto.checked =  false;
        checkAltoBajo.checked = false;
        CheckRecienteAntiguo.checked = false;
/*         gastos.sort((a, b) => new Date(a.fecha)  - new Date(b.fecha));
        renderizadoGastos(gastos)
    }else{
        gastos.sort((a, b) => a.id  -b.id);
        renderizadoGastos(gastos) */
    }
}


function  buscarFiltrados(){
    let filtrados = gastos;
    let fechaAntigua = document.getElementById("fecha_antigua");
    let fechaReceinte = document.getElementById("fecha_reciente");
    let importeMinimo = document.getElementById("importe_minimo");
    let importeMaximo = document.getElementById("importe_maximo");
    let buscarorPalabras = document.getElementById("filtro_busqueda");
    let busqueda = buscarorPalabras.value.toLowerCase();


    //if acontinacion verifica si contiene informacion los input para luego aplicarlos filtros al array filtrados 
    if(importeMinimo.value != ""){
        filtrados = filtrados.filter((el)=>el.gasto >= Number(importeMinimo.value)) 
    }
    if(importeMaximo.value !=""){
        filtrados = filtrados.filter((el)=>el.gasto <= Number(importeMaximo.value))
    }
    if(fechaAntigua.value != ""){
        filtrados = filtrados.filter((el)=> el.fecha >= fechaAntigua.value)
    }
    if(fechaReceinte != ""){
        filtrados = filtrados.filter((el)=> el.fecha >= fechaAntigua.value)
    }
    if(buscarorPalabras.value != ""){//busca si incluye la palabra a buscar la base de datos
        filtrados = filtrados.filter((el)=>el.titulo.toLowerCase().includes(busqueda) || el.detalle.toLowerCase().includes(busqueda) )
    }

    if(checkBajoAlto.checked){
        filtrados.sort((a, b) => b.gasto - a.gasto)
    }else if(checkAltoBajo.checked){
        filtrados.sort((a, b) => a.gasto - b.gasto);
    }else if(CheckRecienteAntiguo.checked){
        filtrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }else if(CheckAntguoReciente.checked){
        filtrados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }else{
        filtrados.sort((a, b) => a.id - b.id)
    }

    renderizadoGastos(filtrados)

}

function controlIngresos(){
    if(ingresoFecha.value =="" || tituloGasto.value == "" ||  montoGastado.value =="" || detalleGasto.value == "" || tipoGasto.value == ""){
        alert("Debe ingresar informacion pedida en todos los campos")
    }else if(tituloGasto.value.length > 30){
        alert("El titulo del gasto no puede tener mas de 30 caracteres")
    }else if(montoGastado.value < 0){
        alert("el monto gastado no puede ser negativo")
    }else if(isNaN(montoGastado.value)){
        alert("Tiene que ingresar numeros en monto gastado")
    }else if( detalleGasto.value.length > 100){
        alert("Los detalles de no puede superer los 100 caracteres")
    }else if(caracterEspecial(detalleGasto)){
        alert("No puede ingresar <,>")
    }
    else{
        crearEveto()
    }
}

function renderizadoGastos(baseDatos){   
    visualizacionGastos.innerHTML = "";
    baseDatos.forEach(el => {
        let contenedorEvento = document.createElement("article");
        contenedorEvento.innerHTML = `
                <p>id:${el.id} ${el.titulo} </p>
                <p>${dayjs(el.fecha).format('DD-MMMM-YYYY')}  </p>
                <p>tipo de gasto: ${el.tipo}</p>
                <p>detalle: ${el.detalle}</p>
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

function extractorId(extraccion){
    let numeroExtraido = "";
    for(i=0;i<extraccion.length;i++){
        if(isNaN( extraccion[i]) == false){
            numeroExtraido += extraccion[i]
        }
    }
    return Number(numeroExtraido)
}

async function eventoEditar(e){
    let idExtraido = extractorId(e.target.id)
    let eventoAEditar = gastos.indexOf(gastos.find((el)=>(el.id == idExtraido)))
    function optionSelected(){
        if ( gastos[eventoAEditar].tipo != document.getElementById("edicion_tipo_gasto").value){
            return "selected"
        }
    }
    console.log(eventoAEditar)

    const { value: formValues } = await Swal.fire({
        
        title: 'Editar gasto',
        html:   `
            <div>
                <input id="fecha_edicion" type="date"  value= ${gastos[eventoAEditar].fecha}>
            </div>
            <div>
                <input id="titulo_edicion" type="text" name=""placeholder = ${gastos[eventoAEditar].titulo} >
            </div>
            <div>
            <input id="gasto_edicion" type="text" name=""placeholder = ${gastos[eventoAEditar].gasto}>
            </div>
            <select id="edicion_tipo_gasto">
                <option  value=""  ${optionSelected()} >Tipo de gasto</option>
                <option value="fijos" ${optionSelected()}>Gastos fijos</option>
                <option value="extras" ${optionSelected()}>Extras</option>
                <option value="Vestimenta" ${optionSelected()}>Vestimenta</option>
                <option value="cuidado_personal" ${optionSelected()}> Cuidado personal</option>
                <option value="hogar" ${optionSelected()}>Hogar</option>
                <option value="salud" ${optionSelected()}>Salud</option>
                <option value="alimentacion" ${optionSelected()}>Alimentacion</option>
                <option value="transporte"${optionSelected()}>Transporte</option>
                <option value="impuestos" ${optionSelected()}>Impuestos</option>
                <option value="educacion" ${optionSelected()}>Educacion</option>
            </select>
            <div>
                <input id="detalle_edicion" name="detalle" type="text"  placeholder=${gastos[eventoAEditar].detalle}>
            </div>
        `,
        showCancelButton: true,

        focusConfirm: false,
        preConfirm: () => {
            return "edicion relizada"
        }       
    })

    if (formValues) {
        if(document.getElementById("fecha_edicion").value != ""){
            gastos[eventoAEditar].fecha = document.getElementById("fecha_edicion").value;
        }
        if(document.getElementById("titulo_edicion").value !=""){
            gastos[eventoAEditar].titulo = document.getElementById("titulo_edicion").value;
        }
        if(document.getElementById("gasto_edicion").value !=""){
            gastos[eventoAEditar].gasto = document.getElementById("gasto_edicion").value;
        }
        if( document.getElementById("edicion_tipo_gasto").value != ""){
            gastos[eventoAEditar].tipoGasto = document.getElementById("edicion_tipo_gasto").value;
        }
        if(document.getElementById("detalle_edicion").value !=""){
            gastos[eventoAEditar].detalle = document.getElementById("detalle_edicion").value;
        }
        localStorage.setItem("gastosUsuario",JSON.stringify(gastos));
        renderizadoGastos(gastos)
    }else{
        alert("false")
    }
}


function eventoEliminar(e){
    let idExtraido = extractorId(e.target.id)
    let eventoAEliminar = gastos.indexOf(gastos.find((el)=>(el.id == idExtraido)))
    gastos.splice(eventoAEliminar,1)  
    for(i=0;i<gastos.length;i++){
        gastos[i].id = i + 1
    }
    renderizadoGastos(gastos)
    localStorage.setItem("gastosUsuario",JSON.stringify(gastos));
}


function crearEveto(){
    gastos.push({
        id: gastos.length + 1, 
        titulo: tituloGasto.value, 
        gasto: montoGastado.value,
        fecha: ingresoFecha.value,
        tipo: tipoGasto.value,
        detalle: detalleGasto.value,
    });
    //console.log(gastos);
    localStorage.setItem("gastosUsuario",JSON.stringify(gastos));
    //gastos.sort((a, b) => new Date(a.fecha)  - new Date(b.fecha));
    renderizadoGastos(gastos);
    tituloGasto.value = "";
    montoGastado.value = "";
    ingresoFecha.value = "";
    tipoGasto.value = "";
    detalleGasto.value = "";
}

renderizadoGastos(gastos)



