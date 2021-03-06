import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'

import CircularLoader from 'components/Loaders/CircularLoader'

const NewDetailsForm = dynamic(() => import('./NewDetailsForm'), {
	loading: () => <CircularLoader />,
})

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

	const formProps = { isAdding, setIsAdding }

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

			{isAdding && <NewDetailsForm {...formProps} />}
		</>
	)
}

export default NewDetails
