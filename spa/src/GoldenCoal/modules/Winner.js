import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import Store from '../store'
import Index from '../components/pages/Winner'

const id = 'pharmacy-winner-app';
const app = document.getElementById(id);
if (!app) {
    throw 'No DOM element with id: ' + id
}

render(
    <Provider store={Store}>
        <Index/>
    </Provider>,
    app
);