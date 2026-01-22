import Masonry from "react-masonry-css";

interface BreakPoints {
	default: number;
	[width: number]: number;
}

interface IProps {
	children: React.ReactNode;
	breakPoints: BreakPoints;
}

export default function ReactMasonary({ children, breakPoints }: IProps) {
	return (
		<Masonry
			breakpointCols={breakPoints}
			className="flex w-auto gap-x-[30px]"
			columnClassName="bg-clip-padding gap-y-[30px]"
		>
			{children}
		</Masonry>
	);
}
