import { FuseUtils } from '@fuse/utils';

export class RelGrupoPartidoModel {
    id_partido_politico: number;
    nombre_partido: string;
    id_gpo_parlamentario: number;
    nombre_grupo: string;
    tipoOperacion: number;
    constructor(relgrupopartidoModel) {
        {
            this.id_partido_politico = relgrupopartidoModel.id_partido_politico || 0;
            this.nombre_partido = relgrupopartidoModel.nombre_partido || '';
            this.id_gpo_parlamentario = relgrupopartidoModel.id_gpo_parlamentario || 0;
            this.nombre_grupo = relgrupopartidoModel.nombre_grupo || '';
            this.tipoOperacion = relgrupopartidoModel.tipoOperacion || 0;
        }
    }
}

