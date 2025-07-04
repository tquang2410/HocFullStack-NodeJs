require("dotenv").config();
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    // Danh sách các route không cần xác thực
    const whitelist = ["/", '/login', '/register'];
    // Nếu route nằm trong whitelist, cho phép tiếp tục
    if (whitelist.find(item => '/v1/api' + item === req.originalUrl)) {
        return next();
    }
    // Middleware để kiểm tra token
    if (req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];
        // Kiểm tra token hợp lệ
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Lưu thông tin người dùng vào req.user
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.log("Checking token:", token);
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = auth; //export default
