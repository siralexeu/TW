import React from 'react';
import {observer} from 'mobx-react';

import globalStore from '../store/store';

function Product(){
    return (
        <div>
            Producc
            <h1>{globalStore.name}</h1>
            <button onClick={() => globalStore.setName("Alex")}>Schimba numele global</button>

            <h1>{JSON.stringify(globalStore.obj)}</h1>
        </div>
    )
}

export default observer(Product);