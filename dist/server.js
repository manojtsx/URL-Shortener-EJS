"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const url_route_1 = __importDefault(require("./url/url-route"));
const connect_1 = __importDefault(require("./utils/connect"));
const PORT = 3000;
app.set("view engine", "ejs");
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("", url_route_1.default);
app.get('/', (req, res) => {
    res.render('index', { title: 'URL Shortner' });
});
(0, connect_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`);
    });
})
    .catch((err) => {
    console.log(err.message);
});
