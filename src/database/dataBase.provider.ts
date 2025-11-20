import { DataSource } from "typeorm";
import { USUARIO } from "../usuario/usuario.entity";

export const databaseProviders = [
    {
        provide: "DATA_SOURCE",
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'sporthub',
                entities: [USUARIO], // << AQUI ESTÁ A CORREÇÃO
                synchronize: false,
            });

            return dataSource.initialize();
        },
    },
];
