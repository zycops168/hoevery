import User from '../models/UserModel.js';
import { observable, action} from 'mobx';

class UserController {
    @observable listUser = [];

    @action setListUser(listUser) {
        this.listUser = listUser;
    }
}

const userController = new UserController();

export default userController;