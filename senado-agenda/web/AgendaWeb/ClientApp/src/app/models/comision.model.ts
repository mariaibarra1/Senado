export class ComisionModel {
  id: number;
  nombre: string;
  micrositio: string;
  correo_electronico: string;
  id_ubicacion: number;
  activo: boolean;
  id_legislatura: number;
  id_tipo_comision: number;
  nombreUbicacion: string;
  nombreLegislatura: string;
  descripcionLegislatura: string;
  nombreTipo: string;
  descripcionTipo: string;
  constructor(comisionmodel) {
    this.id = comisionmodel.id || 0;
    this.nombre = comisionmodel.nombre || '';
    this.micrositio = comisionmodel.micrositio || '';
    this.correo_electronico = comisionmodel.correo_electronico || '';
    this.id_ubicacion = comisionmodel.id_ubicacion || 0;
    this.activo = comisionmodel.activo || false;
    this.id_legislatura = comisionmodel.id_legislatura || 0;
    this.id_tipo_comision = comisionmodel.id_tipo_comision || 0;
    this.nombreUbicacion = comisionmodel.nombreUbicacion || '';
    this.nombreLegislatura = comisionmodel.nombreLegislatura || '';
    this.descripcionLegislatura = comisionmodel.descripcionLegislatura || '';
    this.nombreTipo = comisionmodel.nombreTipo || '';
    this.descripcionTipo = comisionmodel.descripcionTipo || '';
  }
}
