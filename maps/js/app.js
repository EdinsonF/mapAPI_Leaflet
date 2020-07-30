const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.montrarEstablecimientos();
});

//filtrar busquedad

const buscador = document.querySelector("#buscar input");

buscador.addEventListener('input', () =>{
    if(buscador.value.length > 4){
        ui.armarFiltro(buscador.value);

    }
});