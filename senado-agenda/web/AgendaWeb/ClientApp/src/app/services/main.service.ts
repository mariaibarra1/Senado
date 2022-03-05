import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseURL: string = 'http://10.2.15.40:2000';

  constructor() {
  }

}
