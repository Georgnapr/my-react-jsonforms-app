import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { widgets } from './Widgets';
import { DropTarget } from './DnDArea';

export const Widget = ({ data, showButtons, deleteWidget, updateWidgetData, modifyWidget, setModalActive }) => {
    const [{ isDragging }, drag] = useDrag({
        type: data.specialData.type,
        item: data,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    //Хук для обновления состояния колонок в виджетах. Для каждого MultiColumnWidget создает массив columns,
    //заполненный "ячейками" для размещения виджетов. Кол-во ячеек зависит от кол-ва прописанного в specialdata
    //по умолчанию ячейки равны null, за каждую ячейку со значением по умолчанию в виджете создаётся DropTarget
    const [columns, setColumns] = useState(() => {
        const initialColumns = Array.from({ length: data.specialData.columnsCount }, () => ({
            widget: null,
        }));
        return initialColumns;
    });


    //Пересоздает схему вставляемого в MultiColumnWidget виджета добавляя к его названию айди
    // в формате: name_parentId_position, где id - это айди виджета с несколькими колонками,
    // а position - текущая позиция в этом виджете. Так например для виджета типа integer, вставленного в ThreeColumnsWidget
    //с id 17 на вторую позицию, новое имя будет: integer_17_1
    const createWidgetWithId = (widget, parentId, position) => {
        const updatedSchema = {
            properties: {},
        };

        const element = widget.uischema.elements[0];
        if (element.type === 'Control') {
            const propertyName = `${Object.keys(widget.schema.properties)[0]}_${parentId}_${position}`;
            updatedSchema.properties[propertyName] =
                widget.schema.properties[Object.keys(widget.schema.properties)[0]];
            const updatedElement = {
                ...element,
                scope: `#/properties/${propertyName}`,
            };
            const id = parentId + '.' + position

            return {
                id: id,
                schema: updatedSchema,
                uischema: {
                    type: widget.uischema.type,
                    elements: [updatedElement],
                },
                initialData: widget.initialData,
                specialData: {
                    ...widget.specialData,
                },
            };
        } else {
            return widget;
        }
    };

    //Функция для добавления виджетов в MultiColumnWidgets. Добавляет новые элементы в схему, а затем
    //обновляет схему виджета при помощи функции updateWidgetData в файле DnDArea
    const addDraggedItem = (draggedItem, position) => {
        const parentId = data.id;
        const newDraggedItem = createWidgetWithId(draggedItem, parentId, position);

        const updatedColumns = [...columns];
        updatedColumns[position] = { widget: newDraggedItem };
        setColumns(updatedColumns);

        const updatedElements = [...data.uischema.elements[0].elements];
        updatedElements[position] = newDraggedItem.uischema.elements[0];

        const updatedData = {
            ...data,
            schema: {
                ...data.schema,
                properties: {
                    ...data.schema.properties,
                    ...newDraggedItem.schema.properties,
                },
            },
            uischema: {
                ...data.uischema,
                elements: [
                    {
                        ...data.uischema.elements[0],
                        elements: updatedElements,
                    },
                ],
            },
        };
        updateWidgetData(data.id, updatedData);
    };

    //Функция для удаления виджетов из MultiColumnWidgets. Удаляет элементы из схемы, а затем
    //обновляет схему виджета при помощи функции updateWidgetData в файле DnDArea
    function removeDraggedItem (position) {
        const updatedColumns = [...columns];
        updatedColumns[position] = { widget: null };
        setColumns(updatedColumns);

        const updatedElements = [...data.uischema.elements[0].elements];
        updatedElements[position] = null;

        let newProperties = {};
        let newElements = [];

        updatedColumns.forEach(column => {
            if (column.widget) {
                newProperties = { ...newProperties, ...column.widget.schema.properties };
                newElements = [...newElements, ...column.widget.uischema.elements];
            }
            else {
                newProperties = { ...newProperties };
                newElements = [...newElements, {}];
            }
        });

        const updatedData = {
            ...data,
            schema: {
                ...data.schema,
                properties: newProperties,
            },
            uischema: {
                ...data.uischema,
                elements: [
                    {
                        ...data.uischema.elements[0],
                        elements: newElements,
                    },
                ],
            },
        };
        updateWidgetData(data.id, updatedData);
    };

    //TODO: в теории можно передать весь виджет с лайаутами и передать айди редактируемого виджета
    // function modifyWidget1(id, widget) {
    //     modifyWidget(id, widget)
    // }

    if (data.specialData.type === 'Widget') {
        if (!showButtons) {
            return (
                <div className={isDragging ? 'widget is-dragging' : 'widget'} ref={drag}>
                    <div className="buttonspace">
                    </div>
                    {data.specialData.content}
                </div>
            );
        } else {
            return (
                showButtons &&
                <div className={isDragging ? 'widget is-dragging' : 'widget'}>
                    <div className="buttonspace">
                        <button className="del-button edit-button" onClick={modifyWidget}></button>
                        <button className="del-button" onClick={deleteWidget}></button>

                    </div>
                    {data.specialData.content}
                </div>
            )
        }
    } else if (!showButtons) {
        return (
            <div className={isDragging ? 'widget is-dragging' : 'widget'} ref={drag}>
                <div className="buttonspace"></div>
                {data.specialData.content}
            </div>
        );
    } else {
        return (
            <div className={isDragging ? 'widget is-dragging bigger-widget' : 'widget bigger-widget'}>
                <button className="del-button" onClick={deleteWidget}></button>
                <div className="multicolumn-drop-targets">
                    {columns.map((column, index) =>
                        column.widget ? (
                            <div key={index} className="multicolumn-drop-target">
                                <Widget
                                    data={column.widget}
                                    showButtons={true}
                                    deleteWidget={() => removeDraggedItem(index)}
                                    modifyWidget={() => setModalActive([true, column.widget])}
                                    setModalActive={setModalActive}
                                />
                            </div>
                        ) : (
                            <div key={index} className="multicolumn-drop-target">
                                <DropTarget
                                    addDraggedItem={(item) => addDraggedItem(item, index)}
                                    acceptedWidgets={'Widget'}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
};

export function WidgetSpace() {
    return (
        <div className="widgetspace">
            {widgets.map((widget) => (
                <Widget
                    key={widget.specialData.id}
                    data={widget}
                    showButtons={false}
                    deleteWidget={false}
                />
            ))}
        </div>
    );
}
