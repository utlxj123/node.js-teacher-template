require("dotenv").config();

const express = require("express");
const multer = require("multer");
// const upload = multer({dest: 'tmp_uploads/'});
const upload = require(__dirname + "/../modules/upload-img");
const db = require(__dirname + "/../modules/connect-db");

const session = require('express-session');
const moment = require('moment-timezone');

const app = express();

app.set("view engine", "ejs");

// top-level middleware
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'UOIodis9568469;fghdlkjg98985490',
  cookie:{
    maxAge: 1200_000 // 20 mins
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 自訂 middleware
app.use((req, res, next) => {
  // 放在 res.locals 裡的變數會自動傳到 template
  res.locals.title = "小新的網站";
  res.locals.session = req.session; // 讓所有的 EJS 可以看到 session
  next();
});

// 路由, routes
// 只接受 HTTP GET 方法
app.get("/", (req, res) => {
  res.locals.title = "首頁 - " + res.locals.title;
  res.render("home", { name: "Shin" });
});

app.get("/json", (req, res) => {
  res.json({ name: "shinder", age: 38, data: [2, 4, 6, 8] });
});

app.get("/json-sales", (req, res) => {
  res.locals.title = "業務員資料表格 - " + res.locals.title;
  const sales = require(__dirname + "/../data/sales");
  sales.sort((a, b) => {
    return b.age - a.age; // 依照年齡降冪
  });
  // TODO: 依名字字母排序
  res.render("json-sales", { sales });
});

app.get("/try-qs", (req, res) => {
  res.json(req.query);
});

app.post("/try-post", (req, res) => {
  res.json(req.body);
});

app.post("/try-upload", upload.single("avatar"), (req, res) => {
  res.json(req.file);
});
app.post("/try-uploads", upload.array("photos"), (req, res) => {
  res.json(req.files);
});

app.get("/my-params1/:action?/:id?", (req, res) => {
  res.json(req.params);
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
  let u = req.url.slice(3); // 去掉前面 /m/
  u = u.split("?")[0];      // 去掉 query string
  u = u.split("-").join("");
  res.json({ u });
});

app.use(require(__dirname + '/../routes/admin2'));
app.use('/admin3', require(__dirname + '/../routes/admin3'));

app.get('/try-sess', (req, res) => {
  req.session.count = req.session.count || 0;
  req.session.count++;
  res.json({
    count: req.session.count,
    session: req.session
  })
});

app.get('/try-moment', (req, res) => {
    const fm = "YYYY-MM-DD HH:mm:ss";

    const m1 = moment();  // 當下的時間
    const m2 = moment('2023-09-07');

    res.json({
      m1a: m1.format(fm),
      m1b: m1.tz('Europe/London').format(fm),
      m2a: m2.format(fm),
      m2b: m2.tz('Europe/London').format(fm),
      d1: new Date()

    })
});

app.get('/login', (req, res) => {
  if(req.session.admin){
    // 如果已經是登入的狀態直接跳轉到首頁
    return res.redirect('/');
  }
  res.render('login');
});

app.get('/logout', (req, res) => {
  delete req.session.admin;
  res.redirect('/');
});

app.post('/login', upload.none(), (req, res) => {
  const output = {
    success: false,
    code: 0,
    msg: ''
  };


  const accounts = {
    shin: {
      pw: '234567',
      nickname: '大明'
    },
    david: {
      pw: '567890',
      nickname: '小華'
    },
  }
  const {account, password} = req.body;
  if(! accounts[account]){
    output.code = 400;
    output.msg = '帳號或密碼錯誤';
    return res.json(output);
  }
  if(accounts[account].pw===password){
    output.success = true;

    req.session.admin = {
      account,
      nickname: accounts[account].nickname
    }
  } else {
    output.code = 420;
    output.msg = '帳號或密碼錯誤';
  }
  res.json(output);
});

app.get('/try-db', async (req, res)=>{
  const sql = "SELECT * FROM address_book LIMIT 5";

  const [rows, fields] = await db.query(sql)

  res.json({rows, fields});
});



// 靜態內容的資料夾
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/jquery", express.static("node_modules/jquery/dist"));

// 404
app.use((req, res) => {
  res.type("text/html").status(404).send(`<h1>找不到頁面</h1>`);
});

const port = process.env.WEB_PORT || 3001;
app.listen(port, () => {
  console.log(`express server 啟動 ${port}`);
});
