import {makeAutoObservable} from 'mobx';
import { usePopupContext } from '@/context/PopupContext';

class scanStoryContainer {
    usersScans: any[] = [];
    constructor(){
        makeAutoObservable(this);
    }

    // Метод для добавления кода в массив
  addUserCode(code: any) {
    const { showPopup } = usePopupContext();
    const index = this.usersScans.findIndex(item => item.id === code.id && (item.data === code.data));
    console.log(index);
    if (index === -1) {
        this.usersScans.push(code);
        // console.log('Code added:', code);
        showPopup(`код - ${code.data} сохранен в историю`, 'success')
    } else {
        console.log('Code already exists:', code);
    }
  }

  // Метод для добавления кода в массив
  addTask(code: any) {
    const { showPopup } = usePopupContext();
    const index = this.usersScans.findIndex(item => item.id === code.id && (item.data === code.data));
    console.log(index);
    if (index === -1) {
        this.usersScans.push(code);
        // console.log('Code added:', code);
        showPopup(`код - ${code.data} сохранен в историю`, 'success')
    } else {
        console.log('Code already exists:', code);
    }
  }

    // Метод для удаления кода по индексу
    removeUserCode(id: number, code: string) {
    const { showPopup } = usePopupContext();

      const index = this.usersScans.findIndex(item => item.id === id && (item.data === code));
    // console.log(index,this.userCodes);
    showPopup(`код - ${code} удален из истории`, 'success')

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