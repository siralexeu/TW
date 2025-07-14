import React, {useState, useEffect} from 'react'

export default function Counter(){

    const [state, setState] = useState({
        counter:0,
        initialing: false
    });

    const [value, setValue] = useState(1);

    function increment(){
        setState({counter: state.counter +1 })
    }

    function decrement(){
        setState({counter: state.counter - 1 })
    }

    function initValue(){
        setValue(value + 1);
    }

    useEffect(() => {
        console.log('Component Did Mount and Update');

        return () => {
            console.log("Component Will Unmount")
        }
    }, [value])

    return <div>
        <button onClick={increment}> Increment</button>
        <button onClick={decrement}> Decrement</button>
        <button onClick={initValue}> Set Value</button>
        <div>
            Counter: {state.counter}
            <br/>
            Value: {value}
        </div>
    </div>
        

}