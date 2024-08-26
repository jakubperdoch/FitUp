import * as themes from './theme/theme';
import { tokens } from '@tamagui/config/v3';
import { createTamagui } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { createAnimations } from '@tamagui/animations-css';
export default createTamagui({
	themes,
	tokens,
	shorthands,
	fonts: {
		body: {
			family: 'Poppins',
			size: {
				1: 14,
				2: 16,
				3: 18,
				4: 20,
			},
			lineHeight: {
				1: 20,
				2: 24,
				3: 28,
				4: 32,
			},
			weight: {
				1: '400',
				2: '700',
				3: '800',
				4: '900',
			},
		},
		heading: {
			family: 'Poppins',
			size: {
				1: 24,
				2: 28,
				3: 32,
				4: 36,
			},
			lineHeight: {
				1: 32,
				2: 36,
				3: 40,
				4: 44,
			},
			weight: {
				1: '700',
				2: '800',
			},
		},
	},
	animations: createAnimations({
		fast: 'ease-in 150ms',
		medium: 'ease-in 300ms',
		slow: 'ease-in 450ms',
	}),

	media: {
		xs: { maxWidth: 660 },
		sm: { maxWidth: 800 },
		md: { maxWidth: 1024 },
		lg: { maxWidth: 1280 },
		xl: { maxWidth: 1440 },
		xxl: { maxWidth: 1600 },
	},
});
