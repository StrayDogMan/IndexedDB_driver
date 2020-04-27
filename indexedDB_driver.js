const db_name = 'db'
const version = 1
export let table_list = [
    ["user", { keyPath: "username" }],//keyの指定
    ["log", { autoIncrement : true }]//自動に通番をkeyとして指定
]

async function _create_table(db, table_name, key_option){
    console.log("_create_table");
    return new Promise((resolve, reject)=>{
        let req = db.createObjectStore(table_name, key_option);
        req.onsuccess = ()=>{resolve(true)};
        req.onerror = ()=>{reject(false)};
    });
}

// 初期化
export async function initDB(){
    console.log("initDB");
    return new Promise((resolve, reject)=>{
        let openRequest = indexedDB.open(db_name, version);
        openRequest.onupgradeneeded = function() {
            console.log("onupgradeneeded");
            let db = openRequest.result;
            // create store
            for(let table of table_list){
                _create_table(db, table[0], table[1]).then((result)=>{
                    if(!result){
                        reject(false);
                    }
                }).catch(()=>{
                    reject(false);
                })
            }
            resolve(true);
        };
    });
}

// DB削除
export async function deleteDB(){
    return new Promise((resolve, reject)=>{
        let delete_req = indexedDB.deleteDatabase(db_name);
        delete_req.onsuccess = function(){
            console.log('db delete success');
            resolve(true);
        }
        
        delete_req.onerror = function(){
            console.log('db delete error');
            reject(false);
        }
        
    })
}

// key指定取得
// table：対象のテーブル
// key：talbeで指定したkeyのvalueを指定
export async function getData(table, key){
    console.log("getData");
    return new Promise((resolve, reject)=>{
        let request = indexedDB.open(db_name, version);
        request.onsuccess = function(){
            let db = event.target.result;
            let objectStore = db.transaction([table]).objectStore(table);
            const req = objectStore.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = reject;
        }

        request.onerror = reject
    });
}

// 一括取得
// table：対象のテーブル
export async function getData_all(table){
    console.log("getData_all");
    return new Promise((resolve, reject)=>{
        let request = indexedDB.open(db_name, version);
        request.onsuccess = function(){
            let db = event.target.result;
            let objectStore = db.transaction([table]).objectStore(table);
            const req = objectStore.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = reject;
        }
    })    
}

// 追加
// table：対象のtable
// data：データ  
export async function addData(table, data){
    console.log("addData");
    return new Promise((resolve, reject)=>{
        let request = indexedDB.open(db_name, version);
        request.onsuccess = function(){
            let db = event.target.result;
            let objectStore = db.transaction([table], "readwrite").objectStore(table);
            let add_req = objectStore.add(data);
            add_req.onsuccess = ()=>{resolve(true)};
            add_req.onerror = ()=>{reject(false)};
        }
    });

}

// 一括更新
// table：対象のtable
// data：変更後のデータ
export async function setData_all(table, data){
    console.log("setData");
    return new Promise((resolve, reject)=>{
        let req = indexedDB.open(db_name, version);
        req.onsuccess = function(){
            let db = event.target.result;
            let objectStore = db.transaction([table], "readwrite").objectStore(table);
            objectStore.put(data);
            resolve(true);
        }   
        req.onerror = () => reject(false);
    })
}

// 条件更新
// table：対象のtable
// key:talbeで指定したkeyのvalueを指定
// 変更したいcolmunを指定
// 変更後のcolmunの値
export async function setData(table, key, colmun, value){
    console.log("setData");
    return new Promise((resolve, reject)=>{
        let request = indexedDB.open(db_name, version);
        request.onsuccess = function(){
            let db = event.target.result;
            let objectStore = db.transaction([table], "readwrite").objectStore(table);
            let req = objectStore.get(key);
            // 正常処理
            req.onsuccess = function(){
                let data = req.result;
                data[colmun] = value;
                let put_req = objectStore.put(data);
                put_req.onsuccess = ()=>{resolve(true)}
                put_req.onerror = ()=>{reject(false)}
            }
            // 異常処理
            req.onerror = () => reject(false);
        }    
    })
}

// 
export async function deleteData(table, key){
    console.log("deleteData");
    return new Promise((resolve, reject)=>{
        let req = indexedDB.open(db_name, version);
        req.onsuccess = function(){
            let db = event.target.result;
            let objectStore = db.transaction([table], "readwrite").objectStore(table);
            let delete_req =  objectStore.delete(key);
            delete_req.onsuccess = ()=>{resolve(true)}
            delete_req.onerror = ()=>{reject(false)}
        }   
        req.onerror = () => reject(false);
    })
}

export async function deleteData_all(table){
    console.log("deleteData");
    return new Promise((resolve, reject)=>{
        let req = indexedDB.open(db_name, version);
        req.onsuccess = function(){
            let db = event.target.result;
            let objectStore = db.transaction([table], "readwrite").objectStore(table);
            let delete_req =  objectStore.clear();
            delete_req.onsuccess = ()=>{resolve(true)}
            delete_req.onerror = ()=>{reject(false)}
        }   
        req.onerror = () => reject(false);
    })
}