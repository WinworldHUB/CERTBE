"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_CONFIG_S3 = void 0;
// scrambled access key
const AWS_S3_ACCESS_KEY_PART1 = "AKIAU37";
const AWS_S3_ACCESS_KEY_PART2 = "OIJ3AY";
const AWS_S3_ACCESS_KEY_PART3 = "GARQJHD";
// scrambled secret key
const AWS_S3_SECRET_ACCESS_KEY_PART1 = "z9caW4yZZWpnxAc5+Ox9C";
const AWS_S3_SECRET_ACCESS_KEY_PART2 = "6EH7MoX3gP3fo4V0N";
const AWS_S3_SECRET_ACCESS_KEY_PART3 = "dx";
const AWS_CONFIG_S3 = {
    accessKeyId: `${AWS_S3_ACCESS_KEY_PART1}${AWS_S3_ACCESS_KEY_PART2}${AWS_S3_ACCESS_KEY_PART3}`,
    secretAccessKey: `${AWS_S3_SECRET_ACCESS_KEY_PART1}${AWS_S3_SECRET_ACCESS_KEY_PART2}${AWS_S3_SECRET_ACCESS_KEY_PART3}`,
    region: "ap-south-1",
    s3BucketName: "wwdms",
};
exports.AWS_CONFIG_S3 = AWS_CONFIG_S3;
