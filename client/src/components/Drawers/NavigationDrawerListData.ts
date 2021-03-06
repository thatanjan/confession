import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import HomeIcon from '@material-ui/icons/Home'
import FaceIcon from '@material-ui/icons/Face'

import { LOGOUT_URL, FOLLOWERS, FOLLOWING } from 'variables/global'

export interface Components {
	title: string
	Component: Function
	link: string
}

interface List {
	[index: number]: Components
	length: number
	map: Function
}

const listComponents: List = [
	{
		title: 'Home',
		Component: HomeIcon,
		link: '/',
	},
	{
		title: 'user',
		Component: AccountCircleIcon,
		link: '/profile',
	},
	{
		title: 'Videos',
		Component: VideoLibraryIcon,
		link: '/development',
	},
	{
		title: FOLLOWERS,
		Component: FaceIcon,
		link: '',
	},
	{
		title: FOLLOWING,
		Component: FaceIcon,
		link: '',
	},
	{
		title: 'Settings',
		Component: SettingsIcon,
		link: '/development',
	},
	{
		title: 'Log Out',
		Component: ExitToAppIcon,
		link: LOGOUT_URL,
	},
]

export default listComponents
