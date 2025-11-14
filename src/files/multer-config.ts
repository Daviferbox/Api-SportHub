import * as path from "path";
import {diskStorage} from 'multer';
import {v4 as uuidv4} from 'uuid';

const multerConfig = {
    storage: diskStorage({
        destination: './upload',
        filename:(req , file, cb) => {
            const filename = uuidv4() + '_id_' +
            path.parse(file.originalname).name.replace(/\s/g,'');

            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};

export default multerConfig;