const Image = require("../models/Image");

// Upload Image
const uploadImage = async (req, res) => {
  try {
    const { imageUrl, projectId } = req.body;

    const image = new Image({
      imageUrl,
      projectId,
      owner: req.user.id,
    });

    await image.save();

    res.status(201).json({
      message: "Image Uploaded Successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Images
const getImages = async (req, res) => {
  try {
    const images = await Image.find({
      owner: req.user.id,
    });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Image
const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        message: "Image Not Found",
      });
    }

    if (image.owner.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await image.deleteOne();

    res.status(200).json({
      message: "Image Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
  getImages,
  deleteImage,
};