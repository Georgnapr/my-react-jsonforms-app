const InputWidget = {
    widget_type: "InputWidget",
    schema: {
        type: "object",
        properties: {
            labeltext: {
                type: "string",
            },
            description: {
                type: "string",
            },
            default: {
                type: "string",
            },
            required: {
                type: "boolean",
            },
        },
    },
    uischema: {
        type: "VerticalLayout",
        elements: [
            {
                type: "Control",
                scope: "#/properties/labeltext",
                label: "Input field label text"
            },
            {
                type: "Control",
                scope: "#/properties/description",
                label: "Input field description"
            },
            {
                type: "Control",
                scope: "#/properties/default",
                label: "Input field default value"
            },
            {
                type: "Control",
                scope: "#/properties/required",
                label: "Will this field be required"
            },
        ]
    }
};

const InputNumberWidget = {
    widget_type: "InputNumberWidget",
    schema: {
        type: "object",
        properties: {
            labeltext: {
                type: "string",
            },
            description: {
                type: "string",
            },
            default: {
                type: "integer",
            },
            max_value: {
                type: "integer",
            },
            required: {
                type: "boolean",
            },
        },

    },
    uischema: {
        type: "VerticalLayout",
        elements: [
            {
                type: "Control",
                scope: "#/properties/labeltext",
                label: "Number field label text"
            },
            {
                type: "Control",
                scope: "#/properties/description",
                label: "Number field description"
            },
            {
                type: "Control",
                scope: "#/properties/default",
                label: "Number field default value"
            },
            {
                type: "Control",
                scope: "#/properties/max_value",
                label: "Number field max value"
            },
            {
                type: "Control",
                scope: "#/properties/required",
                label: "Will this field be required"
            },
        ]
    }
};

//TODO:для каждого значеения создавать input field, а так же кнопку для новых значений
const ListboxWidget = {
    widget_type: "ListboxWidget",
    schema: {
        type: "object",
        properties: {
            labeltext: {
                type: "string",
            },
            description: {
                type: "string",
            },
            values: {
                type: "string",
                enum: [
                    "One",
                    "Two",
                    "Three"
                ],
            },
        },

    },
    uischema: {
        type: "VerticalLayout",
        elements: [
            {
                type: "Control",
                scope: "#/properties/labeltext",
                label: "Listbox label text"
            },
            {
                type: "Control",
                scope: "#/properties/description",
                label: "Listbox description"
            },
            {
                type: "Control",
                scope: "#/properties/values",
                label: "Listbox values"
            },
            {
                type: "Control",
                scope: "#/properties/required",
                label: "Will this field be required"
            },
        ]
    }
};

const RadioButtonsWidget = {
    widget_type: "RadioButtonsWidget",
    schema: {
        type: "object",
        properties: {
            labeltext: {
                type: "string",
            },
            description: {
                type: "string",
            },
        },
    },
    uischema: {
        type: "VerticalLayout",
        elements: [
            {
                type: "Control",
                scope: "#/properties/labeltext",
                label: "Radiobuttons label text"
            },
            {
                type: "Control",
                scope: "#/properties/description",
                label: "Radiobuttons description"
            },
            {
                type: "Control",
                scope: "#/properties/required",
                label: "Will this field be required"
            },
        ]
    }
};
const CheckboxWidget = {
    widget_type: "CheckboxWidget",
    schema: {
        type: "object",
        properties: {
            labeltext: {
                type: "string",
            },
            description: {
                type: "string",
            },

        },
    },
    uischema: {
        type: "VerticalLayout",
        elements: [
            {
                type: "Control",
                scope: "#/properties/labeltext",
                label: "Checkbox label text"
            },
            {
                type: "Control",
                scope: "#/properties/description",
                label: "Checkbox description"
            },
        ]
    }
};
const Label = {
    widget_type: "Label",
    schema: {
        type: "object",
        properties: {
            labeltext: {
                type: "string"
            }
        },
    },
    uischema: {
        type: "VerticalLayout",
        elements: [
            {
                type: "Control",
                scope: "#/properties/labeltext",
                label: "Label Text"
            }
        ]
    }
};
export const widgetSettings = [ListboxWidget, InputNumberWidget, InputWidget, RadioButtonsWidget, Label, CheckboxWidget]