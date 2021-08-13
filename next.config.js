const nextTranslate = require("next-translate");

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  ...nextTranslate(),
};
