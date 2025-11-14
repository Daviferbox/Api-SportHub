import { DataSource } from 'typeorm';
import { ESCOLA } from './escola.entity';

export const escolaProviders = [
  {
    provide: 'ESCOLA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ESCOLA),
    inject: ['DATA_SOURCE'],
  },
];