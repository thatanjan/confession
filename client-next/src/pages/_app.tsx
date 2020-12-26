import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import jwtDecode from 'jwt-decode'

import theme from 'themes/theme'
import UserContextProvider from 'context/userContext'
import parseCookies from 'utils/parseCookies'
import redirectToAuth, { redirectToHome } from 'utils/serverRedirect'

interface NewAppProps extends AppProps {
	userData: {
		[key: string]: any
	}
}

export default function MyApp(props: NewAppProps) {
	const { Component, pageProps, userData } = props

	React.useEffect(() => {
		const jssStyles: any = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<UserContextProvider userData={userData}>
					<Component {...pageProps} />
				</UserContextProvider>
			</ThemeProvider>
		</>
	)
}

MyApp.getInitialProps = async ({
	ctx: { req, res },
	router: { asPath },
}: any) => {
	const { jwt }: { [key: string]: string } = parseCookies(req)

	if (!jwt) {
		redirectToAuth({ res, asPath })
		return {}
	}

	const decodedToken: string = jwtDecode(jwt)

	redirectToHome({ res, asPath })

	return { userData: decodedToken }
}
