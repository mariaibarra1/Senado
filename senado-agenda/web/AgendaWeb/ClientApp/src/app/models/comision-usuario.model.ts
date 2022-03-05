export class ComisionUsuarioModel {
  id_comision: number;
  id_usuario: number;
  id_rol_senado: number;
  nombreComision: string;
  nombreUsuario: string;
  aPaternoUsuario: string;
  aMaternoUsuario: string;
  rol: string;
  correo: string;
  constructor(comusmodel) {
    this.id_comision = comusmodel.id_comision || 0;
    this.id_usuario = comusmodel.id_usuario || 0;
    this.id_rol_senado = comusmodel.id_rol_senado || 0;
    this.nombreComision = comusmodel.nombreComision || '';
    this.nombreUsuario = comusmodel.nombreUsuario || '';
    this.aPaternoUsuario = comusmodel.aPaternoUsuario || '';
    this.aMaternoUsuario = comusmodel.aMaternoUsuario || '';
    this.rol = comusmodel.rol || '';
    this.correo = comusmodel.correo || '';
  }
}
