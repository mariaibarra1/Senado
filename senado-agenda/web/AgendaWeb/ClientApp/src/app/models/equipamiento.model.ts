import { FuseUtils } from '@fuse/utils';
export class EquipamientoModel {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  id_tipo: number;
  id_estatus: number;

  estatus_nombre: string;
  tipo_nombre: string;



  tipoOperacion :number
  constructor(equipamientoModel) {
    {
      this.id = equipamientoModel.id || FuseUtils.generateGUID();
      this.nombre = equipamientoModel.nombre || '';
      this.descripcion = equipamientoModel.descripcion || '';
      this.activo = equipamientoModel.activo ||  false;
      this.tipoOperacion = equipamientoModel.tipoOperacion || 1;
      this.id_estatus = equipamientoModel.id_estatus || 0;
      this.id_tipo = equipamientoModel.id_tipo || 0;
      this.estatus_nombre = equipamientoModel.esatus_nombre || '';
      this.tipo_nombre = equipamientoModel.tipo_nombre || '';
    }
  }
}
