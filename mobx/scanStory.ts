import {makeAutoObservable} from 'mobx';
import { usePopupContext } from '@/context/PopupContext';

class scanStoryContainer {
    usersScans: any[] = [];
    constructor(){
        makeAutoObservable(this);
    }

    // Метод для добавления кода в массив
    addUserCode(code: string, showPopup: (message: string, type: string) => void) {
      const index = this.usersScans.findIndex(item => item === code);
      if (index === -1) {
          this.usersScans.push(code);
          showPopup(`код - ${code} сохранен в историю`, 'success');
      } else {
          console.log('код уже сохранен:', code);
      }
  }

    // Метод для удаления кода по индексу
    removeUserCode(code: string) {
      const index = this.usersScans.findIndex(item => item === code);
    if (index !== -1) {
          this.usersScans.splice(index, 1);
      }
    }

    // Метод для очистки массива кодов
    clearUserCodes() {
        this.usersScans = [];
    }
}

const scanStory = new scanStoryContainer();
export default scanStory;