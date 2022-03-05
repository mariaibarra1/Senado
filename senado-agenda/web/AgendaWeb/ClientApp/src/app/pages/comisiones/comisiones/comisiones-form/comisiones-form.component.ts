import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComisionModel } from '../../../../models/comision.model';
import { ComisionesService } from '../../../../services/comisiones.service';
import { CatalogosService } from '../../../../services/catalogos.service';
import { UbicacionModel } from '../../../../models/ubicacion.model';
import { MatSelectModule } from '@angular/material/select';
import { modelLegislatura } from '../../../../models/modelLegislatura';
import { TipoComisionModel } from '../../../../models/tipo-comision.model';

@Component({
  selector: 'app-comisiones-form',
  templateUrl: './comisiones-form.component.html',
  styleUrls: ['./comisiones-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComisionesFormComponent implements OnInit {
  //#region variables
  accion: string;
  com: ComisionModel;
  comForm: FormGroup;
  titulo: string;
  ListUbicaciones: UbicacionModel[];
  public idUbicacion: number;
  progressBar = true;
  ListLegislaturas: modelLegislatura[];
  ListTipoComision: TipoComisionModel[];
  id_legislaturaNG;
  id_tipo_comisionNG;
  id_ubicacionNG;
  errorUb = false;
  errorLeg = false;
  errorTipo = false;
  //#endregion
  constructor(
    public dialogo: MatDialogRef<ComisionesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private coms: ComisionesService,
    private cs: CatalogosService
  ) {
    this.accion = _data.action;
    if (this.accion === 'editar') {
      this.titulo = 'Editar Comisión';
      this.com = _data.model;
      this.idUbicacion = this.com.id_ubicacion;
    } else {
      this.titulo = 'Nueva Comisión';
      this.com = new ComisionModel({});
    }
    this.comForm = this.crearComForm();
    this.id_legislaturaNG = this.com.id_legislatura == 0 ? null : this.com.id_legislatura;
    this.id_tipo_comisionNG = this.com.id_tipo_comision == 0 ? null : this.com.id_tipo_comision;
    this.id_ubicacionNG = this.com.id_ubicacion == 0 ? null : this.com.id_ubicacion;
  }

  crearComForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.com.id],
      nombre: [this.com.nombre],
      micrositio: [this.com.micrositio],
      correo_electronico: [this.com.correo_electronico],
      id_ubicacion: [this.com.id_ubicacion],
      id_legislatura: [this.com.id_legislatura],
      id_tipo_comision: [this.com.id_tipo_comision]
    });
  }

  async ngOnInit() {
    await this.getUbicacion();
    await this.getLegislaturas();
    await this.getTiposComision();
  }
  //#region api
  async getUbicacion() {
    await this.cs.Httpget('/catalogos/ubicacion').subscribe((data) => {
      this.ListUbicaciones = data as UbicacionModel[];
      this.progressBar = false;
    }, err => {
        this.errorUb = true;
    });
  }
  async getLegislaturas() {
    await this.cs.Httpget('/catalogos/legislatura').subscribe((data) => {
      this.ListLegislaturas = data as modelLegislatura[];
      this.progressBar = false;
    }, err => {
        this.errorLeg = true;
    });
  }
  async getTiposComision() {
    await this.cs.Httpget('/catalogos/tipocomision').subscribe((data) => {
      this.ListTipoComision = data as TipoComisionModel[];
      this.progressBar = false;
    }, err => {
        this.errorTipo = true;
    });
  }

  async agregarNuevo(data: FormGroup) {
    let modelo: ComisionModel;
    modelo = new ComisionModel({});
    modelo.nombre = data.controls.nombre.value;
    modelo.micrositio = data.controls.micrositio.value;
    modelo.correo_electronico = data.controls.correo_electronico.value;
    modelo.id_ubicacion = data.controls.id_ubicacion.value;
    modelo.id_legislatura = data.controls.id_legislatura.value;
    modelo.id_tipo_comision = data.controls.id_tipo_comision.value;
    await this.coms.HttpPost(modelo, '/comisiones/comision').subscribe(data => {
      this.dialogo.close('success');
    }, error => {
        this.dialogo.close('error');
      });
  }

  async modificar(data: FormGroup) {
    let modelo: ComisionModel;
    modelo = new ComisionModel({});
    modelo.nombre = data.controls.nombre.value;
    modelo.micrositio = data.controls.micrositio.value;
    modelo.correo_electronico = data.controls.correo_electronico.value;
    modelo.id_ubicacion = data.controls.id_ubicacion.value;
    modelo.activo = null;
    modelo.id = data.controls.id.value;
    modelo.id_legislatura = data.controls.id_legislatura.value;
    modelo.id_tipo_comision = data.controls.id_tipo_comision.value;
    
    await this.coms.HttpPut(modelo, '/comisiones/comision/' + modelo.id).subscribe(data => {
      this.dialogo.close('success');
    }, error => {
        this.dialogo.close('error');
      });

  }
  //#endregion
}
