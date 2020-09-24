import React from 'react';
import Canvas from "./components/canvas/Canvas";
import {ImageProvider} from "./components/context/ImageContext";
import './styles/style.less';

function App() {

  return (
      <ImageProvider>
          <div className={'gradient flex-center'}>
              <div className={'eighty-width flex-row-wrap'}>
                  <Canvas/>
              </div>
          </div>
      </ImageProvider>
  );
}

export default App;
