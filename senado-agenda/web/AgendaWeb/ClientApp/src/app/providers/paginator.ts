import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

export class Paginator extends MatPaginatorIntl {

  itemsPerPageLabel = "Registros por página";

  getRangeLabel = (page: number, pageSize: number, length: number) => { if (length == 0 || pageSize == 0) { return `0 de ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} - ${endIndex} de ${length}`; }

  nextPageLabel = "Siguiente";

  previousPageLabel = "Anterior";

  lastPageLabel = "Último";

  firstPageLabel = "Inicio";

}

