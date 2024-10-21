const product = require("./productModal");
const path = require("path");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    if (req.files)
      if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
    if (req.files.images)
      data.images = req.files.images.map((img) => img.filename);

    const dataToSave = new product(data);

    const responce = await dataToSave.save();

    res.status(200).json({ message: "success", data: responce });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const readProduct = async (req, res) => {
  try {
    const data = await product.find();
    const filepath = `${req.protocol}://${req.get("host")}/web-files/`;

    const dummyArray = data.map((product) => {
      product.thumbnail = filepath + product.thumbnail;

      product.images = product.images.map((img) => filepath + img);

      return product;
    });

    res.status(200).json({ massage: "success", dummyArray, data, filepath });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "internal server errror" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const ifProduct = await product.findOne(req.params);

    if (!ifProduct) return res.status(400).json({ massage: "data not found" });

    console.log(ifProduct);

    const data = req.body;

    if (req.files) {
      if (req.files.thumbnail) {
        data.thumbnail = req.files.thumbnail[0].filename;

        if (fs.existsSync(`./uploads/products/${ifProduct.thumbnail}`)) {
          fs.unlinkSync(`./uploads/products/${ifProduct.thumbnail}`);
        }
      }

      if (req.files.images) {
        data.images = req.files.images.map((img) => img.filename);

        ifProduct.images.map((img) => {
          if (fs.existsSync(`./uploads/products/${img}`)) {
            fs.unlinkSync(`./uploads/products/${img}`);
          }
        });
      }
    }
    const response = await product.updateOne(req.params, {
      $set: data,
    });
    res.status(200).json({ massage: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "internel server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const ifProduct = await product.findOne(req.params);

    if (!ifProduct) return res.status(400).json({ massage: "data not found" });

    if (fs.existsSync(`./uploads/products/${ifProduct.thumbnail}`)) {
      fs.unlinkSync(`./uploads/products/${ifProduct.thumbnail}`);

      ifProduct.images.map((img) => {
        if (fs.existsSync(`./uploads/products/${img}`)) {
          fs.unlinkSync(`./uploads/products/${img}`);
        }
      });
    };

    const response = await product.deleteOne(req.params);
    res.status(200).json({massage:'success',data : response});


  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "internel server error" });
  }
};

module.exports = { createProduct, readProduct, updateProduct, deleteProduct };
