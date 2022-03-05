import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComisionUsuarioModel } from '../../../../models/comision-usuario.model';
import { ComisionesService } from '../../../../services/comisiones.service';
import { MatSelectModule } from '@angular/material/select';
import { ComisionModel } from '../../../../models/comision.model';
import { UsuarioModel } from '../../../../models/usuario.model';
import { RolSenadoModel } from '../../../../models/rol-senado.model';
import { CatalogosService } from '../../../../services/catalogos.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface RolesComision {
  id_presidente: number,
  id_secretario: number,
  id_integrante: number,
}

@Component({
  selector: 'app-comisiones-usuario-form',
  templateUrl: './comisiones-usuario-form.component.html',
  styleUrls: ['./comisiones-usuario-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComisionesUsuarioFormComponent implements OnInit {
  //#region variables
  entidad: ComisionModel;
  ListComisiones: ComisionModel[];
  
  ListRol: RolSenadoModel[];
  ListRelacionUsuario: ComisionUsuarioModel[];
  RelacionUsuarioForm: ComisionUsuarioModel;
  nombreComision: string;
  relacionForm: FormGroup;
  progressBar = true;

  errorUsuarioElegidoVacio = false;
  errorUsuarioElegido = false;
  filtradoUsuariosControl = new FormControl();
  public options = [];
  filteredOptions: Observable<string[]>;
  ListUsuarios: UsuarioModel[];
  ListUsuariosbk: UsuarioModel[];
  filteredUsuarios: Observable<UsuarioModel[]>;

  nuevoUsuario: ComisionUsuarioModel;
  rolesComision: RolesComision = { id_integrante: 0, id_presidente: 0, id_secretario:0 };
  ListRolesComision: RolSenadoModel[];
  //#region integrantes
  displayedColumnsIntegrantes: string[] = ['nombre', 'correo', 'rol', 'opciones'];
  dataSourceIntegrantes = new MatTableDataSource<ComisionUsuarioModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  controlIntegrantes = new FormControl();
  //#endregion

  //#endregion
  constructor(
    public dialogo: MatDialogRef<ComisionesUsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private comisionService: ComisionesService,
    private catalogosService: CatalogosService
  ) {
    this.entidad = _data.model;
    this.nombreComision = this.entidad.nombre;
    this.buscarUsuarios(this.entidad.id);
    this.RelacionUsuarioForm = new ComisionUsuarioModel({});
    this.relacionForm = this.crearForm();
  }

  async ngOnInit() {
    this.progressBar = true;
    await this.mostrarTodosUsuarios();
    await this.buscarRolesComision();
    //this.filteredOptions = this.filtradoUsuariosControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    this.filteredUsuarios = this.filtradoUsuariosControl.valueChanges.pipe(startWith(''), map(value => this.filter2(value)))
    
  }


  crearForm(): FormGroup {
    return this.formBuilder.group({
      id_comision: [this.entidad.id],
      id_usuario: [this.RelacionUsuarioForm.id_usuario],
      id_rol: [this.RelacionUsuarioForm.id_rol_senado]
    });
  }
  //#region buscar_filtrar
  async buscarUsuarios(id_comision: number) {
    await this.comisionService.Httpget('/comisiones/comisionusuario/' + id_comision).subscribe((data) => {
      this.ListRelacionUsuario = data as ComisionUsuarioModel[];
      this.dataSourceIntegrantes.data = this.ListRelacionUsuario;
    }, error => {
      this.dataSourceIntegrantes.data = new Array();
    });
  }
  async mostrarTodosUsuarios() {
    await this.catalogosService.Httpget('/usuarios/usuarios').subscribe((data) => {
      this.ListUsuarios = data as UsuarioModel[];
      this.ListUsuariosbk = data as UsuarioModel[];
      this.progressBar = false;
    }, error => {
        console.log(error);
        this.progressBar = false;
      });
  }

  async buscarRolesComision() {
    await this.catalogosService.Httpget('/catalogos/rolsenado').subscribe(async (data) => {
      this.ListRolesComision = data as RolSenadoModel[];
      console.log(this.ListRolesComision);
      console.log(this.ListRolesComision.find(x => x.nombre.includes('residente')).id);
      this.rolesComision.id_presidente = this.ListRolesComision.find(x => x.nombre.toLowerCase().includes('residente')).id;
      this.rolesComision.id_secretario = this.ListRolesComision.find(x => x.nombre.toLowerCase().includes('secret')).id;
      this.rolesComision.id_integrante = this.ListRolesComision.find(x => x.nombre.toLowerCase().includes('inte')).id;
      console.log(this.rolesComision);
    }, error => {
        console.log(error);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private filter2(value: string): UsuarioModel[] {
    value = value.toString().toLowerCase();
    if (this.ListUsuariosbk) {
      return this.ListUsuariosbk.filter(u => u.nombre.toLowerCase().includes(value) || u.apellido_paterno.toLowerCase().includes(value) || u.apellido_materno.toLowerCase().includes(value));
    }
  }
  displayFn(model?: UsuarioModel): string | undefined {
    return model ? model.nombre + ' ' + model.apellido_paterno + ' ' + model.apellido_materno : undefined;
  }
  //#endregion

  async AgregarIntegrantes() {
    var ide = this.filtradoUsuariosControl.value;
    if (ide) {
      this.errorUsuarioElegidoVacio = false;
      if (ide.id) {
        console.log('es un modelo valido');
        this.errorUsuarioElegido = false;
        this.agregarModeloaLista(ide);
      } else {
        console.log('no existe el usuario');
        this.errorUsuarioElegido = true;
      }
    } else {
      console.log('no ingresó un elemento');
      this.errorUsuarioElegidoVacio = true;
    }
  }

  agregarModeloaLista(usuario: UsuarioModel) {
    let datanueva: ComisionUsuarioModel[];
    datanueva = this.dataSourceIntegrantes.data as ComisionUsuarioModel[];
    this.nuevoUsuario = new ComisionUsuarioModel({});
    this.nuevoUsuario.id_usuario = usuario.id;
    this.nuevoUsuario.nombreUsuario = usuario.nombre;
    this.nuevoUsuario.aPaternoUsuario = usuario.apellido_paterno;
    this.nuevoUsuario.aMaternoUsuario = usuario.apellido_materno;
    this.nuevoUsuario.correo = usuario.correo_electronico;
    console.log(this.nuevoUsuario);
    datanueva.push(this.nuevoUsuario);
    this.dataSourceIntegrantes.data = datanueva;
    console.log(this.dataSourceIntegrantes.data);
  }

}
