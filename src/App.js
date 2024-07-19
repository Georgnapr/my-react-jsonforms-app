import React, { useState } from 'react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { JsonLoader } from './components/JsonLoader';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider} from 'react-dnd';
import { DnDArea } from './components/DnDArea';
import { WidgetSpace } from './components/WidgetsArea';
import { baseForm } from './components/BaseForm';
import './App.css';



function App() {
  const initialData = {};
  const [data, setData] = useState(initialData);
  const [layoutWidgets, setLayoutWidgets] = useState([]);
  const [jsonSchema, setJsonSchema] = useState(baseForm);

  const [loadedState, setLoadedState] = useState(false);

  return (
      <>
        <DndProvider backend={HTML5Backend}>
            <div className='App'>
                {console.log(layoutWidgets)}
                <div className='workspace'>
                    <DnDArea jsonSchema={jsonSchema} setJsonSchema={setJsonSchema} loadedState={loadedState}
                    layoutWidgets={layoutWidgets} setLayoutWidgets={setLayoutWidgets}/>
                    <WidgetSpace />
                </div>
                {jsonSchema.uischema.elements.length > 0 ? (
                    <>
                        <h3>Form preview:</h3>
                        <div className='form-preview-wrapper'>
                            <JsonForms
                            schema={jsonSchema.schema}
                            uischema={jsonSchema.uischema}
                            data={jsonSchema.initialData}
                            renderers={materialRenderers}
                            cells={materialCells}
                            onChange={({ data, errors }) => setData(data)}
                            />
                        </div>
                        <JsonLoader jsonSchema={jsonSchema} setJsonSchema={setJsonSchema} setLayoutWidgets={setLayoutWidgets}/>
                    </>)
                    : 
                    (<JsonLoader jsonSchema={null} setJsonSchema={setJsonSchema} setLayoutWidgets={setLayoutWidgets}/>)}
            </div>
        </DndProvider>
    </>
  
  );
}

export default App;
