import { useDrop } from 'react-dnd'
import { Widget } from './WidgetsArea'
import '../App.css'
import { useState } from 'react'
import { ModalWindow } from './ModalWindow'


export const DropTarget = ({ addDraggedItem, acceptedWidgets }) => {
    const [{ isOver }, drop] = useDrop({
        accept: acceptedWidgets,
        drop: (item) => addDraggedItem(item),

        collect: monitor => ({
            isOver: !!monitor.isOver(),
            didDrop: monitor.didDrop()
        })
    })

    return (
        <>
            <div className='drag-here' ref={drop} style={isOver ? { background: "skyblue", border: "solid 2px lightgrey" } : {}}>
                Drag Widgets Here
            </div>
        </>
    )
}

export function DnDArea({ jsonSchema, setJsonSchema, layoutWidgets, setLayoutWidgets}) {
    const [modalActive, setModalActive] = useState([false, null]);
    let currentId;
    if (layoutWidgets.length === 0) {
         currentId = -1 
    } else {
        currentId = layoutWidgets.reduce((max, widget) => (widget.id > max ? widget.id : max), layoutWidgets[0].id);
    };
    


    const createWidgetWithId = (widget, id) => {
        const updatedSchema = {
            properties: {}
        };

        const element = widget.uischema.elements[0];
        if (element.type === "Control") {
            const propertyName = `${Object.keys(widget.schema.properties)[0]}_${id}`;
            updatedSchema.properties[propertyName] = widget.schema.properties[Object.keys(widget.schema.properties)[0]];
            const updatedElement = {
                ...element,
                scope: `#/properties/${propertyName}`
            };

            return {
                schema: updatedSchema,
                uischema: {
                    type: widget.uischema.type,
                    elements: [updatedElement]
                },
                initialData: widget.initialData,
                specialData: {
                    ...widget.specialData,
                    id: id
                }
            };
        } else {
            // Если элемент не является "Control", возвращаем оригинальный виджет без изменений
            return widget;
        }
    };


    const addDraggedItem = (draggedItem) => {
        currentId++;
        const newDraggedItem = createWidgetWithId(draggedItem, currentId);
        setLayoutWidgets(layoutWidgets => [...layoutWidgets, { id: currentId, ...newDraggedItem }]);
        jsonSchema.specialData.push(newDraggedItem.specialData);
        const updatedSchema = {
            ...jsonSchema,
            schema: {
                ...jsonSchema.schema,
                properties: {
                    ...jsonSchema.schema.properties,
                    ...newDraggedItem.schema.properties
                },
            },
            uischema: {
                ...jsonSchema.uischema,
                elements: [
                    ...jsonSchema.uischema.elements,
                    ...newDraggedItem.uischema.elements
                ]
            },
            specialData: [
                ...jsonSchema.specialData,
            ],

        };
        setJsonSchema(updatedSchema);
    }

    // function modifyWidget(id, index) {
    //     let i = index
    //     const widget = layoutWidgets[id];
    //     setModalActive([true, widget]);
    // }

    const deleteDraggedItem = (id) => {

        const propertyName = Object.keys(layoutWidgets.find(widget => widget.id === id).schema.properties)[0];
        const newRequiredArray = jsonSchema.schema.required.filter(widget => widget !== propertyName);
        const newInitialData = Object.keys(jsonSchema.initialData).filter(widget => widget !== propertyName);
        const newLayoutWidgets = layoutWidgets.filter(widget => widget.id !== id);
        setLayoutWidgets(newLayoutWidgets);
        let newProperties = {};
        let newElements = [];
        let newSpecialData = [];

        newLayoutWidgets.forEach(widget => {
            newProperties = { ...newProperties, ...widget.schema.properties };
            newElements = [...newElements, ...widget.uischema.elements];
            newSpecialData = [...newSpecialData, widget.specialData]
        });

        const updatedSchema = {
            ...jsonSchema,
            schema: {
                ...jsonSchema.schema,
                properties: newProperties,
                required: newRequiredArray,
            },
            uischema: {
                ...jsonSchema.uischema,
                elements: newElements
            },
            specialData: newSpecialData,
            initialData: newInitialData
        };
        setJsonSchema(updatedSchema);
    };

    const updateWidgetData = (id, updatedData, newRequiredArray) => {
        const newLayoutWidgets = layoutWidgets.map(widget =>
            widget.id === id ? { ...updatedData } : widget
        );
        if (newRequiredArray === undefined){
            newRequiredArray = [...jsonSchema.schema.required]
        }
        setLayoutWidgets(newLayoutWidgets);
        let newInitialData = {...jsonSchema.initialData, ...updatedData.initialData}

        let newProperties = {};
        let newElements = [];
        let newSpecialData = [];

        newLayoutWidgets.forEach(widget => {
            newProperties = { ...newProperties, ...widget.schema.properties };
            newElements = [...newElements, ...widget.uischema.elements];
            newSpecialData = [...newSpecialData, widget.specialData]
        });

        const updatedSchema = {
            ...jsonSchema,
            schema: {
                ...jsonSchema.schema,
                properties: newProperties,
                required: newRequiredArray,
            },
            uischema: {
                ...jsonSchema.uischema,
                elements: newElements
            },
            specialData: newSpecialData,
            initialData: newInitialData,
        };
        setJsonSchema(updatedSchema);
    };

    return (
        <>
        <ModalWindow active={modalActive} setModalActive={setModalActive} jsonSchema={jsonSchema} setJsonSchema={setJsonSchema}
        layoutWidgets={layoutWidgets} setLayoutWidgets={setLayoutWidgets} updateWidgetData={updateWidgetData}/>
        <div className='dnd-area'>
            <DropTarget addDraggedItem={addDraggedItem} acceptedWidgets={["Widget", "CL"]} />
            {layoutWidgets.map((widget) =>
                <Widget key={widget.id} data={widget}
                    showButtons={true}
                    modifyWidget={() => setModalActive([true, widget])}
                    deleteWidget={() => deleteDraggedItem(widget.id)}
                    updateWidgetData={updateWidgetData} 
                    setModalActive={setModalActive}/>
            )}
        </div>
        </>

    )
}