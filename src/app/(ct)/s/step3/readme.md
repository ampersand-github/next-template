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

---

##### 要件

1. Product で Flower を選択した場合にのみ Color 選択用コンポーネントが表示される

追加

1. (送信ボタンを押したとき、Flower 以外の場合は Color を""する)

##### テスト

1. Product を選択する(Flower)
2. Color 選択用コンポーネントが表示されることを確認する
3. Color を選択(green)する
4. Delivery のセレクトボックス(ship)を選択する
5. 送信したとき`{product: 'flower', color: 'green', delivery: 'ships'}`が送信されることを確認する
6. Product を選択する(PC)
7. Color 選択用コンポーネントが表示されないことを確認する
8. Delivery のセレクトボックス(pickUp)を選択する
9. 送信したとき`{product: 'pc', color: '', delivery: 'pickUp'}`が送信されることを確認する

# やりたいこと

- delivery のセレクトボックスがリセットされたときにプレースホルダーを表示したい
- storybook のインタラクションテストをしたい

# メモ
