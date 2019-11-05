import { CommentType } from './interfaces';

/**
 * 生成不同展示形式的注释
 */
export default (
    commentType: CommentType,
    comment: string = '',
    content: string,
    placeholder: string = ''
) => {
    const hasComment = !!comment;
    if (hasComment) {
        if (commentType === CommentType.multiline) {
            const currentComment = `${placeholder}${`
${placeholder}/**
${placeholder} * ${comment.replace(/\n/g, `\n${placeholder} * `)}
${placeholder} */
    `.trim()}\n${placeholder}`;
            return `${currentComment}${content}`;
        }

        if (commentType === CommentType.single) {
            const currentComment =
                placeholder +
                `
// ${comment.replace(/\n/g, `\n${placeholder}// `)}
    `.trim() +
                `\n${placeholder}`;
            return `${currentComment}${content}`;
        }

        if (commentType === CommentType.singleRight) {
            const currentComment = ` // ${comment.replace(/\n/g, ' ')}`;
            return `${placeholder}${content}${currentComment}`;
        }
    }

    return `${placeholder}${content}`;
};
