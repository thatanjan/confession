import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'

const NewDetailsForm = dynamic(() => import('./NewDetailsForm'))

const useStyles = makeStyles(({ spacing }: Theme) => ({
	buttonStyle: {
		marginTop: spacing(4),
	},
	dividerStyle: {
		marginTop: spacing(2),
		height: spacing(0.3),
		width: '100%',
	},
}))

const NewDetails = () => {
	const { buttonStyle } = useStyles()
	const [isAdding, setIsAdding] = useState(false)

	return (
		<>
			<Grid container justify='flex-end'>
				<Grid item>
					<Button
						variant='contained'
						color='secondary'
						className={buttonStyle}
						onClick={() => setIsAdding(true)}
						disabled={isAdding}
					>
						update your profile
					</Button>
				</Grid>
			</Grid>

			{isAdding && <NewDetailsForm setIsAdding={setIsAdding} />}
		</>
	)
}

export default NewDetails