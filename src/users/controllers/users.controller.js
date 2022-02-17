import usersService from "../services/users.service"

class UserController {
  constructor(usersService) {
    this.usersService = usersService
  }

  getUsers() {
    return this.usersService.getUsers()
    // return [
    //   {
    //     name: 'Chukwuma',
    //     age: 20
    //   },
    //   {
    //     title: 'City of Glass',
    //     age: 25,
    //   },
    //   {
    //     title: 'The Gotham city',
    //     age: 30
    //   }
    // ]
  }

  createUser() {
    return this.usersService.signUp()
  }
}

export default new UserController(usersService)