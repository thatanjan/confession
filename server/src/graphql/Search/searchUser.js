import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Query: {
		searchUser: async (_, { text }) => {
			try {
				const result = await Profile.find(
					{
						$text: {
							$search: text,
						},
					},
					{ name: 1, user: 1, profilePicture: 1 }
				).sort({ score: { $meta: 'textScore' } })

				return { users: result }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolvers
