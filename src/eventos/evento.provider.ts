import { DataSource } from 'typeorm';
import { EVENTO } from './evento.entity';


export const eventoProviders = [
  {
    provide: 'EVENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EVENTO),
    inject: ['DATA_SOURCE'],
  },
];