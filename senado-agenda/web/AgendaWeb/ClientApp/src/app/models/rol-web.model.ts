export class RolWebModel {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;

  constructor(rolWebModel) {
    {
      this.id = rolWebModel.id || 0;
      this.nombre = rolWebModel.nombre || '';
      this.descripcion = rolWebModel.descripcion || '';
      this.activo = rolWebModel.activo || false;
    }
  }

}
