import { v4 } from "uuid"
import { Options, FileFilterCallback } from "multer"

let options: Options = {
    fileFilter(req, file, callback) {

    },
}

export function imageFileFilter(_req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only audio files are allowed!'));
    }
    callback(null, true);
}

export function audioFileFilter(_req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) {
    if (!file.originalname.match(/\.(mp3|wav)$/)) {
        return callback(new Error('Only audio files are allowed!'));
    }
    callback(null, true);
}


export function customFileName(_req: Express.Request, file: Express.Multer.File, callback: (error: Error, filename: string) => void) {

    const name = file.originalname.split(".")[0];
    const fileExtension = file.originalname.split(".")[1];
    const fileName = `${name}-${v4()}.${fileExtension}`;
    callback(null, fileName);
}

