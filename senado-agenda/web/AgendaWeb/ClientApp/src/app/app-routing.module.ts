import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {MsalGuard} from "@azure/msal-angular";
import {AuthGuardService as AuthGuard} from "./services/auth-guard.service";

const routes: Routes = [
  /* Login */
  { path: 'acceso', loadChildren: './pages/acceso/acceso.module#AccesoModule', canActivate: [AuthGuard] },

  /* Eventos */
  { path: 'eventos/calendario', loadChildren: './pages/eventos/calendario/calendario.module#CalendarioModule', canActivate: [MsalGuard] },
  { path: 'eventos/solicitudes', loadChildren: './pages/eventos/solicitudes/solicitudes.module#SolicitudesModule', canActivate: [MsalGuard] },

  /* Comisiones */
  { path: 'comisiones', loadChildren: './pages/comisiones/comisiones/comisiones.module#ComisionesModule', canActivate: [MsalGuard] },
  
  /* Administración - Catálogos */
  { path: 'catalogos/espacios', loadChildren: './pages/catalogos/espacios/espacios.module#EspaciosModule', canActivate: [MsalGuard] },
  { path: 'catalogos/rol-senado', loadChildren: './pages/catalogos/rol-senado/rol-senado.module#RolSenadoModule', canActivate: [MsalGuard] },
  { path: 'catalogos/rol-web', loadChildren: './pages/catalogos/rol-web/rol-web.module#RolWebModule', canActivate: [MsalGuard] },
  { path: 'catalogos/partido-politico', loadChildren:'./pages/catalogos/partido-politico/partido-politico.module#PartidoPoliticoModule', canActivate: [MsalGuard] },
  { path: 'catalogos/gpo-parlamentario', loadChildren: './pages/catalogos/gpo-parlamentario/gpo-parlamentario.module#GpoParlamentarioModule', canActivate: [MsalGuard] },
  { path: 'catalogos/servicios', loadChildren: './pages/catalogos/servicios/servicios.module#ServiciosModule', canActivate: [MsalGuard] },
  { path: 'catalogos/tipo-eventos', loadChildren: './pages/catalogos/tipo-eventos/tipo-eventos.module#TipoEventosModule', canActivate: [MsalGuard] },
  { path: 'catalogos/equipamiento', loadChildren: './pages/catalogos/equipamiento/equipamiento.module#EquipamientoModule', canActivate: [MsalGuard] },
  { path: 'catalogos/ubicacion', loadChildren: './pages/catalogos/ubicacion/ubicacion.module#UbicacionModule', canActivate: [MsalGuard] },
  { path: 'catalogos/legislaturas', loadChildren: './pages/catalogos/legislaturas/legislaturas.module#LegislaturasModule', canActivate: [MsalGuard] },
  { path: 'catalogos/tipo-comision', loadChildren: './pages/catalogos/tipo-comision/tipo-comision.module#TipoComisionModule', canActivate: [MsalGuard] },
  { path: 'catalogos/tipo-equipamento', loadChildren: './pages/catalogos/tipo-equipamento/tipo-equipamento.module#TipoEquipamentoModule', canActivate: [MsalGuard] },
  { path: 'catalogos/tipo-montaje', loadChildren: './pages/catalogos/tipo-montaje/tipo-montaje.module#TipoMontajeModule', canActivate: [MsalGuard] },

  /* Administración - Usuarios */
  { path: 'usuarios', loadChildren: './pages/usuarios/usuarios.module#UsuariosModule', canActivate: [MsalGuard] },

  /* Errores */
  { path: '404', loadChildren: './pages/errores/404/error404.module#Error404Module', canActivate: [MsalGuard] },

  /* Genéricos */
  { path: '', redirectTo: 'eventos/calendario', pathMatch: 'full', canActivate: [MsalGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '/404', canActivate: [MsalGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
