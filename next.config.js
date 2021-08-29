const nextTranslate = require("next-translate");
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  images: {
    domains: ["res.cloudinary.com"],
  },
  ...nextTranslate(),
});
