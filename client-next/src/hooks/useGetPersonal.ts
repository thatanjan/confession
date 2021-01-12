import { ConfigInterface } from 'swr'
import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'

interface Props {
	userId: string
	swrOptions: ConfigInterface | undefined
}

const useGetPersonal = ({ userId, swrOptions }: Props) => {
	const mutation = getPersonalData('name bio skills')
	const options = { userId }
	const dependencies = [userId]

	return useSWRgql({ mutation, options, dependencies, swrOptions })
}

export default useGetPersonal
