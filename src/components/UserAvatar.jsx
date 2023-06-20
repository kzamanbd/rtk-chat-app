export default function UserAvatar({ avatar, name, color = 'purple', height = 'h-12', width = 'w-12' }) {
	const letterAvatar = `${height} ${width} rounded-full flex items-center justify-center text-${color}-500 bg-${color}-100`;

	return avatar ? (
		<img src={avatar} className={`${height} ${width} rounded-full object-cover`} />
	) : (
		<div className={letterAvatar}>{name?.charAt(0).toUpperCase()}</div>
	);
}
