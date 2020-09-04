import React from 'react';
import ImageHandler from "./components/usplash-images/ImageHandler";
import Canvas from "./components/canvas/Canvas";
import {ImageContext, ImageProvider} from "./components/context/ImageContext";
import './App.css';

function App() {

  return (
      <div>
          <ImageProvider>
              <Canvas/>
              <ImageHandler/>
          </ImageProvider>
      </div>
  );
}

export default App;
