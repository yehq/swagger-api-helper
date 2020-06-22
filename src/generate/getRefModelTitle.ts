import { Schema } from '../interfaces';
import { getRef } from '../utils';

export default (schema: Schema) => {
    let targetName: string = '_Error_';
    const ref = getRef(schema);
    if (schema.title) {
        targetName = schema.title;
    } else if (ref) {
        targetName = ref.substr(ref.lastIndexOf('/') + 1);
        targetName = targetName.replace('models.', '');
    }
    return targetName.replace(/(«|»|,|\.|_|-)([a-zA-Z]?)/g, (searchValue, replaceValue) => {
        return searchValue.substring(1).toUpperCase();
    });
};
