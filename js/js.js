let a = dayjs().startOf('year')
let gastos = [] 

if( localStorage.getItem("gastosUsuario") != null){
    gastos = JSON.parse(localStorage.getItem("gastosUsuario"));
    console.log(gastos)
}

dayjs.locale("es")
let tituloGasto= document.getElementById("titulo_gasto")
let ingresoFecha = document.getElementById("fecha_ingreso")
let credorGasto = document.getElementById("btn_crear")
credorGasto.onclick = crearEveto


function crearEveto(){
    gastos.push({id: gastos.length + 1, titulo: tituloGasto.value, fecha:ingresoFecha.value})
    console.log(gastos)
    alert(dayjs(gastos[gastos.length-1].fecha).format('DD-MMMM-YYYY'))
    localStorage.setItem("gastosUsuario",JSON.stringify(gastos));
}
