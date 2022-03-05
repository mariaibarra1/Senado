export class EventoUsuarioModel {
  id_evento: number;
  id_usuario: number;
 


  constructor(eventousuarioModel) {
    {
      this.id_evento = eventousuarioModel.id_evento || 0;
      this.id_usuario = eventousuarioModel.id_usuario || 0;


    }
  }
}
