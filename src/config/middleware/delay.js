const delay = (req, res, next) => {
    // Simulate a delay of * second
    setTimeout(() => {
        if( req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({message: 'Unauthorized'});
            }
        }
        next();
    }, 3000); // 1000 milliseconds = 1 second
}
module.exports = delay; //export default