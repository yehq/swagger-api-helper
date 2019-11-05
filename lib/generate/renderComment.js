"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
/**
 * 生成不同展示形式的注释
 */
exports.default = (function (commentType, comment, content, placeholder) {
    if (comment === void 0) { comment = ''; }
    if (placeholder === void 0) { placeholder = ''; }
    var hasComment = !!comment;
    if (hasComment) {
        if (commentType === interfaces_1.CommentType.multiline) {
            var currentComment = "" + placeholder + ("\n" + placeholder + "/**\n" + placeholder + " * " + comment.replace(/\n/g, "\n" + placeholder + " * ") + "\n" + placeholder + " */\n    ").trim() + "\n" + placeholder;
            return "" + currentComment + content;
        }
        if (commentType === interfaces_1.CommentType.single) {
            var currentComment = placeholder +
                ("\n// " + comment.replace(/\n/g, "\n" + placeholder + "// ") + "\n    ").trim() +
                ("\n" + placeholder);
            return "" + currentComment + content;
        }
        if (commentType === interfaces_1.CommentType.singleRight) {
            var currentComment = " // " + comment.replace(/\n/g, ' ');
            return "" + placeholder + content + currentComment;
        }
    }
    return "" + placeholder + content;
});
//# sourceMappingURL=renderComment.js.map