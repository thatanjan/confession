import React from 'react'
import Image from 'next/image'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		maxWidth: '100%',
		position: 'relative',
		marginTop: theme.typography.pxToRem(20),
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
		position: 'relative',
		marginBottom: '15%',
		boxShadow: 'none',
	},
	test: {
		top: '75%',
		left: '50%',
		position: 'absolute',
		width: '30%',
		paddingTop: '23.25%',
		transform: 'translateX(-50%)',
		backgroundSize: 'cover',
		// borderRadius: theme.spacing.borderRadius,
		borderRadius: '20px',
	},
}))

const imagelink =
	'https://www.1a-webradio.de/sites/default/files/BildNebenText/taylor-swift-press-photo-2016-billboard-1548.jpg'

const profileImageLink =
	'https://im0-tub-com.yandex.net/i?id=3824c666facfe5d76794d2fb1ac8943e&n=13&exp=1'

export const ProfileCover = () => {
	const { container, test, media } = useStyles()

	return (
		<>
			<Paper elevation={0}>
				<Card className={container}>
					<CardMedia className={media} image={imagelink}>
						<CardMedia className={test} image={profileImageLink} />
						{/* <Image src='/images/log_in_background_image.jpg' layout='fill' /> */}
					</CardMedia>

					<Typography variant='h6' align='center'>
						userName
					</Typography>
					<Grid container>
						<Grid container item justify='center'>
							<Button>Add Bio </Button>
						</Grid>
					</Grid>
					<Divider />
				</Card>
			</Paper>
		</>
	)
}

export default ProfileCover