class API{
    //consultar datos de api
     async consultarDatos(){

        const datos = await fetch('https://www.datos.gov.co/resource/jpus-ug29.json');

        const respuestaJSON = await datos.json();

        return{
            respuestaJSON
        }

    }

}