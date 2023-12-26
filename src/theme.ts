import { ThemeConfig } from 'antd'

const primary = '#5CA0CE'

export const theme: ThemeConfig = {
	token: {
		colorPrimary: primary,
	},
	components: {
		Typography: {
			titleMarginBottom: '0',
			colorTextHeading: primary,
		},
	},
}
