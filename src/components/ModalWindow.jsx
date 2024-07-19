import React, { useState, useEffect } from 'react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import '../App.css';
import { widgetSettings } from './WidgetSettings';
import { LabelEditing } from './WidgetSettingsFunctions';
import { InputEditing } from './WidgetSettingsFunctions';
import { ListboxEditing } from './WidgetSettingsFunctions';
export function ModalWindow({ active, setModalActive, jsonSchema, setJsonSchema,
    layoutWidgets, setLayoutWidgets, updateWidgetData }) {
        
    const [requiredArray, setRequiredArray] = useState([]);
    const [data, setData] = useState([]);

    let jsonEditingForm;
    if (active[0]) {
        //TODO: выбирать jsonEditingForm в зависимости от widget_type текущего редактируемого виджета
        jsonEditingForm = widgetSettings.find(widget => widget.widget_type === active[1].specialData.widget_type)
    }

    useEffect(() => {
        if (active[0]) {
            setData(jsonEditingForm.initialData);
        }
    }, [active]);

    const closeModal = () => {
        setModalActive([false, null]);
    }
    if(active[1] && (active[1].specialData.widget_type === "ListboxWidget" || 
        active[1].specialData.widget_type === "RadioButtonsWidget")) {
        const propertyName = Object.keys(active[1].schema.properties)[0]
        active[1].schema.properties[propertyName].enum.forEach(value => {
            jsonEditingForm = {
                ...jsonEditingForm,
                schema: {
                    ...jsonEditingForm.schema,
                    properties: {
                        ...jsonEditingForm.schema.properties,
                        [`value${active[1].schema.properties[propertyName].enum.indexOf(value).toString()}`]: {
                            type: "string",
                        },
                    },
                },
                uischema: {
                    ...jsonEditingForm.uischema,
                    elements: [
                        ...jsonEditingForm.uischema.elements,
                        {
                            type: "Control",
                            scope: `#/properties/value${active[1].schema.properties[propertyName].enum.indexOf(value).toString()}`,
                        },
                    ]
                }

            };
        });
    }


    const editWidget = (widget, data) => {
        
        //TODO: переделать уникально для каждого виджета, работает только для виджетов вне лэйаутов
        let updatedData, propertyName;
        const id = widget.id

        switch(widget.specialData.widget_type) {
            case "Label":
                updatedData = LabelEditing(widget, data)
                break;
            case "ListboxWidget":
                var inputEditingResultArray = ListboxEditing(widget, data)
                updatedData = inputEditingResultArray[0]
                propertyName = inputEditingResultArray[1]
                break;
            case "RadioButtonsWidget":
                var inputEditingResultArray = ListboxEditing(widget, data)
                updatedData = inputEditingResultArray[0]
                propertyName = inputEditingResultArray[1]
                break;
            default: 
                var inputEditingResultArray = InputEditing(widget, data)
                updatedData = inputEditingResultArray[0]
                propertyName = inputEditingResultArray[1]
                break;
        }

        if (data.required === true){
            if (requiredArray.find((element) => element === propertyName) === undefined){
                requiredArray.push(propertyName)
                setRequiredArray(requiredArray)
            }
    
        } else {
            let index = requiredArray.indexOf(propertyName)
            requiredArray.splice(index, 1)
            setRequiredArray(requiredArray)
        }
        updateWidgetData(id, updatedData, requiredArray)
    }

    return (
        <div className={active[0] === true ? "modal-window active" : "modal-window"}>
            <div className="modal-wrapper">
                <div className="modal-content">
                    <div className='buttonspace2'>
                        <button onClick={closeModal} className='del-button close-button'></button>
                    </div>
                    <h4>НЕ РАБОТАЕТ ПРИ РАБОТЕ С ВИДЖЕТАМИ ИЗ ЛЭЙАУТОВ</h4>
                    {active[0] &&
                        <JsonForms
                            schema={jsonEditingForm.schema}
                            uischema={jsonEditingForm.uischema}
                            data={data}
                            renderers={materialRenderers}
                            cells={materialCells}
                            onChange={({ data, errors }) => setData(data)}
                        />
                    }
                    {(active[1] && (active[1].specialData.widget_type === "ListboxWidget" || active[1].specialData.widget_type === "RadioButtonsWidget")) 
                        ? <button>Add new value (не работает)</button> 
                        : null
                    }

                    <button onClick={() => {
                        if (data && Object.keys(data).length > 0) {
                            editWidget(active[1], data);
                            closeModal();
                        }
                    }}>Save settings</button>
                </div>
            </div>
        </div>
    )
}
