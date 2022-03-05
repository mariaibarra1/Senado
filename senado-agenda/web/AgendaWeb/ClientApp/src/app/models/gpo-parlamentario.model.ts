import {FuseUtils} from '@fuse/utils';

export class GpoParlamentarioModel {
  id: number;
  nombre: string;
  nombre_partido: string;
  activo: boolean;
  id_legislatura: number;
  nombre_legislatura: string;
  partidos: string[];

  constructor(gpoparlamentarioModel) {
    {
      this.id = gpoparlamentarioModel.id || 0;
      this.nombre = gpoparlamentarioModel.nombre || '';
      this.nombre_partido = gpoparlamentarioModel.nombre_partido || '';
      this.activo = gpoparlamentarioModel.activo || false;
      this.id_legislatura = gpoparlamentarioModel.id_legislatura || 0;
      this.nombre_legislatura = gpoparlamentarioModel.nombre_legislatura || '';
      this.partidos = gpoparlamentarioModel.partidos || [];
    }
  }
}
