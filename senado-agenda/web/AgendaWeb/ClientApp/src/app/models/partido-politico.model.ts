export class PartidoPoliticoModel {
  id: number;
  nombre: string;
  siglas: string;
  activo: boolean;
  id_legislatura: number;
  legislatura_nombre: string;
  legislatura_descripcion: string;
  tipoOperacion: number;
  constructor(partidopoliticomodel) {
    {
      this.id = partidopoliticomodel.id || 0;
      this.nombre = partidopoliticomodel.nombre || '';
      this.siglas = partidopoliticomodel.siglas || '';
      this.activo = partidopoliticomodel.activo || false;
      this.id_legislatura = partidopoliticomodel.id_legislatura || 0;
      this.legislatura_nombre = partidopoliticomodel.legislatura_nombre || '';
      this.legislatura_descripcion = partidopoliticomodel.legislatura_descripcion || '';
      this.tipoOperacion = partidopoliticomodel.tipoOperacion || 0;
    }
  }
}
