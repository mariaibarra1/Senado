import { FuseUtils } from '@fuse/utils';

export class RolSenadoModel
{
    id: number;
    nombre: string;
    descripcion: string;
    activo: boolean;

    constructor(rolsenadoModel)
    {
        {
            this.id = rolsenadoModel.id || 0;
            this.nombre = rolsenadoModel.nombre || '';
            this.descripcion = rolsenadoModel.descripcion || '';
            this.activo = rolsenadoModel.activo || '';
        }
    }
}
