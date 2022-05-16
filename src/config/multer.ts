import * as multer from "multer";
import crypto from "crypto";
import path from "path";
import * as aws from "aws-sdk";
import * as multerS3 from "multer-s3";

import * as dotenv from 'dotenv';
import { Request } from "express";
dotenv.config({ path: __dirname + '/../../.env' });

interface storageTypes {
  local: any,
  s3: any
}

const MAX_SIZE_TWO_MEGABYTES = 5 * 1024 * 1024;

const storageTypes: storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err){
          cb(err, file.originalname);
        }
        
        let fileKey = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileKey);
      });
    }, 
  }),
  s3: multerS3.default({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME || "uploads",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes["s3"],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
    const allowedMimes = [
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};

export { multerConfig };