import fs from "fs";
import { join, extname } from "path";
import config from "./config.js";
import fsPromises from "fs/promises";
const {
    dir: { publicDirectory },
} = config;

export class Service {
    createFileStream(filename) {
        return fs.ReadStream(filename);
    }

    async getFileInfo(filename) {
        const fullFilePath = join(publicDirectory, filename);
        fsPromises.access(fullFilePath);
        const fileType = extname(fullFilePath);
        return {
            type: fileType,
            name: fullFilePath,
        };
    }
    async getFileStream(filename) {
        const { type, name } = await this.getFileInfo(filename);
        return {
            stream: this.createFileStream(name),
            type,
        };
    }
}
