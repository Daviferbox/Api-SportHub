import { Module } from "@nestjs/common"
import {databaseProviders} from "./dataBase.provider";


@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})

export class DatabaseModule {}