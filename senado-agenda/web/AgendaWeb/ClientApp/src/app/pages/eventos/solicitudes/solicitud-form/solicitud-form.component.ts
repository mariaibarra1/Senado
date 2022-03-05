import { Component, Inject, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { MatColors } from "../../../../../@fuse/mat-colors";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { CalendarEvent } from 'angular-calendar';
import { EventoModel } from "../../../../models/evento.model";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CatalogosService } from '../../../../services/catalogos.service';
import { modelTipoEvento } from '../../../../models/modelTipoEvento';
import { UbicacionModel } from '../../../../models/ubicacion.model';
import { ComisionModel } from '../../../../models/comision.model';
import { modelServicios } from '../../../../models/modelServicios';
import { UsuarioModel } from '../../../../models/usuario.model';
import { MatTableDataSource, MatPaginator, MatSlideToggleChange } from '@angular/material';
import { EventoInvitadoModel } from '../../../../models/eventoinvitado.model';
import { AuthService, MSUser } from '../../../../services/auth.service';
import { EspacioModel } from '../../../../models/espacio.model';
import { Client } from "@microsoft/microsoft-graph-client";
import { EventoUsuarioModel } from '../../../../models/eventousuario.model';
import { EventoservicioModel } from '../../../../models/eventoservicio.model';

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SolicitudFormComponent implements OnInit {

  dialogTitle: string = 'Detalle de evento';

  usuario: MSUser = new MSUser();
  /*Integrantes*/
  displayedColumns: string[] = ['nombre', 'correo', 'opciones'];
  dataSource = new MatTableDataSource<UsuarioModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  /*Invitados*/
  displayedColumnsInvitados: string[] = ['nombre', 'correo', 'opciones'];
  dataSourceInvitados = new MatTableDataSource<EventoInvitadoModel>();
  @ViewChild(MatPaginator, null) paginatorInvitados: MatPaginator;

  myControl = new FormControl();

  NombreInvi = new FormControl();
  CorreoInvi = new FormControl();
  public options = [];
  filteredOptions: Observable<string[]>;
  /*************/

  action: string;
  event: CalendarEvent;
  evento: EventoModel;
  eventForm: FormGroup;
  presetColors = MatColors.presets;
  public ListTE: modelTipoEvento[];
  public ListUb: EspacioModel[];
  public ListC: ComisionModel[];
  public ListS: modelServicios[];
  public ListU: UsuarioModel[];
  public listInt: UsuarioModel[] = [];
  public listInvi: EventoInvitadoModel[] = [];
  public listSer: modelServicios[] = [];


  constructor(
    public matDialogRef: MatDialogRef<SolicitudFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private cs: CatalogosService,
    private _authService: AuthService
  ) {
    this.event = _data.event;
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = this.event.title;

    } else {

      this.dialogTitle = 'Agregar evento';

      this.event = new EventoModel({

        start: _data.date,
        end: _data.date
      });
      this.evento = new EventoModel({});
    }

    this.eventForm = this.createEventForm();
  }

  ngOnInit() {
    //PRUEBAS
    this.showAlltipoEvento();
    this.showAllUbicacion();
    this.showAllComisiones();
    this.showAllServicios();
    this.showAllUsuarios();
    this.getUserData();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this._filter(value))
      );
  }

  disabledagrega(data: FormGroup): boolean {

    if (data.invalid == false && this.dataSource.data.length > 0 && this.dataSourceInvitados.data.length > 0 && this.listSer.length > 0) {
      return false;
    }
    else {

      return true
    }
  }
  createEventForm(): FormGroup {
    return this._formBuilder.group({

      //title: new FormControl(this.event.title),
      //start: new FormControl(this.event.start),
      //end: new FormControl(this.event.end),
      //allDay: new FormControl(this.event.allDay),
      //color: this._formBuilder.group({
      //  primary: new FormControl(this.event.color.primary),
      //  secondary: new FormControl(this.event.color.secondary)
      //}),
      //meta:
      //  this._formBuilder.group({
      //    location: new FormControl(this.event.meta.location),
      //    notes: new FormControl(this.event.meta.notes)
      //  }),
      nombre: [this.evento.nombre],
      descripcion: [this.evento.descripcion],
      id_tipo_evento: [this.evento.id_tipo_evento],
      id_comision: [this.evento.id_comision],
      id_espacio: [this.evento.id_espacio],
      fecha_inicio: [this.evento.fecha_inicio],
      hora_inicio: [this.evento.hora_inicio],
      fecha_fin: [this.evento.fecha_fin],
      hora_fin: [this.evento.hora_fin],
      privado: [this.evento.privado],
      aprobado: [this.evento.aprobado],
      allday: [this.evento.allday]
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async showAlltipoEvento() {

    await this.cs.Httpget('/catalogos/tipoevento').subscribe(data => {


      this.ListTE = data as modelTipoEvento[];

    });
  }

  async showAllUbicacion() {

    await this.cs.Httpget('/catalogos/Espacio').subscribe(data => {


      this.ListUb = data as EspacioModel[];

    });
  }
  async showAllComisiones() {

    await this.cs.Httpget('/comisiones/comision/').subscribe(data => {


      this.ListC = data as ComisionModel[];

    });
  }

  async showAllServicios() {

    await this.cs.Httpget('/catalogos/Servicios').subscribe(data => {


      this.ListS = data as modelServicios[];

    });
  }

  async showAllUsuarios() {

    await this.cs.Httpget('/usuarios/Usuarios').subscribe(data => {
      this.ListU = data as UsuarioModel[];

      data.forEach(function (value, index, array) {

        var id = value.id;
        var usuario = '' + value.nombre + ' ' + value.apellido_paterno + ' ' + value.apellido_materno + '';

        this.options.push(usuario);



      }.bind(this));



    });
  }

  async AgregarIntegrantes() {
    var x = this.myControl.value.split(' ')
    var usuario = this.ListU.filter(option => option.nombre.toLowerCase().includes(x[0]));
    if (this.listInt.filter(a => a.nombre.toLowerCase().includes(usuario[0].nombre)).length == 0) {
      this.listInt.push(usuario[0]);
      this.dataSource.data = this.listInt;
    }
  }

  async EliminarIntegrantes(Element) {
    const index: number = this.listInt.indexOf(Element);
    if (index !== -1) {
      this.listInt.splice(index, 1);
    }
    this.dataSource.data = this.listInt;

  }

  async AgregarInvitados() {
    var nombre = this.NombreInvi.value;
    var correo = this.CorreoInvi.value;


    if (this.listInvi.filter(a => a.correo_electronico.toLowerCase().includes(correo)).length == 0) {

      let invi: EventoInvitadoModel;

      invi = { id_evento: 0, nombre: nombre, correo_electronico: correo }


      this.listInvi.push(invi);
      this.dataSourceInvitados.data = this.listInvi;
    }
  }

  async EliminarInvitados(Element) {
    const index: number = this.listInvi.indexOf(Element);
    if (index !== -1) {
      this.listInvi.splice(index, 1);
    }
    this.dataSourceInvitados.data = this.listInvi;

  }

  async AgregarServicios(Element, event: MatSlideToggleChange) {

    if (event.checked == true) {
      if (this.listSer.filter(a => a.nombre.toLowerCase().includes(Element.nombre)).length == 0) {
        this.listSer.push(Element);

      }
    }
    else {

      this.EliminarServicios(Element);
    }
  }

  async EliminarServicios(Element) {
    const index: number = this.listSer.indexOf(Element);
    if (index !== -1) {
      this.listSer.splice(index, 1);
    }

  }

  async getUserData() {

    this.usuario = await this._authService.getUser() || new MSUser();

    console.log(this.usuario);
  }

  async agregarNuevo(data: FormGroup) {

    console.log(data.value)
    debugger;
    var modelo = data.value as EventoModel;

    var idevento;
    await this.cs.HttpPost(modelo, '/evento/Evento').subscribe(data => {
      console.log(data);

    });
    var int: EventoInvitadoModel;
    int.id_evento = 0;
    var invi: EventoUsuarioModel;
    invi.id_evento = 0;
    var ser: EventoservicioModel;
    ser.id_evento = 0;

    this.listInt.forEach(function (value) {

      debugger;
      invi.id_usuario = value.id;
      this.cs.HttpPost(invi, '/evento/EventoUsuario').subscribe(data => {
        console.log(data);

      });
    });

    this.listInvi.forEach(function (value) {
      debugger;
      int.nombre = value.nombre;
      int.correo_electronico = value.correo_electronico;
      this.cs.HttpPost(int, '/evento/EventoInvitado').subscribe(data => {
        console.log(data);

      });

    });

    this.listSer.forEach(function (value) {
      debugger;
      ser.id_servicio = value.id;
      this.cs.HttpPost(ser, '/evento/EventoServicio').subscribe(data => {
        console.log(data);

      });

    });

    this.sendMeeting(modelo);


    this.matDialogRef.close('success');
  }

  async sendMeeting(evento: EventoModel) {
    var locacion = this.ListUb.filter(espacio => espacio.id == evento.id_espacio);
    const event = {
      subject: evento.nombre,
      body: {
        contentType: "HTML",
        content: evento.descripcion
      },
      start: {
        //dateTime: evento.fecha_inicio.toDateString() + evento.hora_inicio,
        timeZone: "Pacific Standard Time"
      },
      end: {
       // dateTime: evento.fecha_fin.toDateString() + evento.hora_fin,
        timeZone: "Pacific Standard Time"
      },
      location: {
        displayName: locacion[0].nombre + locacion[0].calle_ubicacion
      },
      attendees: [
        {
          emailAddress: {
            address: "DanaS@contoso.onmicrosoft.com",
            name: "Dana Swope"
          },
          type: "Required"
        },
        {
          emailAddress: {
            address: "AlexW@contoso.onmicrosoft.com",
            name: "Alex Wilber"
          },
          type: "Required"
        }
      ],
      organizer: {
        emailAddress: {
          name: this.usuario.displayName,
          address: this.usuario.mail
        }
      }

    };

    let graphClient = Client.init({

      authProvider: async (done) => {

        let token = await this._authService.getAccessToken().catch((reason) => {

          done(reason, null);
        });

        if (token) {

          done(null, token);

        } else {

          done("Imposible obtener token de acceso", null);
        }
      }
    });

    let graphEvent = await graphClient.api('/me/events').post(event);

    console.log(graphEvent);

  }
}
