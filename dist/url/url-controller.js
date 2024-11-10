"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlShortner = urlShortner;
exports.redirect = redirect;
const url_model_1 = __importDefault(require("./url-model"));
function urlShortner(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { url } = req.body;
            if (url.length === 0) {
                throw new Error("URL should be provided");
            }
            let urlId = generateUrlId(url);
            while (!url_model_1.default.find({ urlId })) {
                urlId = generateUrlId(url);
            }
            const shortenedURLid = yield url_model_1.default.create({ url, urlId });
            const shortUrl = `${req.protocol}://${req.headers.host}/${shortenedURLid.urlId}`;
            res.render("shortened", { shortUrl, title: "URL Shortened" });
        }
        catch (err) {
            res.status(400);
            res.send(err.message);
        }
        finally {
            return;
        }
    });
}
function redirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { urlId } = req.params;
        try {
            const url = yield url_model_1.default.findOne({ urlId });
            if (url) {
                res.redirect(url.url);
            }
            else {
                res.status(404).send("URl not found");
            }
        }
        catch (err) {
            res.status(500);
            res.send(err.message);
        }
    });
}
function generateUrlId(url) {
    const letters = url.replace(/[^a-zA-Z]/g, "");
    let urlId = "";
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        urlId += letters[randomIndex];
    }
    return urlId;
}
