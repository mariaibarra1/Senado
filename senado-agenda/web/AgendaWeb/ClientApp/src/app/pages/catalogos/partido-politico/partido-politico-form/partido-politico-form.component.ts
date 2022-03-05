import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartidoPoliticoModel } from '../../../../models/partido-politico.model';
import { CatalogosService } from '../../../../services/catalogos.service';
import { modelLegislatura } from '../../../../models/modelLegislatura';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-partido-politico-form',
  templateUrl: './partido-politico-form.component.html',
  styleUrls: ['./partido-politico-form.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PartidoPoliticoFormComponent implements OnInit {
  //#region variables
  accion: string;
  pp: PartidoPoliticoModel;
  ppForm: FormGroup;
  titulo: string;
  progressBar = true;
  ListLegislaturas: modelLegislatura[];
  legislatura_m;
  errorLeg = false;
  //#endregion
  constructor(
    public dialogo: MatDialogRef<PartidoPoliticoFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService
  ) {
    this.accion = _data.action;
    if (this.accion === 'editar') {
      this.titulo = 'Editar Partido Político';
      this.pp = _data.model;
    } else {
      this.titulo = 'Nuevo Partido Político';
      this.pp = new PartidoPoliticoModel({});
    }
    this.ppForm = this.crearPPForm();
    this.legislatura_m = this.pp.id_legislatura == 0 ? null : this.pp.id_legislatura;
  }

  crearPPForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.pp.id],
      nombre: [this.pp.nombre],
      siglas: [this.pp.siglas],
      legislatura: [this.pp.id_legislatura]
    });
  }

  ngOnInit() {
    this.obtenerLegislaturas();
  }
  //#region api
  async agregarNuevo(data: FormGroup) {
    let modelo: PartidoPoliticoModel;
    modelo = new PartidoPoliticoModel({});
    modelo.nombre = data.controls.nombre.value;
    modelo.siglas = data.controls.siglas.value;
    modelo.id_legislatura = data.controls.legislatura.value;
    await this.cs.HttpPost(modelo, '/catalogos/partidopolitico').subscribe(data => {
      this.dialogo.close('success');
    }, error => {
        this.dialogo.close('error');
      });
    
  }

  async modificar(data: FormGroup) {
    let modelo: PartidoPoliticoModel;
    modelo = new PartidoPoliticoModel({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.siglas = data.controls.siglas.value;
    modelo.activo = null;
    modelo.id_legislatura = data.controls.legislatura.value;
    await this.cs.HttpPut(modelo, '/catalogos/partidopolitico/' + modelo.id).subscribe(data => {
      this.dialogo.close('success');
    }, error => {
        this.dialogo.close('error');
      });
    
  }

  async obtenerLegislaturas() {
    await this.cs.Httpget('/catalogos/legislatura').subscribe(data => {
      this.ListLegislaturas = data as modelLegislatura[];
      this.progressBar = false;
      this.errorLeg = false;
    }, error => {
        this.errorLeg = true;
      });

  }
  //#endregion
}
