import React from 'react';
import ImageHandler from "./components/usplash-images/ImageHandler";
import Canvas from "./components/canvas/Canvas";
import {ImageContext, ImageProvider} from "./components/context/ImageContext";
import './App.css';

function App() {

  return (
      <ImageProvider>
          <div className={'gradient flex-center'}>
              <div className={'eighty-width flex-row-wrap'}>
                  <Canvas/>
              </div>
          </div>
          <div>
              <ImageHandler/>
          </div>
      </ImageProvider>
  );
}

export default App;
