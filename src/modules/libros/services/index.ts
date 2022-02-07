import { LibroService } from './libro.service';
import { TablesService } from 'modules/tables/services/tables.service';

export const services = [TablesService, LibroService];

export * from 'modules/tables/services/tables.service';
export * from './libro.service';