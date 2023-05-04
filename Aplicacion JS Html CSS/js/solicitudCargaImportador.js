class SolicitudesCargaImportador {
  constructor(
    unTipoMercaderia,
    unaDescripcionMercaderia,
    unPuerto,
    unaCantidadContenedores,
    unIdEmpresa,
    unIdSolicitud,
    unidImportador,
    

  ) {
    this.tipoMercaderia = unTipoMercaderia;
    this.descripcionMercaderia = unaDescripcionMercaderia;
    this.puerto = unPuerto;
    this.cantidadContenedores = unaCantidadContenedores;
    this.idEmpresa = unIdEmpresa;
    this.idSolicitud = unIdSolicitud; 
    this.idImportador = unidImportador;
    this.estado = "Pendiente"; //pendiente por defecto
    this.idViaje = -1; //este se asigna cuando la empresa asigna la solicitud a un viaje, es el mismo que arrayViajesEmpresa.idAutonumerico
    this.fechaCancelada = "-"
    this.fechaLlegada = "Por confirmar" // Hay que testear si estas fechas cambian en algo la funcionalidad
  }
}
