export default class User {
  uuid: string;
  username: string;
  email: string;
  role: string;
  access_token: string;

  constructor(
    uuid = '',
    username = '',
    email = '',
    role = '',
    access_token = ''
  ) {
    this.uuid = uuid;
    this.username = username;
    this.email = email;
    this.role = role;
    this.access_token = access_token;
  }
  
}
