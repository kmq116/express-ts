import type { Request, Response } from 'express'
import UserModel from '../models/user/user'
import { MD5 } from '../utils/token'
interface User {
  username: string
  password: string
}
class User {
  constructor() {}

  /**
   * 登录
   * @param req Request
   * @param res Response
   */
  async login(req: Request, res: Response) {
    const { username, password } = req.body
    if (!username || !password) {
      return res.send({
        code: -1,
        msg: '用户名或密码不能为空',
      })
    }
    const token = MD5(username + password)
    try {
      const user = await UserModel.findOne({ username })

      if (user && user.password === MD5(password)) {
        res.send({
          code: 200,
          message: '登录成功',
          token,
        })
      }
      else {
        res.send({
          code: 500,
          message: '登录失败，用户不存在或密码错误',
        })
      }
    }
    catch (e) {
      res.send({
        code: 501,
        message: '登录错误',
      })
    }
  }

  async register(req: Request, res: Response) {
    const { username, password } = req.body
    if (!username || !password) {
      return res.send({
        code: -1,
        msg: '用户名或密码不能为空',
      })
    }

    const md5password = MD5(password)
    try {
      const user = await UserModel.findOne({ username })
      console.error(user)

      if (user) {
        return res.send({
          code: 201,
          message: '用户名已经存在，请选择其他用户名',
        })
      }

      const userData = new UserModel({
        username,
        password: md5password,
      })

      const saveData = await userData.save()
      if (saveData) {
        res.send({
          code: 200,
          message: '用户注册成功',
        })
      }
    }
    catch (e) {
      console.error(e)
      res.send({ code: 500, message: '注册失败' })
    }
  }
}

export default new User()
