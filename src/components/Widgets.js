
const InputWidget = {
    schema: {
        type: "object",
        properties: {
            name: {
                type: 'string'
            }
        }
    },
    
    uischema: {
        type: 'VerticalLayout',
        elements: [
            {
                type: "Control",
                scope: "#/properties/name"
            },
        ],
        
    },
    initialData: {
    },
    specialData: {
        id: 1,
        content: "Text input widget",
        type: "Widget",
        widget_type: "InputWidget"
    },
}
////////////////////////////////////////////////////////////////////////////////////
const InputNumberWidget = {
    schema: {
        type: "object",
        properties: {
            integer: {
                type: "integer"
          },
        }
    },
    
    uischema: {
        type: 'VerticalLayout',
        elements: [
            {
                type: "Control",
                scope: "#/properties/integer"
            },
        ],
        
    },
    initialData: {
    },
    specialData: {
        id: 2,
        content: "Number input widget",
        type: "Widget",
        widget_type: "InputNumberWidget"
    },
}
////////////////////////////////////////////////////////////////////////////////////
const CheckboxWidget = {
    schema: {
        properties: {
            boolean: {
                type: "boolean",
                description: "Boolean description as a tooltip"
            },
        }
    },
    uischema: {
        type: 'VerticalLayout',
        elements: [
            {
                type: "Control",
                scope: "#/properties/boolean"
            },
        ]
    },
    initialData: {
        
    },
    specialData: {
        id: 3,
        content: "Checkbox widget",
        type: "Widget",
        widget_type: "CheckboxWidget"
    },
}
////////////////////////////////////////////////////////////////////////////////////
const ListboxWidget = {
    schema: {
        properties: {
            enum: {
                type: "string",
                enum: [
                    "One",
                    "Two",
                    "Three"
                ],
            }
        },
    },
    uischema: {
        type: 'VerticalLayout',
        elements: [    
            {
                type: "Control",
                scope: "#/properties/enum",
            },
        ]
    },
    initialData: {
        
    },
    specialData: {
        id:4,
        content: "Listbox widget",
        type: "Widget",
        widget_type: "ListboxWidget"
    },
}
////////////////////////////////////////////////////////////////////////////////////
const RadioButtonsWidget = {
    schema: {
        properties: {
            exampleRadioEnum: {
              type: "string",
              enum: [
                "One",
                "Two",
                "Three"
              ]
            }
        }
    },
    uischema: {
        type: 'VerticalLayout',
        elements: [    
            {
                type: "Control",
                scope: "#/properties/exampleRadioEnum",
                options: {
                    format: 'radio'
                }
            },
        ]
    },
    initialData: {
        
    },
    specialData: {
        content: "Radiobuttons widget",
        id:5,
        type: "Widget",
        widget_type: "RadioButtonsWidget"
    },
}
////////////////////////////////////////////////////////////////////////////////////
const TwoColumnsWidget = {
    schema: {
        properties: {
        }
    },
    uischema: {
        type: 'VerticalLayout',
        elements: [    
            {
                type: "HorizontalLayout",
                elements: [
                    {},
                    {},
                ],
            },
        ]
    },
    initialData: {
        
    },
    specialData: {
        id:6,
        content: "2 columns layout",
        type: "CL",
        widget_type: "TwoColumnsWidget",
        columnsCount: 2,
    },
}
////////////////////////////////////////////////////////////////////////////////////
const ThreeColumnsWidget = {
    schema: {
        properties: {
        }
    },
    uischema: {
        type: 'VerticalLayout',
        elements: [    
            {
                type: "HorizontalLayout",
                elements: [
                    {},
                    {},
                    {},
                ]
            },
        ]
    },
    initialData: {
        
    },
    specialData: {
        id:7,
        content: "3 columns layout",
        type: "CL",
        widget_type: "ThreeColumnsWidget",
        columnsCount: 3,
    },
}

////////////////////////////////////////////////////////////////////////////////////
const Label =  {
    schema: {
        properties: {
        }
    },
    uischema: {
        type: 'VerticalLayout',
        elements: [    
            {
                type: "Label",
                text: "Form Title"
            },
        ]
    },
    initialData: {
        
    },
    specialData: {
        id:8,
        content: "Label",
        type: "Widget",
        widget_type: "Label",
    },
}
////////////////////////////////////////////////////////////////////////////////////
export const widgets = [InputWidget, InputNumberWidget, CheckboxWidget, ListboxWidget, RadioButtonsWidget, TwoColumnsWidget, ThreeColumnsWidget, Label];
