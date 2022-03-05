
export class EventoservicioModel {
  id_evento: number;
  id_servicio: number;
 


  constructor(eventoservicioModel) {
    {
      this.id_evento = eventoservicioModel.id_evento || 0;
      this.id_servicio = eventoservicioModel.id_servicio || 0;


    }
  }
}
