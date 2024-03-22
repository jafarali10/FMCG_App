module.exports = function (mongoose, schema) {
    var ProductSchema = new schema({
        name: {
            type: String,
            default: '',
        },
        price: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        },
        isDelete: {
            type: Boolean,
            default: false
        },
        createdAt: { type: Date, default: new Date() },
        updatedAt: { type: Date, default: new Date() }
    }, { collection: 'product', versionKey: false });
    ProductSchema.set("timestamps", true)
    var Product = mongoose.model('product', ProductSchema);
    return Product;
}