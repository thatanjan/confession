import createPostModel from 'models/Post'
import sendMessage from 'utils/error'

const resolver = {
    Query: {
        getSinglePost: async (
            _,
            { Input: { postId, userId } },
            { user: { id } }
        ) => {
            const Post = createPostModel(userId || id)

            const singlePost = await Post.findById(postId, 'text')

            if (!singlePost) {
                return sendMessage(false, 'no post found')
            }

            return singlePost
        },
        getAllPost: async (_, { Input: { start } }, { user: { id } }) => {
            const Post = createPostModel(id)

            const allPost = {}

            allPost.posts = await Post.find({})
                .sort({ _id: '-1' })
                .skip(start)
                .limit(3)

            if (allPost.posts === []) {
                return sendMessage(false, 'you have no post')
            }

            return allPost
        },
    },
}

export default resolver
