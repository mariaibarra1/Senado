import { FuseUtils } from '@fuse/utils';

export class UbicacionModel {
  id: number;
  nombre: string;
  calle: string;
  id_estado: number;
  id_municipio: number;
  id_localidad: number;
  nombreEstado: string;
  nombreMunicipio: string;
  nombreLocalidad: string;
  activo: boolean;
  edificio: string;
  piso: number;
  oficina: string;
  codigo_postal: number;

  //constructor(ubicacionModel) {
  //  {
  //    this.id = ubicacionModel.id || FuseUtils.generateGUID();
  //    this.calle = ubicacionModel.nombre || '';
  //    this.ubicacion = ubicacionModel.ubicacion || '';
  //    this.colonia = ubicacionModel.capacidad || '';
  //  }
  //}
}
