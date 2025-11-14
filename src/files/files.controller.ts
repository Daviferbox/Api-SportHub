import {Controller,Post,UseInterceptors,UploadedFile,Req, Get, Param, Res} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import type { Request } from 'express';
import { FilesService } from './files.service';
  
@Controller('/files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('arquivo', multerConfig))
    async uploadArquivo(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        return this.fileService.salvarDados(file, req);
    }

    @Get(':imgid')
    async retornaArquivo(@Param('imgid') image, @Res() res){
        let img = await this.fileService.localizar(image);
        if (!img){
            return res.status(404).send("imagem não encontrada");
        }
        return res.sendFile(img.URL, { root:'./upload/'});
        
    }
}