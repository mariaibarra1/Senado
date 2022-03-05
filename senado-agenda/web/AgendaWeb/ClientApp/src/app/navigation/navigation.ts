import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'eventos',
    title: 'Eventos',
    type: 'group',
    children: [
      {
        id: 'calendario',
        title: 'Calendario',
        type: 'item',
        icon: 'today',
        url: '/eventos/calendario',
      },
      {
        id: 'solicitudes',
        title: 'Solicitudes',
        type: 'item',
        icon: 'inbox',
        url: '/eventos/solicitudes',
      },
    ]
  },
  {
    id: 'administracion',
    title: 'Administración',
    type: 'group',
    children: [
      {
        id: 'usuarios',
        title: 'Usuarios',
        type: 'item',
        icon: 'people',
        url: '/usuarios',
      },
      {
        id: 'comisiones',
        title: 'Comisiones',
        type: 'collapsable',
        icon: 'group_work',
        //url: '/comisiones',
        children: [
          {
            id: 'comisiones',
            title: 'Comisiones',
            type: 'item',
            icon: 'group_work',
            url: '/comisiones',
          }
        ]
      },
      {
        id: 'catalogos',
        title: 'Catálogos',
        type: 'collapsable',
        icon: 'list_alt',
        children: [
          {
            id: 'espacios',
            title: 'Espacios para eventos',
            type: 'item',
            url: '/catalogos/espacios'
          },
          {
              id: 'rol-senado',
              title: 'Roles de Comisiones',
              type: 'item',
              url: '/catalogos/rol-senado'
          },
          {
            id: 'rol-web',
            title: 'Roles de aplicación',
            type: 'item',
            url: '/catalogos/rol-web'
          },
          {
            id: 'partido-politico',
            title: 'Partidos Políticos',
            type: 'item',
            url: '/catalogos/partido-politico'
          },
          {
              id: 'gpo-parlamentario',
              title: 'Grupos Parlamentarios',
              type: 'item',
              url: '/catalogos/gpo-parlamentario'
          },
          {
            id: 'equipamiento',
            title: 'Equipamiento',
            type: 'item',
            url: '/catalogos/equipamiento'
          },
          {
            id: 'ubicacion',
            title: 'Ubicaciones',
            type: 'item',
            url: '/catalogos/ubicacion'
          },
          {
            id: 'servicios',
            title: 'Servicios',
            type: 'item',
            url: '/catalogos/servicios'
          },
          {
            id: 'tipo-eventos',
            title: 'Tipos de evento',
            type: 'item',
            url: '/catalogos/tipo-eventos'
          }

        ]
      }
    ]
  }


];
