import React from "react";
import ReactDOM from "react-dom";
import Images from "../Images";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {fetchData} from "../../../hooks/Hooks";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Images/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('loads images', async () => {
    const data = await fetchData(`https://api.unsplash.com/photos/?page=0&per_page=${12}&client_id=${process.env.REACT_APP_IMAGE_ACCESS}`);
    expect(data).toHaveLength(12)
});