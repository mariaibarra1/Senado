import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { EspacioModel } from "../../../../models/espacio.model";
import { EquipamientoModel } from "../../../../models/equipamiento.model";
import { RelEspacioEquipoModel } from "../../../../models/relEspacioEquipo.model";
import { MatSelectModule } from '@angular/material/select';
import { UbicacionModel } from '../../../../models/ubicacion.model';
import { CatalogosService } from '../../../../services/catalogos.service';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-espacios-form',
  templateUrl: './espacios-form.component.html',
  styleUrls: ['./espacios-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EspaciosFormComponent {

  public ListUbicacion: UbicacionModel[];
  public ListEquipamiento: EquipamientoModel[];
  public ListRelEspacioEquipo: RelEspacioEquipoModel[];
  public ListRelEspacioEquipoEliminar: RelEspacioEquipoModel[] = [];
  public ListRelEspacioEquipoInsertar: RelEspacioEquipoModel[] = [];
  public datamodel: EspacioModel = new EspacioModel();

  accion: string;
  espacio: EspacioModel;
  espacioForm: FormGroup;
  titulo: string;
  isCheckedEliminar = true;
  dialogo2: any;
  EnvioPost = false;
  EnvioPostEquipo = false;
  sinDatosUbicacion = false;
  errorUbicacion = false;
  sinDatosEquipo = false;
  errorEquipo = false;
  verDetalles = false;

  Nuevo: boolean = false;
  Modificar: boolean = false;

  public idUbicacion = ""

  constructor(
    private _matDialog: MatDialog,
    public dialogo: MatDialogRef<EspaciosFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private MatSelectModule: MatSelectModule,
    private catalogosService: CatalogosService,
    private router: Router


  ) {
    this.accion = _data.action;
    if (this.accion === 'editar') {
      this.titulo = 'Editar espacio';
      this.espacio = _data.model;
    } else if (this.accion === 'detalles') {
      this.verDetalles = true;
      this.titulo = 'Detalles espacio';
      this.espacio = _data.model;
    } else {
      this.titulo = 'Nuevo espacio';
      this.espacio = new EspacioModel();
    }
    this.espacioForm = this.crearEspacioForm();
  }

  crearEspacioForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.espacio.id],
      nombre: [this.espacio.nombre],
      id_ubicacion: [this.espacio.id_ubicacion],
      capacidad: [this.espacio.capacidad],
    });
  }

  ngOnInit() {
    this.getUbicacion();
    this.showAllEquipamiento();
    if (this.accion === 'editar' || this.accion === 'detalles') {
      this.Modificar = true;
      this.Nuevo = false;
      this.getRelEspacioEquipo(this._data.model.id);
    } else {
      this.Nuevo = true;
      this.Modificar = false;
      this.showAllEquipamiento();
    }
  }


  getUbicacion() {
    this.EnvioPost = true;
    if (this.accion === 'editar' || this.accion === 'detalles') {
      this.idUbicacion = this._data.model.id_ubicacion.toString();
    }
    this.catalogosService.Httpget("/catalogos/Ubicacion").subscribe(async (tempdate) => {
      this.errorUbicacion = false;
      await this.delay(2000);
      this.EnvioPost = false;
      if (tempdate.length > 0) {
        this.ListUbicacion = tempdate as UbicacionModel[];
        for (var i = 0; i < this.ListUbicacion.length; i++) {
          if (this.ListUbicacion[i].activo === false) {
            this.ListUbicacion.splice(i,1);
          }
        }
        if (this.ListUbicacion.length < 1) {
          this.sinDatosUbicacion = true;
        } else {
          this.sinDatosUbicacion = false;
        }       
      } 
    }, async err => {
        this.errorUbicacion = true;
      });
  }

  getRelEspacioEquipo(id: number) {
    this.catalogosService.Httpget("/catalogos/RelEspacioEquipo/" + id).subscribe((tempdate) => {
     if (tempdate.length > 0) {
       this.ListRelEspacioEquipo = tempdate as RelEspacioEquipoModel[];
     } else {
       this.ListRelEspacioEquipo = tempdate as RelEspacioEquipoModel[];
      }
    }
      , async err => {
    });
  }

  showAllEquipamiento() {
    this.EnvioPostEquipo = true;
    this.catalogosService.Httpget('/catalogos/equipamiento/').subscribe(async data => {
      this.errorEquipo = false;
      await this.delay(2000);
      this.EnvioPostEquipo = false;
      this.ListEquipamiento = data as EquipamientoModel[];
      if (this.ListEquipamiento.length > 0) {
        //for (var i = 0; i < this.ListEquipamiento.length; i++) {
        //  if (this.ListEquipamiento[i].activo === false) {
        //    this.ListEquipamiento.splice(i, 1);
        //  }
        //}
        //debugger;
        if (this.ListEquipamiento.length < 1) {
          this.sinDatosEquipo = true;
        } else {
          this.sinDatosEquipo = false;
        }
      }
    }, async err => {
      this.errorEquipo = true;
    });
  }

  
  async agregarNuevo(dataForm: FormGroup) {
    var id;
    let modelo: EspacioModel;
    modelo = new EspacioModel();
    var prueba: EspacioModel[];
    modelo.nombre = dataForm.controls.nombre.value;
    modelo.id_ubicacion = dataForm.controls.id_ubicacion.value;
    modelo.capacidad = dataForm.controls.capacidad.value;
    await this.catalogosService.HttpPost(modelo, '/catalogos/Espacio').subscribe(data => {
      this.datamodel = data as EspacioModel;
      id = this.datamodel.id;

      let modeloRelacion: RelEspacioEquipoModel;
      modeloRelacion = new RelEspacioEquipoModel();

      for (var i = 0; i < this.ListEquipamiento.length; i++) {
        if (this.ListEquipamiento[i].tipoOperacion == 1) {
          modeloRelacion.id_equipo = this.ListEquipamiento[i].id;
          modeloRelacion.id_espacio = this.datamodel.id;
          this.catalogosService.HttpPost(modeloRelacion, '/catalogos/RelEspacioEquipo').subscribe(data => {
          });
        }
      }
    });
    this.dialogo.close('success');
  }

  async modificar(data: FormGroup) {
    for (var i = 0; i < this.ListRelEspacioEquipo.length; i++) {
      if (this.ListRelEspacioEquipo[i].exist == 1 && this.ListRelEspacioEquipo[i].activo == true) {
        this.ListRelEspacioEquipoInsertar.push(this.ListRelEspacioEquipo[i]);
      } else {
        this.ListRelEspacioEquipoEliminar.push(this.ListRelEspacioEquipo[i]);
      }
    }

    let modelo: EspacioModel;
    modelo = new EspacioModel();
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.id_ubicacion = data.controls.id_ubicacion.value;
    modelo.capacidad = data.controls.capacidad.value;
    modelo.activo = null;
    await this.catalogosService.HttpPut(modelo, '/catalogos/Espacio').subscribe(data => {

    });


    if (this.ListRelEspacioEquipoInsertar.length > 0) {
      let modeloRelacionInsertar: RelEspacioEquipoModel;
      modeloRelacionInsertar = new RelEspacioEquipoModel();

      for (var i = 0; i < this.ListRelEspacioEquipoInsertar.length; i++) {
          modeloRelacionInsertar.id_equipo = this.ListRelEspacioEquipoInsertar[i].id_equipo;
          modeloRelacionInsertar.id_espacio = this.ListRelEspacioEquipoInsertar[i].id_espacio;
          this.catalogosService.HttpPost(modeloRelacionInsertar, '/catalogos/RelEspacioEquipo').subscribe(data => {
          });
      }
    }

    if (this.ListRelEspacioEquipoEliminar.length > 0) {
      let modeloRelacionEliminar: RelEspacioEquipoModel;
      modeloRelacionEliminar = new RelEspacioEquipoModel();

      for (var i = 0; i < this.ListRelEspacioEquipoEliminar.length; i++) {
          modeloRelacionEliminar.id_equipo = this.ListRelEspacioEquipoEliminar[i].id_equipo;
          modeloRelacionEliminar.id_espacio = this.ListRelEspacioEquipoEliminar[i].id_espacio;
          this.catalogosService.HttpPut(modeloRelacionEliminar, '/catalogos/RelEspacioEquipo').subscribe(data => {
          });
      }
    }

    this.dialogo.close('success');
  }


  selectunselectEquipo(menuSelected: number) {
    this.ListEquipamiento[menuSelected].tipoOperacion = this.ListEquipamiento[menuSelected].tipoOperacion > 0 ? 0 : 1;
  }

  selectunselectEquipoEdit(menuSelected: number) {
    this.ListRelEspacioEquipo[menuSelected].exist = this.ListRelEspacioEquipo[menuSelected].exist > 0 ? 0 : 1;
  }

  ubicacionRoute() {
    this.router.navigateByUrl('/catalogos/ubicacion');
    this.dialogo.close();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
