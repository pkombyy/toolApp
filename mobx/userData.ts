import {makeAutoObservable} from 'mobx';

class userDataContainer {
    authData: any = null;
    constructor(){
        makeAutoObservable(this);
    }

    setAuthData(data:any){
        this.authData = data;
    }
}

const userData = new userDataContainer();
export default userData;