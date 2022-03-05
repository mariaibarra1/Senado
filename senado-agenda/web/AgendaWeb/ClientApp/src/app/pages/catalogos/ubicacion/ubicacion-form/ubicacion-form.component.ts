import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UbicacionModel } from "../../../../models/ubicacion.model";
import { estMuniLocalidadModel } from "../../../../models/estMuniLocalidad.model";
import { CatalogosService } from '../../../../services/catalogos.service';

import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-ubicacion-form',
  templateUrl: './ubicacion-form.component.html',
  styleUrls: ['./ubicacion-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UbicacionFormComponent {

  public ListEstado: estMuniLocalidadModel[];
  public ListMunicipio: estMuniLocalidadModel[];
  public ListLocalidad: estMuniLocalidadModel[];
  public ListCodigoPostal: estMuniLocalidadModel[];

  accion: string;
  ubicacion: UbicacionModel;
  ubicacionForm: FormGroup;
  titulo: string;

  public id_estado: number = null;
  public id_municipio: number = null;
  public idEstado = "";
  public idMunicipio = "";
  public idLocalidad = "";
  public codigoPostalActive = false;
  EnvioPostCodigoPostal = false;
  sinDatosEstMunLoc = false;

  constructor(
    private _matDialog: MatDialog,
    public dialogo: MatDialogRef<UbicacionFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private catalogosService: CatalogosService
  ) {
    this.accion = _data.action;
    if (this.accion === 'editar') {
      this.titulo = 'Editar ubicación';
      this.ubicacion = _data.model;
    } else {
      this.titulo = 'Nueva ubicación';
      this.ubicacion = new UbicacionModel();
    }
    this.ubicacionForm = this.crearUbicacionForm();
  }

  crearUbicacionForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.ubicacion.id],
      nombre: [this.ubicacion.nombre],
      calle: [this.ubicacion.calle],
      id_estado: [this.ubicacion.id_estado],
      id_municipio: [this.ubicacion.id_municipio],
      id_localidad: [this.ubicacion.id_localidad],
      edificio: [this.ubicacion.edificio],
      piso: [this.ubicacion.piso],
      oficina: [this.ubicacion.oficina],
      codigo_postal: [this.ubicacion.codigo_postal]
    });
  }

  ngOnInit() {
    this.getEstado();
  }

  textChanged(data: FormGroup) {
    if (data.controls.codigo_postal.value != null) {
      if (data.controls.codigo_postal.value.toString().length === 5) {
        this.getCodigoPostal(data.controls.codigo_postal.value);
        this.codigoPostalActive = true;
        this.estadoSearch();
      }
    }
  }

  getCodigoPostal(codigoPostal: number) {
    this.EnvioPostCodigoPostal = true;
    let modelo: estMuniLocalidadModel;
    modelo = new estMuniLocalidadModel();
    modelo.id = codigoPostal;
    modelo.nombre = null; 
    this.catalogosService.HttpGet(modelo, "/catalogos/EstadoMunLocalidad/Codigopostal/" + codigoPostal).subscribe(async (tempdate) => {
      await this.delay(2000);
      this.EnvioPostCodigoPostal = false;
      this.ListCodigoPostal = tempdate as unknown as estMuniLocalidadModel[];
      console.log(this.ListCodigoPostal);
      if (this.ListCodigoPostal.length > 0) {
        this.sinDatosEstMunLoc = false;
        this.idEstado = this.ListCodigoPostal[0].id_estado.toString();
        this.idMunicipio = this.ListCodigoPostal[0].id_municipio.toString();
        this.idLocalidad = this.ListCodigoPostal[0].id.toString();
        this.getMunicipio(this.ListCodigoPostal[0].id_estado);
        this.getLocalidad(this.ListCodigoPostal[0].id_municipio);
        this.getEstado();
      }
      else {
        this.sinDatosEstMunLoc = true;
      }
    }
      , async err => {
      });
  }

  estadoSearch() {
    this.ListEstado = null;
    this.ListMunicipio = null;
    this.ListLocalidad = null;
  }

  getEstado() {
    if (this.accion === 'editar') {
      this.idEstado = this._data.model.id_estado.toString();
      this.idMunicipio = this._data.model.id_municipio.toString();
      this.idLocalidad = this._data.model.id_localidad.toString();
      this.getMunicipio(this._data.model.id_estado);
      this.getLocalidad(this._data.model.id_municipio);
    }
    this.catalogosService.Httpget("/catalogos/EstadoMunLocalidad").subscribe((tempdate) => {
      if (tempdate.length > 0) {
        this.ListEstado = tempdate as estMuniLocalidadModel[];
      } else {
        this.ListEstado = tempdate as estMuniLocalidadModel[];
      }
    }
      , async err => {
      });
  }

  municipioSearch() {
      this.ListMunicipio = null;
    this.ListLocalidad = null;
    if (this.idEstado != "") {
      this.getMunicipio(parseInt(this.idEstado))
    } 
  }
  
  getMunicipio(id: number) {
    let modelo: estMuniLocalidadModel;
    modelo = new estMuniLocalidadModel();
    modelo.id = id;
    modelo.nombre = null; 
    this.catalogosService.HttpGet(modelo, "/catalogos/EstadoMunLocalidad/Municipio/" + id).subscribe((tempdate) => {
      this.ListMunicipio = tempdate as unknown as estMuniLocalidadModel[];
    }
      , async err => {
      });
  }

  localidadSearch() {
    if (this.idMunicipio != "") {
      this.ListLocalidad = null;
      this.getLocalidad(parseInt(this.idMunicipio))
    }
  }

  getLocalidad(id: number) {
    let modelo: estMuniLocalidadModel;
    modelo = new estMuniLocalidadModel();
    modelo.id = id;
    modelo.nombre = null;
    this.catalogosService.HttpGet(modelo,"/catalogos/EstadoMunLocalidad/Localidad/" + id).subscribe((tempdate) => {
      this.ListLocalidad = tempdate as unknown as estMuniLocalidadModel[];
    }
      , async err => {
      });
  }

  async agregarNuevo(data: FormGroup) {
    let modelo: UbicacionModel;
    modelo = new UbicacionModel();
    modelo.nombre = data.controls.nombre.value;
    modelo.calle = data.controls.calle.value;
    modelo.id_estado = data.controls.id_estado.value;
    modelo.id_municipio = data.controls.id_municipio.value;
    modelo.id_localidad = data.controls.id_localidad.value;
    modelo.edificio = data.controls.edificio.value;
    modelo.piso = data.controls.piso.value;
    modelo.oficina = data.controls.oficina.value;
    await this.catalogosService.HttpPost(modelo, '/catalogos/Ubicacion').subscribe(data => {
    });
    this.dialogo.close('success');
   
  }

  async modificar(data: FormGroup) {
    let modelo: UbicacionModel;
    modelo = new UbicacionModel();
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.calle = data.controls.calle.value;
    modelo.id_estado = data.controls.id_estado.value;
    modelo.id_municipio = data.controls.id_municipio.value;
    modelo.id_localidad = data.controls.id_localidad.value;
    modelo.edificio = data.controls.edificio.value;
    modelo.piso = data.controls.piso.value;
    modelo.oficina = data.controls.oficina.value;
    await this.catalogosService.HttpPut(modelo, '/catalogos/Ubicacion/' + modelo.id).subscribe(data => {
    });
    this.dialogo.close('success');
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
