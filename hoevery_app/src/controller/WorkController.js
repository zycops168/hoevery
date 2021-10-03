import User from '../models/TypeWorkModel';
import { observable, action} from 'mobx';

class WorkController {
    @observable Work = [];

    @action setWork(Work) {
        this.Work = Work;
    }
}

const workController = new WorkController();

export default workController;