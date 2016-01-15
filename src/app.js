import React from 'react';
import { render } from 'react-dom';
import JohnnyFeeder from './containters/johnnyFeeder.jsx';


const rootElement = document.getElementById('johnnyfeeder');
render(
    <JohnnyFeeder />,
    rootElement
);
