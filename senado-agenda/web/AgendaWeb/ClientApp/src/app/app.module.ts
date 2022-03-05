import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {SampleModule} from 'app/main/sample/sample.module';
import {AppRoutingModule} from "./app-routing.module";
import {BandejaService} from './services/bandejas.service';
import {CatalogosService} from './services/catalogos.service';
import {ComisionesService} from './services/comisiones.service';
import {EventosService} from './services/eventos.service';
import {ReportesService} from './services/reportes.service';
import {UsuariosService} from './services/usuarios.service';

import {OAuthSettings} from "../oauth";
import {MsalModule} from "@azure/msal-angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    SampleModule,

    // Azure/Microsoft Graph
    MsalModule.forRoot({
      clientID: OAuthSettings.appId,
      postLogoutRedirectUri: OAuthSettings.logoutRedirectUri,
      authority: OAuthSettings.authority
    })
  ],
  providers: [
    BandejaService,
    CatalogosService,
    ComisionesService,
    EventosService,
    ReportesService,
    UsuariosService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
