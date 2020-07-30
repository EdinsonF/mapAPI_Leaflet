class UI {
    constructor() {

        this.api = new API();
        //crear los markers con layerGroup
        this.markers = new L.LayerGroup();
         // Iniciar el mapa
         this.mapa = this.inicializarMapa();
         

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([4.671572, -74.05777], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }
    //metodos par llamar los establecimientos de la api
    async montrarEstablecimientos(){
        const datos = await this.api.consultarDatos()

        
        const resultado = datos.respuestaJSON;
            
        this.mostrarPines(resultado);
        
    }

    mostrarPines(datos){
        this.markers.clearLayers();

        datos.forEach(dato => {

            
            const {direccion, ciudad, location} = dato;
            //monstrat globo de informacion sobre cada pin
            const opcionPopup = new L.popup()
                .setContent(`<p><h4><b>${ciudad}</b></h4></p>
                             <p><b>Dirección:</b> ${direccion}</p>`);
            const marker = new L.marker([
                parseFloat(location.latitude),
                parseFloat(location.longitude)
            ]).bindPopup(opcionPopup);
            this.markers.addLayer(marker);
        });

        //agregamos al mapa
        this.markers.addTo(this.mapa);
    }

    //armando filtro
    async armarFiltro(filtro){
        const datos = await this.api.consultarDatos()

        const resultado = datos.respuestaJSON;
        //pasamos la busqueda y el resultado para el filtro
        this.filtrarResultados(resultado, filtro);
    }

    //filtrando y mostrnado pines
    filtrarResultados(resultados, busqueda){
        //filtado con .filter
        const filtro = resultados.filter(filtro => filtro.ciudad.indexOf(busqueda) !== -1); //dirente a -1 se trae los q concuerdan
        //mostrando pines por filtro
        //console.log(filtro);
        this.mostrarPines(filtro);
    }
}