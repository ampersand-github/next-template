# README

## クローンしたら
- `npm install`
- envファイルを作成

## コーディング規約
- src/appはコロケーションする
  - 一つ上のディレクトリで使用できるようにするにはindex.tsに記述する
  - .tsxは積極的に分割すること
- src/components, src/libは共通フォルダのため、すべてのファイルにpublicアノテーションを付与すること
