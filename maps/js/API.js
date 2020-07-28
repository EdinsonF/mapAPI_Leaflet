class API{

     async consultarDatos(){

        const datos = await fetch('js/restaurantes.json');

        const respuestaJSON = await datos.json();

        return{
            respuestaJSON
        }

    }

}