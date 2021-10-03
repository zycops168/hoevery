import TypeCarModel from '../models/TypeCarModel';
import { observable, action} from 'mobx';

class CarController {
    @observable listCar = [];

    @action setListCar(listCar) {
        this.listCar = listCar;
    }
}

const carController = new CarController();

export default carController;