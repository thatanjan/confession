import {
	getAllPost,
	getSinglePost,
	getNewsFeedPost,
} from 'graphql/queries/postQueries'
import createRequest from 'utils/createRequest'
import useSWRgql from 'hooks/useSWRgql'
import { useSWRInfinite } from 'swr'

import { useUserID, useProfileUserID } from 'redux/hooks/stateHooks'

import { AnyObject } from 'interfaces/global'

const useGetAllPost = () => {
	const user = useProfileUserID()

	const getKey = (index: number, previousPageData: AnyObject) => {
		if (previousPageData && previousPageData.getAllPost.posts.length === 0)
			return null
		const skipnum: number = (index + 1) * 10

		return [getAllPost, skipnum, user]
	}

	return useSWRInfinite(
		getKey,
		async (key, num) => createRequest({ key, values: { skip: num, user } }),
		{ revalidateOnFocus: false }
	)
}

interface SinglePost {
	user: string
	postID: string
}

export const useGetSinglePost = ({ user, postID }: SinglePost) => {
	const values = { user, postID }
	return useSWRgql({
		key: getSinglePost,
		values,
		swrDependencies: postID,
	})
}

export const useGetNewsFeedPost = () => {
	const userID = useUserID()

	const getKey = (index: number, previousPageData: AnyObject) => {
		if (!userID) return null

		if (previousPageData && previousPageData.getNewsFeedPost.posts.length === 0)
			return null

		if (previousPageData && previousPageData.getNewsFeedPost.errorMessage)
			return null

		const skipnum: number = (index + 1) * 10

		return [getNewsFeedPost, skipnum, userID]
	}

	return useSWRInfinite(
		getKey,
		async (key, num) => createRequest({ key, values: { skip: num } }),
		{ revalidateOnFocus: false }
	)
}

export default useGetAllPost
