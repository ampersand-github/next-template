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

---

##### 要件

1. Personal と Company を切り替えてもデータはリセットされない

#### テスト

1. Personal を選択する
2. Product を選択する(Flower)
3. Color を選択する(green)
4. Delivery のセレクトボックス(ship)を選択する
5. 送信したとき`{customer: 'personal', product: 'flower', color: 'green', delivery: 'ships'}`が送信されることを確認する
6. Company を選択する
7. 送信したとき`{customer: 'company', product: 'flower', color: 'green', delivery: 'ships'}`が送信されることを確認する

---

##### 要件

1. Company を選択しているとき
2. プロダクトを変更しても delivery のセレクトボックスはリセットされない
3. プロダクトを変更したとき、disable になっていた場合は PickUp に強制される

##### テスト

1. Company を選択する
2. Product を選択する(Flower)
3. Color を選択する(green)
4. Delivery のセレクトボックス(ship)を選択する
5. 送信したとき`{customer: 'company', product: 'flower', color: 'green', delivery: 'ships'}`が送信されることを確認する
6. Product を選択する(car)
7. Delivery のセレクトボックスが PickUp になっていることを確認する
8. 送信したとき`{customer: 'company', product: 'car', color: '', delivery: 'pickUp'}`が送信されることを確認する

# やりたいこと

- delivery のセレクトボックスがリセットされたときにプレースホルダーを表示したい
- storybook のインタラクションテストをしたい
- ユビキタス言語を作りたい

# メモ
