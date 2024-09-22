import React from 'react';
import * as LucideIcons from 'lucide-react-native';


const GenericIcon = ({ name, size = 24, color = 'black', ...props }) => {

	const LucideIcon = LucideIcons[name];


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
