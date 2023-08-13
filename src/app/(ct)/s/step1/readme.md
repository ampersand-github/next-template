# 要求

ー

# 要件

1. Product が変更されると Delivery のセレクトボックスはリセットされる

# テスト

1. Product を選択する(PC)
1. Delivery のセレクトボックス(PickUp)を選択する
1. 送信したとき、`{product: 'pc', delivery: 'pickUp'}`が送信されることを確認する
1. Product(Flower)を変更する
1. Delivery のセレクトボックスがリセットされていることを確認する
1. 送信できないことを確認する
1. Delivery のセレクトボックス(Ships)を選択する
1. 送信したとき`{product: 'flower', delivery: 'ships'}`が送信されることを確認する

# やりたいこと

- delivery のセレクトボックスがリセットされたときにプレースホルダーを表示したい
- storybook のインタラクションテストをしたい

# メモ
