import _ from 'lodash'
import { Request, Response } from 'express'
import { LoginInput, RegisterInput } from '../types/auth.type'
import { setCookie } from '../utils/cookie'
import authService from '../services/authService'
import { sendResponseSuccess } from '../utils/response'

class authController {
  // Đăng nhập
  async login(req: Request, res: Response) {
    const loginData: LoginInput = req.body

    const data = await authService.login(loginData)

    setCookie(res, 'refresh_token', data.refresh_token as string)

    sendResponseSuccess(res, _.omit(data, 'refresh_token'))
  }

  // Đăng ký
  async register(req: Request, res: Response) {
    const dataRegister: RegisterInput = req.body

    const data = await authService.register(dataRegister)

    sendResponseSuccess(res, data)
  }

  // Refresh Access Token
  async refreshAccessToken(req: Request, res: Response) {
    const refresh_token: string = req.cookies.refresh_token

    const data = await authService.refreshAccessToken(refresh_token)

    setCookie(res, 'refresh_token', data.new_refresh_token as string)

    sendResponseSuccess(res, _.omit(data, 'new_refresh_token'))
  }
}

export default new authController()
