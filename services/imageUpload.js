// Requirements
const aws = require("aws-sdk");
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
});

const imageUpload = (file) => {
    // Upload file to S3 bucket and return the filename, location back to the caller
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${new Date().valueOf()}-${file.name}`,
        Body: file.data 
    }

    return s3.upload(uploadParams).promise()
                            .then((data) => data)
                            .catch((error) => error);
};

module.exports = imageUpload;