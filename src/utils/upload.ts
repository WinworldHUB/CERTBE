import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { AWS_CONFIG_S3 } from "../constants/aws-config";

const s3 = new S3({
  accessKeyId: AWS_CONFIG_S3.accessKeyId,
  secretAccessKey: AWS_CONFIG_S3.secretAccessKey,
  region: AWS_CONFIG_S3.region,
});

const uploadFile = async (file:  Express.Multer.File): Promise<string> => {
    try {
      const params = {
        Bucket: AWS_CONFIG_S3.s3BucketName,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
      };
  
      const data = await s3.upload(params).promise();
      console.log(`File uploaded successfully at ${data.Location}`);
      return data.Location;
    } catch (error) {
      console.error(`Failed to upload file: ${error}`);
      throw error;
    }
  };
export default uploadFile