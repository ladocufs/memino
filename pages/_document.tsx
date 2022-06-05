import Document, { Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return(
      <Html lang="pt-BR">
        <Head>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css" integrity="sha384-i1LQnF23gykqWXg6jxC2ZbCbUMxyw5gLZY6UiUS98LYV5unm8GWmfkIS6jqJfb4E" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}
