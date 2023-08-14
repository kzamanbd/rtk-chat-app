import colors from 'tailwindcss/colors';

export default function UserAvatar({ avatar, name, height = '12', width = '12', color }) {
	const styledElement = {
		height: `${height * 4}px`,
		width: `${width * 4}px`,
		backgroundColor: colors[color]?.[100] || colors['purple'][100],
		color: colors[color]?.[500] || colors['purple'][500]
	};

	return avatar ? (
		<img src={avatar} className={`rounded-full object-cover h-2`} style={styledElement} />
	) : (
		<div className={`rounded-full flex items-center justify-center`} style={styledElement}>
			{name?.charAt(0).toUpperCase()}
		</div>
	);
}
