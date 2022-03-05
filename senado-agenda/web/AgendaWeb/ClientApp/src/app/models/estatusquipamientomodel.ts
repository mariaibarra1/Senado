export class modelEstatusEquipamento {

  id: number;
  nombre: string;
  descripcion: string;
  activo: Boolean;
  constructor(modelEstatusEquipamiento) {
    {
      this.id = modelEstatusEquipamiento.id || 0;
      this.nombre = modelEstatusEquipamiento.nombre || '';
      this.descripcion = modelEstatusEquipamiento.descripcion || '';
      this.activo = modelEstatusEquipamiento.activo || false;
    }
  }
}
