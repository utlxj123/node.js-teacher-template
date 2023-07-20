

> npm i -g es-checker

> es-checker  # 執行

> npm list -g # 查看全域套件

> npm un -g es-checker # 移除全域套件

-----------------
錯誤先行

-----------------
res.end()
res.send()
res.render()

res.json()
res.redirect()
-----------------
req.query   // query string 的資料
req.body    // 表單的內容 (urlencoded)
req.file    // 上傳的檔案
req.files
req.params  // 路徑的代稱
req.session

-----------------
** 完整路徑
https://www.abcde.com

** 省略協定
//www.abcde.com

** 只有路徑, 同一個網站
/defg

** 只變換 query string, 同一個資源 (同一個頁面)
?page=5

** 頁面內的連結
#abc
-----------------
RESTful API


新增資料
    POST
        /products

讀取資料
    GET
        /products      #取得列表資料
        /products/15   #取得單筆資料

刪除資料
    DELETE
        /products/15

修改資料
    PUT
        /products/15
-----------------
相同的來源 origin

protocol, domain, port
