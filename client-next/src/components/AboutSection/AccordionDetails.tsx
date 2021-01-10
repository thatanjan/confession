import React from 'react'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import { Props as AccordionProps } from './AboutSection'

interface Props extends AccordionProps {
	accordionDetails: string
}

const Details = ({
	Component,
	props,
	formFields,
	name,
	accordionDetails,
	hook,
}: Props) => {
	const userId = '5ff9939e53c3e8c7a2c4a833'
	const { data } = hook(userId)
	return (
		<AccordionDetails className={accordionDetails}>
			<Component {...props} formFields={formFields} name={name} />
		</AccordionDetails>
	)
}

export default Details
