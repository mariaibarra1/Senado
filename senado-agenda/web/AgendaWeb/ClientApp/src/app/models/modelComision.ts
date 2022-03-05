export class modelComision {

  id: number;
  nombre: string;
  descripcion: string;
  activo: Boolean;
  constructor(modelServicios) {
    {
      this.id = modelServicios.id || 0;
      this.nombre = modelServicios.nombre || '';
      this.descripcion = modelServicios.descripcion || '';
      this.activo = modelServicios.activo || false;
    }
  }
}
