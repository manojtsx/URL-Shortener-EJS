import express, { Request, Response } from "express";
const app = express();
import path from "path";
import URlRoute from "./url/url-route";
import connect from "./utils/connect";
const PORT = 3000;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));

app.use("", URlRoute);

app.get('/',(req:Request, res: Response)=>{
  res.render('index',{title : 'URL Shortner'})
})

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
