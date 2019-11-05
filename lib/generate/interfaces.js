"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 文件生成结果的状态
var Status;
(function (Status) {
    Status["success"] = "success";
    Status["error"] = "error";
})(Status = exports.Status || (exports.Status = {}));
// 注释类型
var CommentType;
(function (CommentType) {
    // 使用单行注释且位于属性之前 (//)
    CommentType[CommentType["single"] = 0] = "single";
    // 使用单行注释且位于属性后面 (//)
    CommentType[CommentType["singleRight"] = 1] = "singleRight";
    // 使用多行注释且位于属性之前 (/** */)
    CommentType[CommentType["multiline"] = 2] = "multiline";
})(CommentType = exports.CommentType || (exports.CommentType = {}));
//# sourceMappingURL=interfaces.js.map