import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {CatalogosService} from '../../../services/catalogos.service';
import {EquipamientoFormComponent} from './equipamiento-form/equipamiento-form.component';
import {EquipamientoModel} from '../../../models/equipamiento.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FuseWidgetComponent} from '../../../../@fuse/components/widget/widget.component'
import {fuseAnimations} from "../../../../@fuse/animations";
import {modelTipoEquipamento} from '../../../models/modelTipoEquipamento';
import {modelEstatusEquipamento} from '../../../models/estatusquipamientomodel';
import {MatSort} from "@angular/material/sort";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";

interface Equipamiento {

  estatus_nombre: string
  count: number
}

@Component({
  selector: 'app-equipamiento',
  templateUrl: './equipamiento.component.html',
  styleUrls: ['./equipamiento.component.scss'],
  animations: fuseAnimations

})
export class EquipamientoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'estatus_nombre', 'tipo_nombre', 'opciones'];
  dataSource = new MatTableDataSource<EquipamientoModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  equipamiento: EquipamientoModel
  dialogo: any;
  progressBar = true;
  public listEquiposInfo: Equipamiento[] = [];
  public listtipoEquipamiento: modelTipoEquipamento[] = [];
  public listEstatusEquipamiento: modelEstatusEquipamento[] = [];
  /*
*
* SnackBar - Presentación de mensajes de éxito y error
*
* */
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cs: CatalogosService,
    private changeDetectorRef: ChangeDetectorRef,
    private _fuseSidebarService: FuseSidebarService,
  ) {
  }

  ngOnInit() {
    this.showalltipoEquipamiento();
    this.showallEstatusEquipamiento();
    this.showAllEquipamiento();
  }

  async infoequipamiento() {

    this.listEquiposInfo = [];

    this.listtipoEquipamiento.forEach(function (EE) {

      var obj = this.dataSource.data.filter(a => a.id_tipo == EE.id && a.activo == true);

      let equipoinfo: Equipamiento = {estatus_nombre: EE.nombre, count: obj.length};

      this.listEquiposInfo.push(equipoinfo);

      this.changeDetectorRef.detectChanges();

    }.bind(this));
  }


  agregarEquipamiento(): void {

    this.dialogo = this._matDialog.open(EquipamientoFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });

    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.showAllEquipamiento();
      } else if (response == 'error') {
        this.mostrarMensaje('Ocurrió un error');
      }

      if (!response) {
        return;
      }
    });
  }

  EditarEquipamiento(equipamiento): void {

    this.dialogo = this._matDialog.open(EquipamientoFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'editar',
        equipamiento: equipamiento
      }
    });

    this.dialogo.afterClosed().subscribe(async (response: string) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.showAllEquipamiento();

      } else {
        this.mostrarMensaje('Ocurrió un error');
      }


      if (!response) {
        return;

      }

    });
  }

  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical
    });
  }

  //#endregion
  //#region service
  showAllEquipamiento() {

    this.cs.Httpget('/catalogos/equipamiento').subscribe(
      async data => {
        this.dataSource.data = data as EquipamientoModel[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.infoequipamiento();
        this.progressBar = false;
      });
 
  }

  async showalltipoEquipamiento() {
    await this.cs.Httpget('/catalogos/TipoEquipamiento').subscribe(data => {
      this.listtipoEquipamiento = data as modelTipoEquipamento[];
    })
  }

  async showallEstatusEquipamiento() {
    await this.cs.Httpget('/catalogos/EstatusEquipamento').subscribe(data => {
      this.listEstatusEquipamiento = data as modelEstatusEquipamento[];


    })
  }


  async deshabilitar(id: number) {

    let model: EquipamientoModel;
    model = new EquipamientoModel({});
    model.id = id;
    this.cs.HttpDelete(model, '/catalogos/equipamiento/' + id).subscribe(async data => {
      this.mostrarMensaje('Deshabilitado correctamente');
      this.progressBar = true;
      await this.showAllEquipamiento();
    }, error => {
      this.mostrarMensaje('Ocurrió un error al deshabilitar el registro');
    });
  }

  async habilitar(element: EquipamientoModel) {

    let model: EquipamientoModel;
    model = new EquipamientoModel({});
    model.id = element.id;
    model.nombre = null;
    model.descripcion = null;
    model.activo = true;
    model.id_estatus = null
    model.id_tipo = null;
    model.estatus_nombre = '';
    model.tipo_nombre = '';
    this.cs.HttpPut(model, '/catalogos/equipamiento/' + model.id).subscribe(async data => {
      this.mostrarMensaje('Habilitado correctamente');
      this.progressBar = true;
      await this.showAllEquipamiento();
    }, error => {
      this.mostrarMensaje('Ocurrió un error al habilitar el registro');
    });
  }

  changePage() {

    setTimeout(function () {

    }, 200);

  }

  filtrar(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();
    }
  }

  toggleSidebar(name): void
  {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
