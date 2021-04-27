

const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    caption: String,

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    hasUserLiked: Boolean,
    postMedia: {
        type: String,
        required: true
    },
    cloudinary_id: String,

    date: {
        type: Date,

        default: Date.now()
    }

});

postSchema.pre('save', async function () {
    if (this.isNew) {
        try {
            const document = await Post.findOne({ _id: this.id });
            if (document) {
                throw new Error('post alredy exists')
            }
            await mongoose.model('LikePosts').create({ _post: this.id })
            // await mongoose.model('Following').create({ _user: this._id })

        } catch (error) {
            console.log(error)
        }

    }
})

module.exports = Post = mongoose.model('Posts', postSchema);