import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { RolSenadoModel } from "../../../../models/rol-senado.model";
import { CatalogosService } from '../../../../services/catalogos.service';
import { debug } from 'util';

@Component({
  selector: 'app-rol-senado-form',
  templateUrl: './rol-senado-form.component.html',
  styleUrls: ['./rol-senado-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RolSenadoFormComponent implements OnInit {

  accion: string;
  rolsenado: RolSenadoModel;
  rolsenadoForm: FormGroup;
  titulo: string;

  constructor(
      public dialogo: MatDialogRef<RolSenadoFormComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private formBuilder: FormBuilder,
      private catalogosService: CatalogosService
  ) {

    this.accion = _data.action;

      if (this.accion === 'editar') {

          this.titulo = 'Editar rol';
          this.rolsenado = _data.model;

      } else {

          this.titulo = 'Nuevo rol';
          this.rolsenado = new RolSenadoModel({});
      }

      this.rolsenadoForm = this.crearSenadoForm();

  }

  crearSenadoForm(): FormGroup
  {
      return this.formBuilder.group({
      id          : [this.rolsenado.id],
      nombre      : [this.rolsenado.nombre],
      descripcion : [this.rolsenado.descripcion],
    });
    }

    editarSenadoForm(): FormGroup {
        return this.formBuilder.group({
            id: [this.rolsenado.id],
            nombre: [this.rolsenado.nombre],
            descripcion: [this.rolsenado.descripcion],
            activo : [this.rolsenado.activo]
        });
    }

    ngOnInit() {
    }

    async agregarNuevo(data: FormGroup) {
        let modelo: RolSenadoModel;
        modelo = new RolSenadoModel({});
        modelo.nombre = data.controls.nombre.value;
        modelo.descripcion = data.controls.descripcion.value;
        await this.catalogosService.HttpPost(modelo, '/catalogos/rolsenado').subscribe(data => {

        });
        this.dialogo.close('success');
    }
    async editar(data: FormGroup) {
        let modelo: RolSenadoModel;
        modelo = new RolSenadoModel({});
        modelo.id = data.controls.id.value;
        modelo.nombre = data.controls.nombre.value;
        modelo.descripcion = data.controls.descripcion.value;

        await this.catalogosService.HttpPut(modelo, '/catalogos/rolsenado/' + modelo.id).subscribe(data => {

        });
        this.dialogo.close('success');
    }

}
