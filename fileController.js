const { uploadToS3, saveFileMetadata } = require("../services/fileService");

exports.uploadFile = async (req, res) => {
    const { userId } = req.user;
    const file = req.file; // Assuming you have a file upload middleware
    const fileUrl = await uploadToS3(file);
    await saveFileMetadata(userId, fileUrl, file.mimetype);
    res.status(200).json({ message: "File uploaded successfully", fileUrl });
};
