import React from "react";
import ReactDOM from "react-dom";
import Canvas from "../Canvas";
import {render, getByTestId, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import ShallowRenderer from 'react-test-renderer/shallow';

let realUseContext;
let useContextMock;

beforeEach(() => { //This sets up the mock for context
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
});

afterEach(() => { //This will cleanup the mock context
    React.useContext = realUseContext;
});

test('image loads into canvas', () => {
    const img = document.createElement('img');
    const renderer = new ShallowRenderer();
    img.src = 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
    img.height = 200;
    img.width = 150;
    img.alt = 'test image';
    img.crossOrigin = '';

    useContextMock.mockReturnValue({
        image: img,
        setImage: () => {}
    });

    const container = renderer.render(
        <Canvas/>
    );

    expect(container.props['data-img']).toEqual(img.src)
});