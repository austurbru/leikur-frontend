import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="backdrop" />
          <div id="side-drawer" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
