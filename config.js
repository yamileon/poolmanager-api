exports.app = {
    PORT: 8080,
    MONGODB_URI: 'mongodb://'+process.env.MONGODB_HOST+':27017/qac',
    logErrors: true
};