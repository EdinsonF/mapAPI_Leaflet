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
         const map = L.map('mapa').setView([4.671572, -74.05777], 14);
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
            const {direccion, longitud, latitud, razonsocial} = dato;
            //monstrat globo de informacion sobre cada pin
            const opcionPopup = new L.popup()
                .setContent(`<p><h4><b>${razonsocial}</b></h4></p>
                             <p><b>Dirección:</b> ${direccion}</p>`);
            const marker = new L.marker([
                parseFloat(latitud),
                parseFloat(longitud)
            ]).bindPopup(opcionPopup);
            this.markers.addLayer(marker);
        });

        //agregamos al mapa
        this.markers.addTo(this.mapa);
    }
}