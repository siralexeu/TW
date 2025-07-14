import React from 'react';
import {observer} from 'mobx-react';
import Child from './Child';

import globalStore from '../store/store';


function Data(){
    return (
        <div>
            Data

            <Child/>
        </div>
    )
}

export default observer(Data)