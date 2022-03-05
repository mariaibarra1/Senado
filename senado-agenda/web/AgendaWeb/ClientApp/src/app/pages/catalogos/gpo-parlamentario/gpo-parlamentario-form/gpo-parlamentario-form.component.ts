import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GpoParlamentarioModel } from "../../../../models/gpo-parlamentario.model";
import { CatalogosService } from '../../../../services/catalogos.service';
import { PartidoPoliticoModel } from '../../../../models/partido-politico.model';
import { RelGrupoPartidoModel } from '../../../../models/relGrupoPartido.model';
import {modelLegislatura } from '../../../../models/modelLegislatura';


@Component({
    selector: 'app-gpo-parlamentario-form',
    templateUrl: './gpo-parlamentario-form.component.html',
    styleUrls: ['./gpo-parlamentario-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GpoParlamentarioFormComponent {


    datamodel: GpoParlamentarioModel = new GpoParlamentarioModel({});
    ListaPartidos: PartidoPoliticoModel[];
    ListaRelGrupoPartidos: RelGrupoPartidoModel[];
    ListaGpoParlamentario: GpoParlamentarioModel[];
    ListaLegislatura: modelLegislatura[];
    ListRelGrupoPartido: RelGrupoPartidoModel[];
    ListaPartidoAsignado: RelGrupoPartidoModel[];

    public ListRelGrupoPartidoEliminar: RelGrupoPartidoModel[] = [];
    public ListRelGrupoPartidoInsertar: RelGrupoPartidoModel[] = [];
   
    gpoparlamentario: GpoParlamentarioModel;
    gpoParlamentarioForm: FormGroup;
    accion: string;
    titulo: string;
    Asignado: boolean = false;
    progressBar = true;
    sinDatosPartido = false;
    errorPartido = false;

    constructor(
        public dialogo: MatDialogRef<GpoParlamentarioFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private formBuilder: FormBuilder,
        private cs: CatalogosService
    ) {

        this.accion = _data.action;

        if (this.accion === 'editar') {

            this.titulo = 'Editar Grupo Parlamentario';
            this.gpoparlamentario = _data.model;

        } else {

            this.titulo = 'Nuevo Grupo Parlamentario';
            this.gpoparlamentario = new GpoParlamentarioModel({});
        }

        this.gpoParlamentarioForm = this.creargpoParlamentarioForm();
    }

    creargpoParlamentarioForm(): FormGroup {
        return this.formBuilder.group({
            id: [this.gpoparlamentario.id],
            nombre: [this.gpoparlamentario.nombre],
            id_legislatura: [this.gpoparlamentario.id_legislatura],
        });
    }

    ngOnInit() {
        this.showAllPartidosPoliticos();
        this.showAllLegislatura();       
        if (this.accion === 'editar') {
            this.Asignado = false;
            this.getRelGrupoPartido(this._data.model.id);
        } else {
            this.Asignado = false;
            this.showAllPartidosPoliticos();
            this.showAllLegislatura();
        }
    }
    //#region api
    async agregarNuevo(data: FormGroup) {
        debugger;
        let modelo: GpoParlamentarioModel;
        modelo = new GpoParlamentarioModel({});
        modelo.nombre = data.controls.nombre.value;
        modelo.id_legislatura = data.controls.id_legislatura.value;
        modelo.activo = false;
        modelo.nombre_legislatura = '';
        modelo.nombre_partido = '';
      
        await this.cs.HttpPost(modelo, '/catalogos/gpoparlamentario').subscribe(async data => {
            this.datamodel = data as GpoParlamentarioModel;
            let modeloRelacion: RelGrupoPartidoModel;
            modeloRelacion = new RelGrupoPartidoModel({});
            for (var i = 0; i < this.ListaPartidos.length; i++) {
                if (this.ListaPartidos[i].tipoOperacion == 1) {
                    modeloRelacion.id_partido_politico = this.ListaPartidos[i].id;
                    modeloRelacion.id_gpo_parlamentario = this.datamodel.id;
                    modeloRelacion.nombre_grupo = "";
                    modeloRelacion.nombre_partido = "";
                   await  this.cs.HttpPost(modeloRelacion, '/catalogos/relgrupopartido').subscribe(async temple=> {
                        this.dialogo.close('success');
                    },
                        async error => {
                            this.dialogo.close('Ocurrió un error al ejecutar la acción');
                        });
                }
            }
                this.dialogo.close('success');
            },
            async error => {
                this.dialogo.close('Ocurrió un error al ejecutar la acción');
                });   
    }

    async modificar(data: FormGroup) {

        for (var i = 0; i < this.ListRelGrupoPartido.length; i++) {
            if (this.ListRelGrupoPartido[i].tipoOperacion == 1 ) {
                this.ListRelGrupoPartidoInsertar.push(this.ListRelGrupoPartido[i]);
            } else {
                this.ListRelGrupoPartidoEliminar.push(this.ListRelGrupoPartido[i]);
            }
        }
        let modelo: GpoParlamentarioModel;
        modelo = new GpoParlamentarioModel({});
        modelo.id = data.controls.id.value;
        modelo.nombre = data.controls.nombre.value;
        modelo.id_legislatura = data.controls.id_legislatura.value;
        modelo.activo = null;
        try {
            await this.cs.HttpPut(modelo, '/catalogos/gpoparlamentario/' + modelo.id).subscribe(data => {});

            this.dialogo.close('success');
        } catch  {

            this.dialogo.close('error');
        }


    }

    async showAllPartidosPoliticos() {
        this.progressBar = true;
      await this.cs.Httpget('/catalogos/partidopolitico/').subscribe(async data => {
            this.errorPartido = false;
            await this.delay(2000);
            this.progressBar = false;
            this.ListaPartidos = data as PartidoPoliticoModel[];
            if (this.ListaPartidos.length > 0) {
                for (var i = 0; i < this.ListaPartidos.length; i++) {
                    if (this.ListaPartidos[i].activo === false) {                       
                        this.ListaPartidos.splice(i, 1);                        
                    }                  
                }
                if (this.ListaPartidos.length < 1) {
                    this.sinDatosPartido = true;
                } else {
                    this.sinDatosPartido = false;
                }
            }
        }, async err => {
                this.errorPartido = true;
        });
    }

    async showAllLegislatura() {
        await this.cs.Httpget('/catalogos/legislatura').subscribe(data => {
            this.ListaLegislatura = data as modelLegislatura[];
            if (this.ListaLegislatura.length > 0) {
                for (var i = 0; i < this.ListaLegislatura.length; i++) {
                    if (this.ListaLegislatura[i].activo === false) {
                        this.ListaLegislatura.splice(i, 1);
                    }
                }
            }
        });
    }

    getRelGrupoPartido(id: number) {
        this.cs.Httpget("/catalogos/RelGrupoPartidos/").subscribe((data) => {
            if (data.length > 0) {
                this.ListaRelGrupoPartidos = data as RelGrupoPartidoModel[];
            } else {
                this.ListaRelGrupoPartidos = data as RelGrupoPartidoModel[];
            }
        });
    }
 

    selectunselectPartido(menuSelected: number) {
        this.ListaPartidos[menuSelected].tipoOperacion = this.ListaPartidos[menuSelected].tipoOperacion > 0 ? 0 : 1;
    }

    //selectunselectPartidoEdit(menuSelected: number) {
    //    this.ListaRelGrupoPartidos[menuSelected].asignado = this.ListaRelGrupoPartidos[menuSelected].asignado > 0 ? 0 : 1;
    //}

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
