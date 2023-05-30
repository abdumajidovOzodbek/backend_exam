const manager = { admin: "ozod", password: "12345678" };
const PORT =process.env.PORT || 5000
const SECRET_KEY = process.env.SECRET_KEY || 'secret'

export {
    manager,
    PORT,
    SECRET_KEY
}