import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'
import { theme } from './theme.ts'
import koKr from 'antd/locale/ko_KR'

ReactDOM.createRoot(
	document.getElementById('root')!,
).render(
	<React.StrictMode>
		<ConfigProvider theme={theme} locale={koKr}>
			<App />
		</ConfigProvider>
	</React.StrictMode>,
)
