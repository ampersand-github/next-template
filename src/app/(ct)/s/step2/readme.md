# 要求

ー

# 要件 / テスト

##### 要件

1. Product が変更されると Delivery のセレクトボックスはリセットされる

##### テスト

1. Product を選択する(PC)
1. Delivery のセレクトボックス(PickUp)を選択する
1. 送信したとき、`{product: 'pc', delivery: 'pickUp'}`が送信されることを確認する
1. Product(Flower)を変更する
1. Delivery のセレクトボックスがリセットされていることを確認する
1. 送信できないことを確認する
1. Delivery のセレクトボックス(Ships)を選択する
1. 送信したとき`{product: 'flower', delivery: 'ships'}`が送信されることを確認する

---

##### 要件

1. Car を選択した場合に Ships の配達方法が Disabled になる

##### テスト

1. Product を選択する(Car)
2. Delivery のセレクトボックス(Ships)が Disabled になっていることを確認する
3. Delivery のセレクトボックス(PickUp)を選択する
4. 送信したとき`{product: 'car', delivery: 'pickUp'}`が送信されることを確認する
5. Product を選択する(Flower)
6. Delivery のセレクトボックス(Ships)が Disabled になっていないことを確認する

# やりたいこと

- delivery のセレクトボックスがリセットされたときにプレースホルダーを表示したい
- storybook のインタラクションテストをしたい

# メモ
