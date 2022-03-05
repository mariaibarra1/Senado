import {Injectable} from '@angular/core';
import {ConfigServicesModel} from '../models/config-services.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class ReportesService extends MainService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  Httpget(servicio: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get<any[]>(this.baseURL + servicio, {headers})
      .pipe(map(resultado => {
        return resultado;
      }));
  }

  HttpGet(modelo: any, servicio: string) {
    return this.http.get <any[]>(servicio, modelo)
      .pipe(map(resultado => {
        return resultado;
      }));
  }

  HttpPost(modelo: any, servicio: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post<any>(this.baseURL + servicio, modelo, {headers})
      .pipe(map(resultado => {
        return resultado;
      }));
  }

  HttpPut(modelo: any, servicio: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.put<any>(this.baseURL + servicio, modelo, {headers})
      .pipe(map(resultado => {
        return resultado;
      }));
  }

  HttpDelete(modelo: any, servicio: string) {
    return this.http.delete<any>(this.baseURL + servicio, modelo)
      .pipe(map(resultado => {
        return resultado;
      }));
  }


}
