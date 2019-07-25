import { Schema } from '../interfaces';

export default (schema: Schema) => {
    console.log(schema);
    let targetName: string = '_Error_';
    if (schema.title) {
        targetName = schema.title;
    } else if (schema.xml && schema.xml.name) {
        targetName = schema.xml.name;
    } else if (schema.$$ref) {
        targetName = schema.$$ref.substr(schema.$$ref.lastIndexOf('/') + 1);
    }
    return targetName.replace(/(«|»|,)([a-zA-Z]?)/g, (searchValue, replaceValue) => {
        return searchValue.substring(1).toUpperCase();
    });
};
