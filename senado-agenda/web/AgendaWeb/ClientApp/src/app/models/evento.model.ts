import {CalendarioModel} from "./calendario.model";
import { Time } from '@angular/common';
import { setTimeout } from 'timers';
import { Moment } from 'moment';


export class EventoModel extends CalendarioModel {

  id: number;
   nombre: string;
   descripcion: string;
   id_tipo_evento: number;
   id_espacio: number;
   id_solicitante: number;
   id_comision: number;
   fecha_inicio: Moment;
   hora_inicio: Time;
  fecha_fin: Moment;
   hora_fin: Time;
   privado: boolean;
   aprobado: boolean;
   allday: boolean;

}


export class EventoPostModel  {

  id: number;
  nombre: string;
  descripcion: string;
  id_tipo_evento: number;
  id_espacio: number;
  id_solicitante: number;
  id_comision: number;
  fecha_inicio: string;
  hora_inicio: string;
  fecha_fin: string;
  hora_fin: string;
  privado: boolean;
  aprobado: boolean;
  allday: boolean;
  id_encargado: number;

}
