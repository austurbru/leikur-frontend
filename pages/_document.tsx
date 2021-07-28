import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id='backdrop' />
          <div id='side-drawer' />
          <NextScript />
        </body>
      </Html>
    );
  }
}
