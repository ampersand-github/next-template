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

---

###### 要件

1. personal を選択しているときメモを入力できるようにする
2. company を選択しているときメモを選択できないようにする
3. メモを入力したあと、company に切り替えて、personal に戻すと元のメモが見える

###### テスト

1. personal を選択する
2. メモを入力する
3. company を選択する
4. personal を選択する
5. メモが入力したものと同じであることを確認する
6. 送信すると、メモが表示されれる
7. company を選択する
8. 送信すると""が送信されることを確認する

---

###### 要件

1. company を選択しているとき、インボイスを選択できるようにする
2. personal を選択しているとき、インボイスを選択できないようにする
3. インボイスを選択したあと、personal に切り替えて、company に戻すと元のインボイスが見える

###### テスト

1. company を選択する
2. インボイス(Email)を選択する
3. personal を選択する
4. company を選択する
5. インボイスが選択したものと同じであること(Email)を確認する
6. 送信すると、インボイスが表示されれる
7. personal を選択する
8. 送信すると""が送信されることを確認する

---

###### 要件

- 部署名を引き継げる

###### テスト

- ユーザータイプ(company)を選択する
- 会社名を companyB にする
- 部署名を部署 B にする
- 会社名を companyA にする
- 部署名が空白になっていることを確認する
- 部署名を部署 A にする
- その他の条件は適当に入力する
- 送信すると、部署名が部署 A であることを確認する
- 会社名を companyB にする
- 部署名が部署 B であることを確認する
- 送信すると、部署名が部署 B であることを確認する

# やりたいこと

- delivery のセレクトボックスがリセットされたときにプレースホルダーを表示したい
- storybook のインタラクションテストをしたい
- ユビキタス言語を作りたい

# メモ
