export default (obj: { $ref?: string; $$ref?: string }) => {
    return obj.$$ref || obj.$ref;
};
