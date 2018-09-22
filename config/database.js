
if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI: process.env.MONGO_URI
    };
} else if (process.env.NODE_ENV === "development") {
    module.exports = {
        mongoURI: "mongodb://mongo:27017/mern_shopping-list"
    };
} else {
    module.exports = {
        mongoURI: "mongodb://localhost:27017/mern_shopping-list"
    };
}