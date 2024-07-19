import "../App.css"
import { useState, useEffect } from "react";
import { baseForm } from './BaseForm';

export function JsonLoader({jsonSchema, setJsonSchema, setLayoutWidgets}){
    const [fileContent, setFileContent] = useState(null);
    
    useEffect(() => {
        jsonSchema !== null && (setFileContent(JSON.stringify(jsonSchema)));
    }, [jsonSchema]);

    let currentId;
    const uploadWidgetData = (jsonSchema) => {
        currentId = -1;
        setLayoutWidgets([]);
        let newLayoutWidgets = [];
        const regex = /[^/]+$/;
        let splitParts = [];
        let currentElementIndex;
        jsonSchema.uischema.elements.forEach(element => {
            currentId++
            currentElementIndex = jsonSchema.uischema.elements.indexOf(element);

            if (jsonSchema.specialData[currentElementIndex].type === "Widget") {
                splitParts.push( jsonSchema.uischema.elements[currentElementIndex].scope !== undefined ?
                jsonSchema.uischema.elements[currentElementIndex].scope.match(regex)[0] : null)
            } else {
                let columnsQuantity = jsonSchema.specialData[currentElementIndex].columnsCount;
                for (let i = 0; i < columnsQuantity; i++) {
                    splitParts.push( jsonSchema.uischema.elements[currentElementIndex].elements[i].scope !== undefined ?
                        jsonSchema.uischema.elements[currentElementIndex].elements[i].scope.match(regex)[0] : null)
                }
            }
            
            const properties = {};
            for (let i = 0; i < splitParts.length; i++) {
                if (splitParts[i]) {
                    properties[splitParts[i]] = jsonSchema.schema.properties[splitParts[i]];
                }
            }

            newLayoutWidgets = [...newLayoutWidgets, { 
                id: currentId, 
                uischema: {
                    type: 'VerticalLayout',
                    elements: [
                        jsonSchema.uischema.elements[currentElementIndex],
                    ],
                },
                schema: {
                    type: 'object',
                    properties: properties,
                },
                initialData: {
                },
                specialData: jsonSchema.specialData[currentElementIndex],
            }]
        })
        setLayoutWidgets(newLayoutWidgets);
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
            const json = JSON.parse(e.target.result);
            setFileContent(e.target.result);
            uploadWidgetData(json);
            setJsonSchema(json);
            };
            reader.readAsText(file); 
        }

    };

    const downloadJson = () => {
        let blob = new Blob([fileContent], {type:'application/json'});
        let link = document.createElement('a');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', 'JsonForms_Schema');
        link.click();
    }
    //TODO: лейбл отдельным виджетом
    const clearJson = () => {
        setJsonSchema(baseForm);
        setLayoutWidgets([]);
    }

    return (
        <div className="jsonLoaderContainer">
            <br></br>
            {fileContent !== null && (
                <>
                    <h3>JSON:</h3>
                    <div className='jsonViewer'>{fileContent}</div>
                    <button onClick={clearJson}>Очистить Json</button>
                    <button onClick={downloadJson}>Скачать Json</button>
                </>
            )}

            <input type="file" accept=".json" id="input1" onChange={handleFileChange}/>
            <br></br>
        </div>
    )
}