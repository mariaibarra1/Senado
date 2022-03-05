export class TipoComisionModel {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  constructor(tipoModel) {
    this.id = tipoModel.id || 0;
    this.nombre = tipoModel.nombre || '';
    this.descripcion = tipoModel.descripcion || '';
    this.activo = tipoModel.activo || false;
  }

}
