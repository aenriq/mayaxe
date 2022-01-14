const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    domains: ["s3.us-west-2.amazonaws.com"],
  },
});
