"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const aws_config_1 = require("../constants/aws-config");
const s3 = new aws_sdk_1.S3({
    accessKeyId: aws_config_1.AWS_CONFIG_S3.accessKeyId,
    secretAccessKey: aws_config_1.AWS_CONFIG_S3.secretAccessKey,
    region: aws_config_1.AWS_CONFIG_S3.region,
});
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Bucket: aws_config_1.AWS_CONFIG_S3.s3BucketName,
            Key: `${(0, uuid_1.v4)()}-${file.originalname}`,
            Body: file.buffer,
        };
        const data = yield s3.upload(params).promise();
        console.log(`File uploaded successfully at ${data.Location}`);
        return data.Location;
    }
    catch (error) {
        console.error(`Failed to upload file: ${error}`);
        throw error;
    }
});
exports.default = uploadFile;
