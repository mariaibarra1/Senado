export class EventoInvitadoModel {
  id_evento: number;
  nombre: string;
  correo_electronico: string;
  

  constructor(eventoinvitadoModel) {
    {
      this.id_evento = eventoinvitadoModel.id_evento || 0;
      this.nombre = eventoinvitadoModel.nombre || '';
      this.correo_electronico = eventoinvitadoModel.correo_electronico || '';
     
    }
  }
}
