
const { MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } = process.env
module.exports = async function (mongoose) {
    let dbconnect = new Promise((resolve, reject) => {
        var url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;
        console.log("DB url ->", url);
        mongoose.set('debug', false);
        let options = {}
        mongoose.connect(url, options).
            then(async () => {
                resolve('Database connected successfully...');
            }).catch(err => {
                console.log("err -->", err);
                reject('Database connection error');
            })
    });
    return dbconnect;
}