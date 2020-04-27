# 概要

indexedDB用ドライバ。

| 関数           | 内容     |
| -------------- | -------- |
| initDB         | DB初期化 |
| deleteDB       | DB削除   |
| addData        | 追加     |
| getData_all    | 一括取得 |
| getData        | 条件取得 |
| setData_all    | 一括更新 |
| setData        | 条件更新 |
| deleteData_all | 一括削除 |
| deleteData     | 条件削除 |

# サンプルコード

インポートは以下の通り。

```javascirpt
import * as db from '@/IndexedDB_driver/indexedDB_driver.js'
```

データ構造は以下を想定。
```javascirpt
const db_name = 'db'
const version = 1
export let table_list = [
    ["user", { keyPath: "username" }],//keyの指定
    ["log", { autoIncrement : true }]//自動に通番をkeyとして指定
]
```

## DB初期化

```javascirpt
db.initDB();
```

## DB削除

```javascirpt
db.deleteDB();
```

## 追加

```javascirpt
db.addData('user', { username: "Donna", password:"test"});
```

## 一括取得

```javascirpt
getData_all('user');
```

## 条件取得

```javascirpt
getData('user', "Donna");
```

## 一括更新

```javascirpt
setData_all(user',{ username: "Donna", password:"rrrrr"})
```

## 条件更新

```javascirpt
db.setData('user', "Donna", "password", "tttttt");
```

## 一括削除

```javascirpt
getData_all('user')
```

## 条件削除

```javascirpt
getData_all('user')
```