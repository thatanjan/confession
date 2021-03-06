import User from 'models/User'
import createPostModel from 'models/Post'
import sendErrorMessage from 'utils/errorMessage'
import { postProjection as projection } from 'variables/global'

const SINGLE_POST = 'singlePost'
const ALL_POST = 'allPost'

const mainResolver = field => {
	return async (_, { Input: { postID, user, skip } }, { user: { id } }) => {
		try {
			const Post = createPostModel(user)

			switch (field) {
				case SINGLE_POST:
					const post = await Post.findById(postID, {
						...projection,
						likes: { $elemMatch: { $eq: id } },
					})

					const userInfo = await User.findById(user, 'profile').populate({
						path: 'profile',
						select: 'profilePicture name',
					})

					const response = {
						post: {
							...post.toObject(),
							user: userInfo,
							hasLiked: post.likes.length === 1,
						},
					}

					return response

				case ALL_POST:
					const allPost = {}

					const posts = await Post.find(
						{},
						{
							...projection,
							likes: { $elemMatch: { $eq: id } },
						}
					)
						.skip(skip - 10)
						.limit(10)
						.sort({ _id: '-1' })

					allPost.posts = posts.map(thePost => {
						const newPost = thePost
						newPost.hasLiked = newPost.likes.length === 1
						return newPost
					})

					if (!posts) {
						return sendErrorMessage('something went wrong')
					}

					return allPost

				default:
					return sendErrorMessage('nothing found')
			}
		} catch (error) {
			return sendErrorMessage(error)
		}
	}
}

const resolver = {
	Query: {
		getAllPost: mainResolver(ALL_POST),
		getSinglePost: mainResolver(SINGLE_POST),
	},
}

export default resolver
