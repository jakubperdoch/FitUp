type Category = {
	id: number;
	name: string;
	icon: string;
};

type ComponentProps = {
	onClick: (id: number) => void;
	category: Category;
};

const CategoryCardComponent = (props: ComponentProps) => {};
