export class modelTipoEvento {

  id: number;
  nombre: string;
  descripcion: string;
  activo: Boolean;

  constructor(modelTipoEvento) {
    {
      this.id = modelTipoEvento.id || 0;
      this.nombre = modelTipoEvento.nombre || '';
      this.descripcion = modelTipoEvento.descripcion || '';
      this.activo = modelTipoEvento.activo || false;
    }
  }

}
