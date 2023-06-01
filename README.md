# README

## クローンしたら

- `npm install`
- env ファイルを作成

## コーディング規約

- src/app はコロケーションする
  - 一つ上のディレクトリで使用できるようにするには index.ts に記述する
  - .tsx は積極的に分割すること
- src/components, src/lib は共通フォルダのため、すべてのファイルに public アノテーションを付与すること
