import { DataSource } from "typeorm";
import { USUARIO } from "../usuario/usuario.entity";
import { ESCOLA } from "src/escola/escola.entity";
import { EVENTO } from "src/eventos/evento.entity";

export const databaseProviders = [
    {
        provide: "DATA_SOURCE",
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: '50.116.112.16',
                port: 3306,
                username: 'vitali04_adm_sporthub',
                password: 'Gilm1997!',
                database: 'vitali04_sporthub',
                entities: [USUARIO,ESCOLA,EVENTO], // << AQUI ESTÁ A CORREÇÃO
                synchronize: false,
            });

            return dataSource.initialize();
        },
    },
];
