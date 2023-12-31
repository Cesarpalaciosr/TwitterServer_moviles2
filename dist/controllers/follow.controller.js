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
exports.CheckFollow = exports.GetFollowing = exports.GetFollowers = exports.followorunfollow = void 0;
const follow_1 = __importDefault(require("../models/follow"));
const followorunfollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follow_1.default.find({
        idfollowing: req.body.idfollowing,
        idfollower: req.body.idfollower,
    });
    console.log(result.length);
    if (result.length == 0) {
        //GUARDAR Tweet
        const newLike = new follow_1.default(req.body);
        yield newLike.save();
        return res.status(201).json({ msg: "Ahora sigues a esta persona" });
    }
    yield follow_1.default.deleteOne({
        idfollowing: req.body.idfollowing,
        idfollower: req.body.idfollower,
    });
    return res.status(201).json({ msg: "Dejaste de seguir a esta persona" });
});
exports.followorunfollow = followorunfollow;
const GetFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follow_1.default.find({ idfollowing: req.body.idfollowing });
    return res.status(201).json(result.length);
});
exports.GetFollowers = GetFollowers;
const GetFollowing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follow_1.default.find({ idfollower: req.body.idfollower });
    return res.status(201).json(result.length);
});
exports.GetFollowing = GetFollowing;
const CheckFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield follow_1.default.find({
        idfollowing: req.body.idfollowing,
        idfollower: req.body.idfollower,
    });
    console.log(check.length);
    if (check.length == 0) {
        return res.status(201).json({ status: "false" });
    }
    return res.status(201).json({ status: "true" });
});
exports.CheckFollow = CheckFollow;
