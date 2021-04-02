const ObjectId = require('mongoose').Types.ObjectId

exports.getupdatedPost = async (postid, Post) => {

    const unwantedFields = [
        'comments.__v',
        'comments._post',
        'likeCount.__v',
        'likeCount._post',
        'comments._id',
        'likeCount._id',
        'postedBy',
        'cloudinary_id',
        'author.password',
        'author.cloudinary_id',
        'author.email',
        'author.__v',
        '__v',

    ]
    try {
        const post = await Post.aggregate([
            { $match: { _id: ObjectId(postid) } },

            {
                $lookup: {
                    from: 'users',
                    localField: 'postedBy',
                    foreignField: '_id',
                    as: 'author'
                }
            },

            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: "_post",
                    as: "comments"
                }
            },


            {
                $lookup: {
                    from: "likeposts",
                    localField: "_id",
                    foreignField: '_post',
                    as: 'likeCount'
                }
            },
            { $unwind: { "path": "$author", "preserveNullAndEmptyArrays": true } },
            {
                $unwind: {
                    "path": "$comments", "preserveNullAndEmptyArrays": true
                }
            },
            { $unwind: { path: "$likeCount", "preserveNullAndEmptyArrays": true } },
            {
                $project: {
                    _id: 1,
                    'author': 1,
                    postMedia: 1,
                    likes: '$likeCount.likes',
                    comments: '$comments.comments'

                }
            },

            {
                $unset: [...unwantedFields]
            }

        ]);

        return post;
    } catch (error) {
        console.log(error)
    }
}