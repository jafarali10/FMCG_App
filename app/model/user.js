module.exports = function (mongoose, schema) {
    var UserSchema = new schema({
        username: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        password: {
            type: String,
            default: '',
        },
        jwtLoginToken:{
            type: String,
            default: '',
        },
        role:{
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active'
        },
        isDelete: {
            type: Boolean,
            default: false
        },
        createdAt: { type: Date, default: new Date() },
        updatedAt: { type: Date, default: new Date() }
    }, { collection: 'user', versionKey: false });
    UserSchema.set("timestamps", true)
    var User = mongoose.model('user', UserSchema);

    return User;
}