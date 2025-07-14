import {makeAutoObservable} from 'mobx'

class GlobalStore{
    name="Ionut";
    obj = {
        id: 1,
        name:"Test"
    }

    constructor(){
        makeAutoObservable(this);
    }

    setName(value){
        this.name = value;
    }

    setObj(value){
        this.obj = value;
    }
}

const globalStore = new GlobalStore();
export default globalStore;