import authService from "../services/auth.service"

class AuthController {
  constructor(usersService) {
    this.usersService = usersService
  }

  async getUsers() {
    return await this.usersService.getUsers()
  }

  async createUser(user) {
    return await this.usersService.createUser(user)
  }
}

export default new AuthController(authService)