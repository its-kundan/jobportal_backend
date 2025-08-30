import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    if (!file) {
        throw new Error("File is undefined or null");
    }
    
    if (!file.buffer) {
        throw new Error("File buffer is missing");
    }
    
    if (!file.originalname) {
        throw new Error("File original name is missing");
    }
    
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    
    if (!extName) {
        throw new Error("File extension not found");
    }
    
    return parser.format(extName, file.buffer);
}

export default getDataUri;