import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const authMiddleware = async (req, res, next) => {
    try {

        // get the token from the request cookies
        const { token } = req.cookies;

        // return if token is not found
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        // console.log(decode)

        req.id = decode.userId

        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

}

export default authMiddleware;