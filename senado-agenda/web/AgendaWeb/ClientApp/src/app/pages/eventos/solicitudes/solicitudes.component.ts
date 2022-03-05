import {Component, OnInit, ViewChild} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {CalendarioFormComponent} from "../calendario/calendario-form/calendario-form.component";
import {SolicitudFormComponent} from "./solicitud-form/solicitud-form.component";
import {FormGroup} from "@angular/forms";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { BandejaEventoModel } from "../../../models/bandeja-evento.model";
import { BandejaService } from '../../../services/bandejas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  public ListEventosNuevos: BandejaEventoModel[];


  displayedColumns: string[] = ['solicitud', 'tipoEvento', 'espacio', 'solicitante', 'gpoParlamentario', 'opciones'];
  dataSource = new MatTableDataSource<BandejaEventoModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

 
  /*
  * Variables
  * */
  dialogRef: any;
  EnvioPost = false;
  nuevosContador: number;
  aprobadosContador: number;
  rechazadosContador: number;
  tituloTabla: string = 'Nuevas';
  colorHeader: string = 'blue-grey darken-1';

  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private bandejasService: BandejaService,
  ) {
  }

  ngOnInit() {
    this.getNuevos();
    this.getAprobados(2);
    this.getRechazado(3);
  }

  clickNuevos() {
    this.colorHeader = 'blue-grey darken-1';
    this.tituloTabla = 'Nuevas'
    this.getNuevos();
  }

  clickAprobados() {
    this.colorHeader = 'accent';
    this.tituloTabla = 'Aprobadas';
    this.getAprobados(2);
  }

  clickRechazados() {
    this.colorHeader = 'red darken-1';
    this.tituloTabla = 'Rechazadas';
    this.getRechazado(3);
  }

  getNuevos() {
    this.EnvioPost = true;
    this.bandejasService.Httpget("/bandejas/evento").subscribe(async (tempdate) => {
      console.log(tempdate);
      if (tempdate == null) {
        this.nuevosContador = 0;
      } else {
        this.nuevosContador = tempdate.length;
      }
      if (tempdate == null) {
        this.dataSource = new MatTableDataSource<BandejaEventoModel>();
        await this.delay(2000);
        this.EnvioPost = false;
        this.mostrarMensaje("No existen eventos nuevos");
      } else {
        this.dataSource.data = tempdate as BandejaEventoModel[];
        this.dataSource.paginator = this.paginator;
        this.changePage();
        await this.delay(2000);
        this.EnvioPost = false;        
      }

    }
      , async err => {
      });
  }


  getAprobados(id: number) {
    this.EnvioPost = true;
    let modelo: BandejaEventoModel;
    modelo = new BandejaEventoModel();
    this.bandejasService.HttpGet(modelo, "/bandejas/evento/" + id).subscribe(async (tempdate) => {
      console.log(tempdate);
      if (tempdate == null) {
        this.aprobadosContador = 0;
      } else {
        this.dataSource.data = tempdate as unknown as BandejaEventoModel[];
        this.aprobadosContador = this.dataSource.data.length;
      }
      if (this.dataSource.data.length > 0) {
        this.dataSource.data = tempdate as unknown as BandejaEventoModel[];
        this.dataSource.paginator = this.paginator;
        this.changePage();
        await this.delay(2000);
        this.EnvioPost = false;
      } else {
        this.dataSource = new MatTableDataSource<BandejaEventoModel>();
        await this.delay(2000);
        this.EnvioPost = false;
        this.mostrarMensaje("No existen eventos aprobados");
      }

    }
      , async err => {
      });
  }
  getRechazado(id: number) {
    this.EnvioPost = true;
    let modelo: BandejaEventoModel;
    modelo = new BandejaEventoModel();
    this.bandejasService.HttpGet(modelo, "/bandejas/evento/" + id).subscribe(async (tempdate) => {
      console.log(tempdate);
      if (tempdate == null) {
        this.rechazadosContador = 0;
      } else {
        this.dataSource.data = tempdate as unknown as BandejaEventoModel[];
        this.rechazadosContador = this.dataSource.data.length;
      }
      if (this.dataSource.data.length > 0) {
        this.dataSource.data = tempdate as unknown as BandejaEventoModel[];
        this.dataSource.paginator = this.paginator;
        this.changePage();
        await this.delay(2000);
        this.EnvioPost = false;
      } else {
        this.dataSource = new MatTableDataSource<BandejaEventoModel>();
        await this.delay(2000);
        this.EnvioPost = false;
        this.mostrarMensaje("No existen eventos rechazados");
      }

    }
      , async err => {
      });
  }
  toggleSidebar(name): void
  {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  mostrarDetalle(solicitud) {

    this.dialogRef = this._matDialog.open(SolicitudFormComponent, {
      panelClass: 'event-form-dialog',
      data: {
        evento: solicitud,
      }
    });

    this.dialogRef.afterClosed().subscribe(() => {
      });
  }

  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical,
    });

  }

  changePage() {
    setTimeout(function () {
    }, 200);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
