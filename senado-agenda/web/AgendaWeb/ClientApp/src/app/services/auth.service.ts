import {Injectable} from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {OAuthSettings} from "../../oauth";
import {Client} from "@microsoft/microsoft-graph-client";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MainService {

  public authenticated: boolean;

  public user: MSUser;

  constructor(
    private msalService: MsalService,
    private httpClient: HttpClient
  ) {
    super();
    this.authenticated = this.msalService.getUser() != null;
  }

  async signIn(): Promise<void> {

    this.msalService.loginRedirect(OAuthSettings.scopes);
  }

  signOut(): void {

    this.msalService.logout();

    this.user = null;

    this.authenticated = false;
  }

  async getAccessToken(): Promise<string> {

    return await this.msalService.acquireTokenSilent(OAuthSettings.scopes, OAuthSettings.authority).catch((reason) => {

      console.log('Error al obtener token de acceso', JSON.stringify(reason, null, 2));
    });
  }

  getApplicationToken() {

    let url = this.baseURL + '/oauth2/v2.0/token';

    let headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded').set('Access-Control-Allow-Origin', '*');

    return this.httpClient.post<any>(url, 'client_id=' + OAuthSettings.appId + '&scope=' + OAuthSettings.graphScope
      + '&client_secret=' + OAuthSettings.appSecret + '&grant_type=' + OAuthSettings.appSecret, {headers}).pipe(map(token => {

      return token;
    }));
  }

  async getUser(): Promise<MSUser> {

    if (!this.authenticated) {

      return null;
    }

    let graphClient = Client.init({

      authProvider: async (done) => {

        let token = await this.getAccessToken().catch((reason) => {

          done(reason, null);
        });

        if (token) {

          done(null, token);

        } else {

          done("Imposible obtener token de acceso", null);
        }
      }
    });

    let graphUser = await graphClient.api('/me').get();

    return new MSUser(graphUser);
  }

}

export class MSUser {

  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  surname: string;
  userPrincipalName: string;

  constructor(data?) {

    data = data || {};

    this.displayName = data.displayName || null;
    this.givenName = data.givenName || null;
    this.jobTitle = data.jobTitle || null;
    this.mail = data.mail || null;
    this.mobilePhone = data.mobilePhone || null;
    this.surname = data.surname || null;
    this.userPrincipalName = data.userPrincipalName || null;
  }
}
