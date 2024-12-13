import  { Router } from 'express'
import { deleteUser, getOneUser, login, searchUser, signUp, updataUser, viewUsers } from '../Controller/authController'

const route = Router()

route.route("/create-user").post(signUp)
route.route("/login-user").post(login)
route.route("/search").get(searchUser)
route.route("/view").get(viewUsers)
route.route("/:userid/get-one-user").get(getOneUser)
route.route("/:userid/update").patch(updataUser)
route.route("/:userid/delete").delete(deleteUser)
export default route;