import React from 'react';
import {observer} from 'mobx-react';

import globalStore from '../store/store';

function Child(){
    return (
        <div>
            Child

            <h2>{globalStore.name}</h2>
            <button onClick={() => globalStore.setObj({id: 2, name:"Test2"})}>Schimba obj</button>
        </div>
    )
}

export default observer(Child);