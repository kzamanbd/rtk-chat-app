import { useGetUsersQuery } from '@/features/users/usersApi';

export default function ContactsList() {
	const { data: contacts } = useGetUsersQuery();

	return <div>{JSON.stringify(contacts)}</div>;
}
