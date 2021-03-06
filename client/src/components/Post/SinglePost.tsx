import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Image from 'next/image'
import { responseInterface } from 'swr'

import { useGetTotalComment } from 'hooks/commentHooks'
import useSmallerThanXS from 'hooks/mediaQueries/useSmallerThanXS'

import MuiLink from 'components/Links/MuiLink'
import { DropDownMenuOption } from 'components/AppBars/AppHeaderMenus'

import { cloudinaryURL } from 'variables/global'
import PostType from 'interfaces/post'

const LikePost = dynamic(() => import('./LikePost'))

const PostContent = dynamic(() => import('./PostContent'))

const DropDownMenu = dynamic(
	() => import('components/DropDownMenu/DropDownMenu')
)

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: '100%',
		marginTop: theme.spacing(4),
	},
	imageHover: {
		cursor: 'pointer',
	},
	cardHeaderStyle: {
		[theme.breakpoints.down('md')]: {
			'& > .MuiCardHeader-title': {
				backgroundColor: 'red',
				fontSize: '1.3rem',
			},
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '5px',
		},
	},
	noShadow: {
		boxShadow: 'none',
	},
	CardActionsStyle: {
		justifyContent: 'space-evenly',
	},
}))

interface Props extends PostType {
	postPage: boolean
}

const SinglePost = ({
	title,
	image,
	content,
	_id: postID,
	user: {
		_id: postUserID,
		profile: { name, profilePicture },
	},
	totalLikes,
	totalComments,
	postPage,
	date,
	hasLiked,
}: Props) => {
	const matches = useSmallerThanXS()

	const { push } = useRouter()

	const {
		CardActionsStyle,
		noShadow,
		root,
		imageHover,
		cardHeaderStyle,
	} = useStyles()

	const moreOptions: DropDownMenuOption[] = [
		new DropDownMenuOption('save', '/development'),
		new DropDownMenuOption('Report', '/development'),
	]

	const showMoreLink = `/post/${postUserID}/${postID}`

	const loveProps = { postID, postUserID, totalLikes, hasLiked }

	const postContentProps = { content, postPage, showMoreLink }

	const redirectToPostPage = () => {
		push(showMoreLink)
	}

	let totalNumberOfComments: number | undefined

	const totalCommentsResult: responseInterface<
		any,
		any
	> | null = useGetTotalComment({
		postPage,
		postUserID,
		postID,
	})

	if (totalCommentsResult?.error) {
		return <SwrErrorAlert />
	}

	if (totalCommentsResult?.data) {
		const data = totalCommentsResult?.data
		totalNumberOfComments = data?.getTotalComments?.totalComments
	}

	return (
		<Card
			className={root}
			classes={{
				root: postPage ? noShadow : undefined,
			}}
		>
			<CardHeader
				className={cardHeaderStyle}
				avatar={
					<MuiLink
						MuiComponent={Avatar}
						alt={name}
						href={`/profile/${postUserID}`}
						src={cloudinaryURL(profilePicture)}
					/>
				}
				action={
					<>
						<DropDownMenu
							aria-controls='fade-menu'
							aria-haspopup='true'
							options={moreOptions}
							IconComponent={MoreVertIcon}
						/>
					</>
				}
				title={title}
				titleTypographyProps={{
					variant: 'h6',
					component: 'h1',
				}}
				subheader={
					<>
						<Typography component='span' variant='body2'>
							{new Date(date).toDateString()},{' by '}
						</Typography>
						<MuiLink
							href={`/profile/${postUserID}`}
							MuiComponent={Typography}
							color='textPrimary'
							component='span'
							variant='body2'
						>
							{name}
						</MuiLink>
					</>
				}
			/>
			<Image
				src={image}
				className={imageHover}
				layout='responsive'
				height={720}
				width={1280}
				objectFit='cover'
				quality={50}
				onClick={redirectToPostPage}
			/>
			<CardActions disableSpacing className={CardActionsStyle}>
				<LikePost {...loveProps} />

				<Box>
					<Typography variant='caption'>
						{totalNumberOfComments || totalComments}
					</Typography>

					<IconButton
						aria-label='comment'
						onClick={() => push(`/post/${postUserID}/${postID}`)}
					>
						<CommentIcon fontSize={matches ? 'small' : undefined} />
					</IconButton>
				</Box>
			</CardActions>

			<PostContent {...postContentProps} />
		</Card>
	)
}

export default SinglePost
