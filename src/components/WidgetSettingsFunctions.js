export function LabelEditing(widget, data) {
    const updatedData = {
        ...widget,
        schema: {
            ...widget.schema,
            properties: {
                ...widget.schema.properties,
            },

        },
        uischema: {
            ...widget.uischema,
            elements: [
                {
                    ...widget.uischema.elements[0],
                    text: data.labeltext
                }
            ]
        },
    };
    return (updatedData);
};


export function InputEditing(widget, data){
    
    const propertyName = Object.keys(widget.schema.properties)[0]
    const updatedData = {
        ...widget,
        schema: {
            ...widget.schema,
            properties: {
                [propertyName]: {
                    ...widget.schema.properties[propertyName],
                    description: data.description,
                }
                
            },
        }, 
        uischema: {
            ...widget.uischema,
            elements: [
                {
                    ...widget.uischema.elements[0],
                    label: data.labeltext
                }
            ]
        },
        initialData: {
            [propertyName]: data.default,
        }
    }
    return ([updatedData, propertyName]);
}


export function ListboxEditing(widget, data){

    const propertyName = Object.keys(widget.schema.properties)[0]
    let editedEnumsKeys = Object.keys(data).filter(key => key.startsWith('value'));

    let newEnums = [...widget.schema.properties[propertyName].enum]
    editedEnumsKeys.forEach(key => {
        const index = parseInt(key.replace('value', ''), 10); // Извлекаем индекс из ключа
        newEnums[index] = data[key]; // Помещаем значение в массив на соответствующий индекс
      });
    const updatedData = {
        ...widget,
        schema: {
            ...widget.schema,
            properties: {
                [propertyName]: {
                    ...widget.schema.properties[propertyName],
                    enum: newEnums,
                    description: data.description,
                }
                
            },
        }, 
        uischema: {
            ...widget.uischema,
            elements: [
                {
                    ...widget.uischema.elements[0],
                    label: data.labeltext
                }
            ]
        },
        initialData: {
            [propertyName]: data.default,
        }
    }
    return ([updatedData, propertyName]);
}