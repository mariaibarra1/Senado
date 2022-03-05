export class UsuarioModel {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  id_rol_web: number;
  correo_electronico: string;
  id_gpo_parlamentario: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  activo: boolean;
  telefono: string;
  extension: string;
  rolweb: string;
  gpopar: string;

  constructor(rolusuariosModel) {
    {
      this.id = rolusuariosModel.id || 0;
      this.nombre = rolusuariosModel.nombre || '';
      this.apellido_paterno = rolusuariosModel.apellido_paterno || '';
      this.apellido_materno = rolusuariosModel.apellido_materno || '';
      this.id_rol_web = rolusuariosModel.id_rol_web || 0;
      this.correo_electronico = rolusuariosModel.correo_electronico || '';
      this.id_gpo_parlamentario = rolusuariosModel.id_gpo_parlamentario || 0;
      this.fecha_creacion = rolusuariosModel.fecha_creacion || Date.now;
      this.fecha_actualizacion = rolusuariosModel.fecha_actualizacion || Date.now;
      this.activo = rolusuariosModel.activo || false;
      this.telefono = rolusuariosModel.telefono || 0;
      this.extension = rolusuariosModel.extension || '';
      this.rolweb = rolusuariosModel.rolweb || '';
      this.gpopar = rolusuariosModel.gpopar || '';
    }
  }
}
