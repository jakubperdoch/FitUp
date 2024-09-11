// GenericIcon.js
import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { View } from 'react-native';

const GenericIcon = ({ name, size = 24, color = 'black', ...props }) => {
	// Dynamically select the correct icon from LucideIcons
	const LucideIcon = LucideIcons[name];

	// Check if the icon exists in LucideIcons
	if (!LucideIcon) {
		console.warn(`Icon with name "${name}" does not exist in Lucide.`);
		return null;
	}

	return (
		<LucideIcon
			size={size}
			color={color}
			{...props}
		/>
	);
};

export default GenericIcon;
