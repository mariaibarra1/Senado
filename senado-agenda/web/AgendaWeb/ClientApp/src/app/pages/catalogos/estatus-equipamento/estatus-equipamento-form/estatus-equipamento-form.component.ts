import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modelEstatusEquipamiento } from '../../../../models/modelEstatusEquipamiento';
import { CatalogosService } from '../../../../services/catalogos.service';

@Component({
    selector: 'app-estatus-equipamento-form',
    templateUrl: './estatus-equipamento-form.component.html',
    styleUrls: ['./estatus-equipamento-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EstatusEquipamentoFormComponent implements OnInit {
    accion: string;
    modelEEquipamiento: modelEstatusEquipamiento;
    eEquipamientoForm: FormGroup;
    titulo: string;
    progressBar = true;
      constructor(
        public dialogo: MatDialogRef<EstatusEquipamentoFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private formBuilder: FormBuilder,
        private cs: CatalogosService
      ) {
        this.accion = _data.action;
        if (this.accion === 'editar') {
          this.titulo = 'Editar Estatus Equipamiento';
          this.modelEEquipamiento = _data.model;
        } else {
          this.titulo = 'Nuevo Estatus Equipamiento';
          this.modelEEquipamiento = new modelEstatusEquipamiento({});
        }
        this.eEquipamientoForm = this.crearEEquipamientoForm();
  }
  crearEEquipamientoForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.modelEEquipamiento.id],
      nombre: [this.modelEEquipamiento.nombre],
      descripcion: [this.modelEEquipamiento.descripcion],
    });
  }
  ngOnInit() {
    
  }
  async agregar(data: FormGroup) {
    this.progressBar = true;
    let modelo: modelEstatusEquipamiento;
    modelo = new modelEstatusEquipamiento({});
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    await this.cs.HttpPost(modelo, '/catalogos/EstatusEquipamento').subscribe(data => {
      this.progressBar = false;
      this.dialogo.close('success');
    }, error => {
      this.progressBar = false;
      this.dialogo.close('error');
    });

  }
  async modificar(data: FormGroup) {
    this.progressBar = true;
    let modelo: modelEstatusEquipamiento;
    modelo = new modelEstatusEquipamiento({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.activo = null;
    await this.cs.HttpPut(modelo, '/catalogos/EstatusEquipamento/' + modelo.id).subscribe(data => {
      this.progressBar = false;
      this.dialogo.close('success');
    }, error => {
      this.progressBar = false;
      this.dialogo.close('error');
    });

  }



}
