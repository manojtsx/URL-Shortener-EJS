"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const url_controller_1 = require("./url-controller");
router.route('/shorten').post(url_controller_1.urlShortner);
router.route('/:urlId').get(url_controller_1.redirect);
exports.default = router;
