import { Inject, Injectable } from '@nestjs/common';
import { FILES } from './files.entity';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { RetornoPadraoDTO } from 'src/dto/retornoPadrao.dto';


@Injectable()
export class FilesService{
    constructor(
        @Inject('FILES_REPOSITORY')
        private filesRepository: Repository<FILES>
    ){}


    async salvarDados(file: Express.Multer.File, req: Request) {
        const arquivo = new FILES();

        var nome = file.filename.split('_id_');

        arquivo.ID = nome[0];
        arquivo.FILENAME = file.originalname;
        arquivo.CONTENTELENGTH = file.size;
        arquivo.CONTENTTYPE = file.mimetype;
        arquivo.URL = `${file.filename}`

        return this.filesRepository.save(arquivo)
        .then((result) => {
            return <RetornoPadraoDTO>{
                data:arquivo.ID,
                message: 'Arquivo inserido com sucesso!'
            }
        })
        .catch((error) => {
            return <RetornoPadraoDTO>{
                data:"",
                message:'Não deu certo' + error.message 
            }
        })
    }

    async validarArquivo(ID: string){
        const possivelArquivo = this.filesRepository.findOne(
            {
            where:
            { ID }
            }
        );
        return (possivelArquivo!== undefined)
    }

    async localizar(ID: string){
        const possivelArquivo = await this.filesRepository.findOne(
            {
                where:
                { ID }
            }
        );
        return possivelArquivo;
    }
}