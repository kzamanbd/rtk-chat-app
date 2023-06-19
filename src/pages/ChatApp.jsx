/* eslint-disable no-unused-vars */
import { useState } from 'react';

export default function ChatApp() {
	const [contactList, setContactList] = useState([
		{
			userId: 1,
			name: 'Nia Hillyer',
			path: 'avatar-2.png',
			time: '2:09 PM',
			preview: 'How do you do?',
			messages: [
				{
					fromUserId: 0,
					toUserId: 1,
					text: 'Hi, I am back from vacation'
				},
				{
					fromUserId: 0,
					toUserId: 1,
					text: 'How are you?'
				},
				{
					fromUserId: 1,
					toUserId: 0,
					text: 'Welcom Back'
				},
				{
					fromUserId: 1,
					toUserId: 0,
					text: 'I am all well'
				},
				{
					fromUserId: 0,
					toUserId: 1,
					text: 'Coffee?'
				}
			],
			active: true
		},
		{
			userId: 2,
			name: 'Sean Freeman',
			path: 'avatar-3.png',
			time: '12:09 PM',
			preview: 'I was wondering...',
			messages: [
				{
					fromUserId: 0,
					toUserId: 2,
					text: 'Hello'
				},
				{
					fromUserId: 0,
					toUserId: 2,
					text: "It's me"
				},
				{
					fromUserId: 0,
					toUserId: 2,
					text: 'I have a question regarding project.'
				}
			],
			active: false
		},
		{
			userId: 3,
			name: 'Alma Clarke',
			path: 'avatar-4.png',
			time: '1:44 PM',
			preview: 'I’ve forgotten how it felt before',
			messages: [
				{
					fromUserId: 0,
					toUserId: 3,
					text: 'Hey Buddy.'
				},
				{
					fromUserId: 0,
					toUserId: 3,
					text: "What's up"
				},
				{
					fromUserId: 3,
					toUserId: 0,
					text: 'I am sick'
				},
				{
					fromUserId: 0,
					toUserId: 3,
					text: 'Not comming to office today.'
				}
			],
			active: true
		},
		{
			userId: 4,
			name: 'Alan Green',
			path: 'avatar-5.png',
			time: '2:06 PM',
			preview: 'But we’re probably gonna need a new carpet.',
			messages: [
				{
					fromUserId: 0,
					toUserId: 4,
					text: 'Hi, collect your check'
				},
				{
					fromUserId: 4,
					toUserId: 0,
					text: 'Ok, I will be there in 10 mins'
				}
			],
			active: true
		},
		{
			userId: 5,
			name: 'Shaun Park',
			path: 'avatar-6.png',
			time: '2:05 PM',
			preview: 'It’s not that bad...',
			messages: [
				{
					fromUserId: 0,
					toUserId: 3,
					text: 'Hi, I am back from vacation'
				},
				{
					fromUserId: 0,
					toUserId: 3,
					text: 'How are you?'
				},
				{
					fromUserId: 0,
					toUserId: 5,
					text: 'Welcom Back'
				},
				{
					fromUserId: 0,
					toUserId: 5,
					text: 'I am all well'
				},
				{
					fromUserId: 5,
					toUserId: 0,
					text: 'Coffee?'
				}
			],
			active: false
		},
		{
			userId: 6,
			name: 'Roxanne',
			path: 'avatar-7.png',
			time: '2:00 PM',
			preview: 'Wasup for the third time like is you bling bitch',
			messages: [
				{
					fromUserId: 0,
					toUserId: 6,
					text: 'Hi'
				},
				{
					fromUserId: 0,
					toUserId: 6,
					text: 'Uploaded files to server.'
				}
			],
			active: false
		},
		{
			userId: 7,
			name: 'Ernest Reeves',
			path: 'avatar-8.png',
			time: '2:09 PM',
			preview: 'Wasup for the third time like is you bling bitch',
			messages: [],
			active: true
		},
		{
			userId: 8,
			name: 'Laurie Fox',
			path: 'avatar-8.png',
			time: '12:09 PM',
			preview: 'Wasup for the third time like is you bling bitch',
			messages: [],
			active: true
		},
		{
			userId: 9,
			name: 'Xavier',
			path: 'avatar-9.png',
			time: '4:09 PM',
			preview: 'Wasup for the third time like is you bling bitch',
			messages: [],
			active: false
		},
		{
			userId: 10,
			name: 'Susan Phillips',
			path: 'avatar-10.png',
			time: '9:00 PM',
			preview: 'Wasup for the third time like is you bling bitch',
			messages: [],
			active: true
		},
		{
			userId: 11,
			name: 'Dale Butler',
			path: 'avatar-12.png',
			time: '5:09 PM',
			preview: 'Wasup for the third time like is you bling bitch',
			messages: [],
			active: false
		},
		{
			userId: 12,
			name: 'Grace Roberts',
			path: 'avatar-13.png',
			time: '8:01 PM',
			preview: 'Wasup for the third time like is you bling bitch',
			messages: [],
			active: true
		}
	]);

	const [isShowChatMenu, setIsShowChatMenu] = useState(false);
	const [isShowUserChat, setIsShowUserChat] = useState(false);

	const loginUser = {
		id: 0,
		name: 'Jon Doe',
		path: 'avatar-1.png',
		designation: 'Software Developer'
	};

	const [searchUser, setSearchUser] = useState('');
	const [textMessage, setTextMessage] = useState('');
	const [selectedUser, setSelectedUser] = useState({});

	function searchUsers() {
		setTimeout(() => {
			const element = document.querySelector('.chat-users');
			element.scrollTop = 0;
			element.behavior = 'smooth';
		});
		return contactList.filter((d) => {
			return d.name.toLowerCase().includes(searchUser);
		});
	}

	function selectUser(user) {
		setSelectedUser(user);
		setIsShowUserChat(true);
		setIsShowChatMenu(false);
		scrollToBottom();
	}

	function sendMessage() {
		if (textMessage.trim()) {
			const user = contactList.find((d) => d.userId === selectedUser.userId);
			user.messages.push({
				fromUserId: selectedUser.userId,
				toUserId: 0,
				text: textMessage,
				time: 'Just now'
			});
			setTextMessage('');
			scrollToBottom();
		}
	}

	function scrollToBottom() {
		if (isShowUserChat) {
			setTimeout(() => {
				const element = document.querySelector('.chat-conversation-box');
				element.scrollIntoView({
					behavior: 'smooth',
					block: 'end'
				});
			});
		}
	}

	const [isShowContactMenu, setIsShowContactMenu] = useState(false);
	const [isShowContact, setIsShowContact] = useState(false);

	return (
		<div className={`max-w-7xl mx-auto chat-wrapper ${isShowChatMenu && 'min-h-[999px]'}`}>
			<div className={`card chat-sidebar ${isShowChatMenu && '!block'}`}>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<div className="flex-none">
							<img src="/images/users/avatar-1.png" className="h-12 w-12 rounded-full object-cover" />
						</div>
						<div className="mx-3">
							<p className="mb-1 font-semibold">Alon Smith</p>
							<p className="text-white-dark text-xs">Software Developer</p>
						</div>
					</div>
					<div className="dropdown">
						<button
							type="button"
							onClick={() => setIsShowContactMenu(!isShowContactMenu)}
							className="dropdown-toggle flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f4f4] hover:bg-primary-light dark:bg-[#1b2e4b]">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 opacity-70">
								<circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"></circle>
								<circle
									opacity="0.5"
									cx="12"
									cy="12"
									r="2"
									stroke="currentColor"
									strokeWidth="1.5"></circle>
								<circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"></circle>
							</svg>
						</button>

						<ul className={`dropdown-menu w-56 ${isShowContactMenu && 'show'}`}>
							<li>
								<button className="dropdown-link">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-4.5 w-4.5 mr-1 shrink-0">
										<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"></circle>
										<path
											opacity="0.5"
											d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
											stroke="currentColor"
											strokeWidth="1.5"></path>
									</svg>
									Settings
								</button>
							</li>
							<li>
								<button className="dropdown-link">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-4.5 w-4.5 mr-1 shrink-0">
										<circle
											opacity="0.5"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="1.5"></circle>
										<path
											d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<circle cx="12" cy="16" r="1" fill="currentColor"></circle>
									</svg>
									Help &amp; feedback
								</button>
							</li>
							<li>
								<button className="dropdown-link">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-4.5 w-4.5 mr-1 shrink-0">
										<path
											d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"></path>
										<path
											opacity="0.5"
											d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
									</svg>
									Sign Out
								</button>
							</li>
						</ul>
					</div>
				</div>
				<div className="relative">
					<input type="text" className="peer form-input pr-9" placeholder="Searching..." />
					<div className="absolute right-2 top-1/2 -translate-y-1/2 peer-focus:text-primary">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle
								cx="11.5"
								cy="11.5"
								r="9.5"
								stroke="currentColor"
								strokeWidth="1.5"
								opacity="0.5"></circle>
							<path
								d="M18.5 18.5L22 22"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"></path>
						</svg>
					</div>
				</div>
				<div className="flex items-center justify-between text-xs">
					<button type="button" className="group hover:text-primary">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mx-auto mb-1 h-5 w-5">
							<path
								opacity="0.5"
								d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM13.5 2.75C13.9142 2.75 14.25 2.41421 14.25 2C14.25 1.58579 13.9142 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 10.0858 22.4142 9.75 22 9.75C21.5858 9.75 21.25 10.0858 21.25 10.5H22.75ZM2.3806 15.9134L3.07351 15.6264V15.6264L2.3806 15.9134ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM2.75 11.5V10.5H1.25V11.5H2.75ZM1.25 11.5C1.25 12.6546 1.24959 13.5581 1.29931 14.2868C1.3495 15.0223 1.45323 15.6344 1.68769 16.2004L3.07351 15.6264C2.92737 15.2736 2.84081 14.8438 2.79584 14.1847C2.75041 13.5189 2.75 12.6751 2.75 11.5H1.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
								fill="currentColor"></path>
							<circle cx="19" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"></circle>
						</svg>
						Chats
					</button>

					<button type="button" className="group hover:text-primary">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mx-auto mb-1 h-5 w-5">
							<path
								d="M5.00659 6.93309C5.04956 5.7996 5.70084 4.77423 6.53785 3.93723C7.9308 2.54428 10.1532 2.73144 11.0376 4.31617L11.6866 5.4791C12.2723 6.52858 12.0372 7.90533 11.1147 8.8278M17.067 18.9934C18.2004 18.9505 19.2258 18.2992 20.0628 17.4622C21.4558 16.0692 21.2686 13.8468 19.6839 12.9624L18.5209 12.3134C17.4715 11.7277 16.0947 11.9628 15.1722 12.8853"
								stroke="currentColor"
								strokeWidth="1.5"></path>
							<path
								opacity="0.5"
								d="M5.00655 6.93311C4.93421 8.84124 5.41713 12.0817 8.6677 15.3323C11.9183 18.5829 15.1588 19.0658 17.0669 18.9935M15.1722 12.8853C15.1722 12.8853 14.0532 14.0042 12.0245 11.9755C9.99578 9.94676 11.1147 8.82782 11.1147 8.82782"
								stroke="currentColor"
								strokeWidth="1.5"></path>
						</svg>
						Calls
					</button>

					<button type="button" className="group hover:text-primary">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mx-auto mb-1 h-5 w-5">
							<circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"></circle>
							<path
								opacity="0.5"
								d="M18 17.5C18 19.9853 18 22 10 22C2 22 2 19.9853 2 17.5C2 15.0147 5.58172 13 10 13C14.4183 13 18 15.0147 18 17.5Z"
								stroke="currentColor"
								strokeWidth="1.5"></path>
							<path
								d="M21 10H19M19 10H17M19 10L19 8M19 10L19 12"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"></path>
						</svg>
						Contacts
					</button>

					<button type="button" className="group hover:text-primary">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mx-auto mb-1 h-5 w-5">
							<path
								d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
								stroke="currentColor"
								strokeWidth="1.5"></path>
							<path
								opacity="0.5"
								d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"></path>
						</svg>
						Notification
					</button>
				</div>
				<div className="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
				<div className="!mt-0">
					<div className="chat-users">
						{contactList.map((person) => (
							<button
								type="button"
								key={person.userId}
								className={`chat-user-item ${
									selectedUser.userId === person.userId &&
									'bg-gray-100 dark:bg-[#050b14] dark:text-primary text-primary'
								}`}
								onClick={() => selectUser(person)}>
								<div className="flex-1">
									<div className="flex items-center">
										<div className="relative flex-shrink-0">
											<img
												src={`/images/users/${person.path}`}
												className="h-12 w-12 rounded-full object-cover"
											/>

											{person.active && (
												<div className="absolute bottom-0 right-0">
													<div className="h-4 w-4 rounded-full bg-success"></div>
												</div>
											)}
										</div>
										<div className="mx-3 text-left">
											<p className="mb-1 font-semibold">{person.name}</p>
											<p className="text-white-dark max-w-[185px] truncate text-xs">
												{person.preview}
											</p>
										</div>
									</div>
								</div>
								<div className="whitespace-nowrap text-xs font-semibold">
									<p>{person.time}</p>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
			<div
				className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${
					isShowChatMenu && '!block xl:!hidden'
				}`}
				onClick={() => setIsShowChatMenu((prev) => !prev)}></div>

			<div className="card flex-1 p-0">
				{!isShowUserChat && (
					<div className="relative flex h-full items-center justify-center p-4">
						<button
							type="button"
							className="absolute left-4 top-4 hover:text-primary xl:hidden"
							onClick={() => setIsShowChatMenu((prev) => !prev)}>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6">
								<path
									d="M20 7L4 7"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"></path>
								<path
									opacity="0.5"
									d="M20 12L4 12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"></path>
								<path
									d="M20 17L4 17"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"></path>
							</svg>
						</button>

						<div className="flex flex-col items-center justify-center py-8">
							<div className="chat-empty-wrapper">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									data-name="Layer 1"
									className="h-full w-full"
									viewBox="0 0 891.29496 745.19434">
									<ellipse cx="418.64354" cy="727.19434" rx="352" ry="18" fill="#e6e6e6"></ellipse>
									<path
										d="M778.64963,250.35008h-3.99878V140.80476a63.40187,63.40187,0,0,0-63.4018-63.40193H479.16232a63.40188,63.40188,0,0,0-63.402,63.4017v600.9744a63.40189,63.40189,0,0,0,63.4018,63.40192H711.24875a63.40187,63.40187,0,0,0,63.402-63.40168V328.32632h3.99878Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#3f3d56"></path>
									<path
										d="M761.156,141.24713v600.09a47.35072,47.35072,0,0,1-47.35,47.35h-233.2a47.35084,47.35084,0,0,1-47.35-47.35v-600.09a47.3509,47.3509,0,0,1,47.35-47.35h28.29a22.50659,22.50659,0,0,0,20.83,30.99h132.96a22.50672,22.50672,0,0,0,20.83-30.99h30.29A47.35088,47.35088,0,0,1,761.156,141.24713Z"
										transform="translate(-154.35252 -77.40283)"
										fill="currentColor"></path>
									<path
										d="M686.03027,400.0032q-2.32543,1.215-4.73047,2.3-2.18994.99-4.4497,1.86c-.5503.21-1.10987.42-1.66992.63a89.52811,89.52811,0,0,1-13.6001,3.75q-3.43506.675-6.96,1.06-2.90991.33-5.87989.47c-1.41015.07-2.82031.1-4.24023.1a89.84124,89.84124,0,0,1-16.75977-1.57c-1.44043-.26-2.85009-.57-4.26025-.91a88.77786,88.77786,0,0,1-19.66992-7.26c-.56006-.28-1.12012-.58-1.68018-.87-.83008-.44-1.63965-.9-2.4497-1.38.38964-.54.81005-1.07,1.23974-1.59a53.03414,53.03414,0,0,1,78.87012-4.1,54.27663,54.27663,0,0,1,5.06006,5.86C685.25977,398.89316,685.6499,399.44321,686.03027,400.0032Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#6c63ff"></path>
									<circle cx="492.14325" cy="234.76352" r="43.90974" fill="#2f2e41"></circle>
									<circle
										cx="642.49883"
										cy="327.46205"
										r="32.68086"
										transform="translate(-232.6876 270.90663) rotate(-28.66315)"
										fill="#a0616a"></circle>
									<path
										d="M676.8388,306.90589a44.44844,44.44844,0,0,1-25.402,7.85033,27.23846,27.23846,0,0,0,10.796,4.44154,89.62764,89.62764,0,0,1-36.61.20571,23.69448,23.69448,0,0,1-7.66395-2.63224,9.699,9.699,0,0,1-4.73055-6.3266c-.80322-4.58859,2.77227-8.75743,6.488-11.567a47.85811,47.85811,0,0,1,40.21662-8.03639c4.49246,1.16124,8.99288,3.12327,11.91085,6.731s3.78232,9.16981,1.00224,12.88488Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#2f2e41"></path>
									<path
										d="M644.5,230.17319a89.98675,89.98675,0,0,0-46.83984,166.83l.58007.34q.72.43506,1.43995.84c.81005.48,1.61962.94,2.4497,1.38.56006.29,1.12012.59,1.68018.87a88.77786,88.77786,0,0,0,19.66992,7.26c1.41016.34,2.81982.65,4.26025.91a89.84124,89.84124,0,0,0,16.75977,1.57c1.41992,0,2.83008-.03,4.24023-.1q2.97-.135,5.87989-.47,3.52513-.39,6.96-1.06a89.52811,89.52811,0,0,0,13.6001-3.75c.56005-.21,1.11962-.42,1.66992-.63q2.26464-.87,4.4497-1.86,2.40015-1.08,4.73047-2.3a90.7919,90.7919,0,0,0,37.03955-35.97c.04-.07995.09034-.16.13038-.24a89.30592,89.30592,0,0,0,9.6499-26.41,90.051,90.051,0,0,0-88.3501-107.21Zm77.06006,132.45c-.08008.14-.1499.28-.23.41a88.17195,88.17195,0,0,1-36.48,35.32q-2.29542,1.2-4.66992,2.25c-1.31006.59-2.64991,1.15-4,1.67-.57032.22-1.14991.44-1.73.64a85.72126,85.72126,0,0,1-11.73,3.36,84.69473,84.69473,0,0,1-8.95019,1.41c-1.8501.2-3.73.34-5.62012.41-1.21.05-2.42969.08-3.6499.08a86.762,86.762,0,0,1-16.21973-1.51,85.62478,85.62478,0,0,1-9.63037-2.36,88.46592,88.46592,0,0,1-13.98974-5.67c-.52-.27-1.04-.54-1.5503-.82-.73-.39-1.46972-.79-2.18994-1.22-.54-.3-1.08008-.62-1.60986-.94-.31006-.18-.62012-.37-.93018-.56a88.06851,88.06851,0,1,1,123.18018-32.47Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#3f3d56"></path>
									<path
										d="M624.2595,268.86254c-.47244-4.968-6.55849-8.02647-11.3179-6.52583s-7.88411,6.2929-8.82863,11.19308a16.0571,16.0571,0,0,0,2.16528,12.12236c2.40572,3.46228,6.82664,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59956,8.90127-10.32105s.00667-9.58929-.91854-14.31234Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#2f2e41"></path>
									<path
										d="M691.24187,275.95964c-.47245-4.968-6.5585-8.02646-11.3179-6.52582s-7.88412,6.29289-8.82864,11.19307a16.05711,16.05711,0,0,0,2.16529,12.12236c2.40571,3.46228,6.82663,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59955,8.90127-10.32105s.00667-9.58929-.91853-14.31234Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#2f2e41"></path>
									<path
										d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169Z"
										transform="translate(-154.35252 -77.40283)"
										fill="currentColor"></path>
									<path
										d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169ZM169.3618,176.01571A13.024,13.024,0,0,0,156.35252,189.025v94.5625a13.024,13.024,0,0,0,13.00928,13.00927H431.5814a8.02436,8.02436,0,0,1,5.90039,2.59571l49.62208,54.1333a2.50253,2.50253,0,0,0,4.34716-1.69092v-47.0332a8.0137,8.0137,0,0,1,8.00464-8.00489H509.087a13.024,13.024,0,0,0,13.00928-13.00927V189.025A13.024,13.024,0,0,0,509.087,176.01571Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#3f3d56"></path>
									<circle cx="36.81601" cy="125.19345" r="13.13371" fill="#6c63ff"></circle>
									<path
										d="M493.76439,275.26947H184.68447a7.00465,7.00465,0,1,1,0-14.00929H493.76439a7.00465,7.00465,0,0,1,0,14.00929Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#e6e6e6"></path>
									<path
										d="M393.07263,245.49973H184.68447a7.00465,7.00465,0,1,1,0-14.00929H393.07263a7.00464,7.00464,0,0,1,0,14.00929Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#e6e6e6"></path>
									<path
										d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065Z"
										transform="translate(-154.35252 -77.40283)"
										fill="currentColor"></path>
									<path
										d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065ZM690.913,497.01571A13.024,13.024,0,0,0,677.9037,510.025v94.5625A13.024,13.024,0,0,0,690.913,617.59676h9.63135a8.0137,8.0137,0,0,1,8.00464,8.00489v47.0332a2.50253,2.50253,0,0,0,4.34716,1.69092l49.62208-54.1333a8.02436,8.02436,0,0,1,5.90039-2.59571h262.2196a13.024,13.024,0,0,0,13.00928-13.00927V510.025a13.024,13.024,0,0,0-13.00928-13.00928Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#3f3d56"></path>
									<path
										d="M603.53027,706.11319a89.06853,89.06853,0,0,1-93.65039,1.49,54.12885,54.12885,0,0,1,9.40039-12.65,53.43288,53.43288,0,0,1,83.90967,10.56994C603.2998,705.71316,603.41992,705.91318,603.53027,706.11319Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#6c63ff"></path>
									<circle cx="398.44256" cy="536.68841" r="44.20157" fill="#2f2e41"></circle>
									<circle
										cx="556.81859"
										cy="629.4886"
										r="32.89806"
										transform="translate(-416.96496 738.72884) rotate(-61.33685)"
										fill="#ffb8b8"></circle>
									<path
										d="M522.25039,608.79582a44.74387,44.74387,0,0,0,25.57085,7.9025,27.41946,27.41946,0,0,1-10.8677,4.47107,90.22316,90.22316,0,0,0,36.85334.20707,23.852,23.852,0,0,0,7.71488-2.64973,9.76352,9.76352,0,0,0,4.762-6.36865c.80855-4.61909-2.7907-8.81563-6.53113-11.64387a48.17616,48.17616,0,0,0-40.4839-8.08981c-4.52231,1.169-9.05265,3.144-11.99,6.77579s-3.80746,9.23076-1.0089,12.97052Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#2f2e41"></path>
									<path
										d="M555.5,721.17319a89.97205,89.97205,0,1,1,48.5708-14.21875A89.87958,89.87958,0,0,1,555.5,721.17319Zm0-178a88.00832,88.00832,0,1,0,88,88A88.09957,88.09957,0,0,0,555.5,543.17319Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#3f3d56"></path>
									<circle cx="563.81601" cy="445.19345" r="13.13371" fill="#6c63ff"></circle>
									<path
										d="M1020.76439,595.26947H711.68447a7.00465,7.00465,0,1,1,0-14.00929h309.07992a7.00464,7.00464,0,0,1,0,14.00929Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#e6e6e6"></path>
									<path
										d="M920.07263,565.49973H711.68447a7.00465,7.00465,0,1,1,0-14.00929H920.07263a7.00465,7.00465,0,0,1,0,14.00929Z"
										transform="translate(-154.35252 -77.40283)"
										fill="#e6e6e6"></path>
									<ellipse
										cx="554.64354"
										cy="605.66091"
										rx="24.50394"
										ry="2.71961"
										fill="#e6e6e6"></ellipse>
									<ellipse
										cx="335.64354"
										cy="285.66091"
										rx="24.50394"
										ry="2.71961"
										fill="#e6e6e6"></ellipse>
								</svg>
							</div>
							<p className="bg-white-dark/20 mx-auto flex max-w-[190px] justify-center rounded-md p-2 font-semibold">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2 h-5 w-5">
									<path
										d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM2.3806 15.9134L3.07351 15.6264V15.6264L2.3806 15.9134ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM2.75 11.5V10.5H1.25V11.5H2.75ZM1.25 11.5C1.25 12.6546 1.24959 13.5581 1.29931 14.2868C1.3495 15.0223 1.45323 15.6344 1.68769 16.2004L3.07351 15.6264C2.92737 15.2736 2.84081 14.8438 2.79584 14.1847C2.75041 13.5189 2.75 12.6751 2.75 11.5H1.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
										fill="currentColor"></path>
								</svg>
								Click User To Chat
							</p>
						</div>
					</div>
				)}

				{isShowUserChat && selectedUser && (
					<div className="relative h-full">
						<div className="flex items-center justify-between p-4">
							<div className="flex items-center space-x-2">
								<button
									type="button"
									className="hover:text-primary xl:hidden"
									onClick={() => setIsShowChatMenu((prev) => !prev)}>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6">
										<path
											d="M20 7L4 7"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											opacity="0.5"
											d="M20 12L4 12"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											d="M20 17L4 17"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
									</svg>
								</button>
								<div className="relative flex-none">
									<img
										src={`/images/users/${selectedUser.path}`}
										className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
									/>
									<div className="absolute bottom-0 right-0">
										<div className="h-4 w-4 rounded-full bg-success"></div>
									</div>
								</div>
								<div className="mx-3">
									<p className="font-semibold">{selectedUser.name}</p>
									<p className="text-white-dark text-xs">
										{selectedUser.active ? 'Active now' : 'Last seen at ' + selectedUser.time}
									</p>
								</div>
							</div>
							<div className="flex gap-3 sm:gap-5">
								<button type="button">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 hover:text-primary">
										<path
											d="M13.5 2C13.5 2 15.8335 2.21213 18.8033 5.18198C21.7731 8.15183 21.9853 10.4853 21.9853 10.4853"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											d="M14.207 5.53564C14.207 5.53564 15.197 5.81849 16.6819 7.30341C18.1668 8.78834 18.4497 9.77829 18.4497 9.77829"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"></path>
										<path
											opacity="0.5"
											d="M15.1007 15.0272L14.5569 14.5107L15.1007 15.0272ZM15.5562 14.5477L16.1 15.0642H16.1L15.5562 14.5477ZM17.9728 14.2123L17.5987 14.8623H17.5987L17.9728 14.2123ZM19.8833 15.312L19.5092 15.962L19.8833 15.312ZM20.4217 18.7584L20.9655 19.2749L20.4217 18.7584ZM19.0011 20.254L18.4573 19.7375L19.0011 20.254ZM17.6763 20.9631L17.7499 21.7095L17.6763 20.9631ZM7.81536 16.4752L8.35915 15.9587L7.81536 16.4752ZM3.00289 6.96594L2.25397 7.00613L2.25397 7.00613L3.00289 6.96594ZM9.47752 8.50311L10.0213 9.01963H10.0213L9.47752 8.50311ZM9.63424 5.6931L10.2466 5.26012L9.63424 5.6931ZM8.37326 3.90961L7.76086 4.3426V4.3426L8.37326 3.90961ZM5.26145 3.60864L5.80524 4.12516L5.26145 3.60864ZM3.69185 5.26114L3.14806 4.74462L3.14806 4.74462L3.69185 5.26114ZM11.0631 13.0559L11.6069 12.5394L11.0631 13.0559ZM15.6445 15.5437L16.1 15.0642L15.0124 14.0312L14.5569 14.5107L15.6445 15.5437ZM17.5987 14.8623L19.5092 15.962L20.2575 14.662L18.347 13.5623L17.5987 14.8623ZM19.8779 18.2419L18.4573 19.7375L19.5449 20.7705L20.9655 19.2749L19.8779 18.2419ZM17.6026 20.2167C16.1676 20.3584 12.4233 20.2375 8.35915 15.9587L7.27157 16.9917C11.7009 21.655 15.9261 21.8895 17.7499 21.7095L17.6026 20.2167ZM8.35915 15.9587C4.48303 11.8778 3.83285 8.43556 3.75181 6.92574L2.25397 7.00613C2.35322 8.85536 3.1384 12.6403 7.27157 16.9917L8.35915 15.9587ZM9.7345 9.32159L10.0213 9.01963L8.93372 7.9866L8.64691 8.28856L9.7345 9.32159ZM10.2466 5.26012L8.98565 3.47663L7.76086 4.3426L9.02185 6.12608L10.2466 5.26012ZM4.71766 3.09213L3.14806 4.74462L4.23564 5.77765L5.80524 4.12516L4.71766 3.09213ZM9.1907 8.80507C8.64691 8.28856 8.64622 8.28929 8.64552 8.29002C8.64528 8.29028 8.64458 8.29102 8.64411 8.29152C8.64316 8.29254 8.64219 8.29357 8.64121 8.29463C8.63924 8.29675 8.6372 8.29896 8.6351 8.30127C8.63091 8.30588 8.62646 8.31087 8.62178 8.31625C8.61243 8.32701 8.60215 8.33931 8.59116 8.3532C8.56918 8.38098 8.54431 8.41512 8.51822 8.45588C8.46591 8.53764 8.40917 8.64531 8.36112 8.78033C8.26342 9.0549 8.21018 9.4185 8.27671 9.87257C8.40742 10.7647 8.99198 11.9644 10.5193 13.5724L11.6069 12.5394C10.1793 11.0363 9.82761 10.1106 9.76086 9.65511C9.72866 9.43536 9.76138 9.31957 9.77432 9.28321C9.78159 9.26277 9.78635 9.25709 9.78169 9.26437C9.77944 9.26789 9.77494 9.27451 9.76738 9.28407C9.76359 9.28885 9.75904 9.29437 9.7536 9.30063C9.75088 9.30375 9.74793 9.30706 9.74476 9.31056C9.74317 9.31231 9.74152 9.3141 9.73981 9.31594C9.73896 9.31686 9.73809 9.31779 9.7372 9.31873C9.73676 9.3192 9.73608 9.31992 9.73586 9.32015C9.73518 9.32087 9.7345 9.32159 9.1907 8.80507ZM10.5193 13.5724C12.0422 15.1757 13.1923 15.806 14.0698 15.9485C14.5201 16.0216 14.8846 15.9632 15.1606 15.8544C15.2955 15.8012 15.4022 15.7387 15.4823 15.6819C15.5223 15.6535 15.5556 15.6266 15.5824 15.6031C15.5959 15.5913 15.6077 15.5803 15.618 15.5703C15.6232 15.5654 15.628 15.5606 15.6324 15.5562C15.6346 15.554 15.6367 15.5518 15.6387 15.5497C15.6397 15.5487 15.6407 15.5477 15.6417 15.5467C15.6422 15.5462 15.6429 15.5454 15.6431 15.5452C15.6438 15.5444 15.6445 15.5437 15.1007 15.0272C14.5569 14.5107 14.5576 14.51 14.5583 14.5093C14.5585 14.509 14.5592 14.5083 14.5596 14.5078C14.5605 14.5069 14.5614 14.506 14.5623 14.5051C14.5641 14.5033 14.5658 14.5015 14.5674 14.4998C14.5708 14.4965 14.574 14.4933 14.577 14.4904C14.583 14.4846 14.5885 14.4796 14.5933 14.4754C14.6028 14.467 14.6099 14.4616 14.6145 14.4584C14.6239 14.4517 14.6229 14.454 14.6102 14.459C14.5909 14.4666 14.5 14.4987 14.3103 14.4679C13.9077 14.4025 13.0391 14.0472 11.6069 12.5394L10.5193 13.5724ZM8.98565 3.47663C7.97206 2.04305 5.94384 1.80119 4.71766 3.09213L5.80524 4.12516C6.32808 3.57471 7.24851 3.61795 7.76086 4.3426L8.98565 3.47663ZM3.75181 6.92574C3.73038 6.52644 3.90425 6.12654 4.23564 5.77765L3.14806 4.74462C2.61221 5.30877 2.20493 6.09246 2.25397 7.00613L3.75181 6.92574ZM18.4573 19.7375C18.1783 20.0313 17.8864 20.1887 17.6026 20.2167L17.7499 21.7095C18.497 21.6357 19.1016 21.2373 19.5449 20.7705L18.4573 19.7375ZM10.0213 9.01963C10.9889 8.00095 11.0574 6.40678 10.2466 5.26012L9.02185 6.12608C9.44399 6.72315 9.37926 7.51753 8.93372 7.9866L10.0213 9.01963ZM19.5092 15.962C20.33 16.4345 20.4907 17.5968 19.8779 18.2419L20.9655 19.2749C22.2704 17.901 21.8904 15.6019 20.2575 14.662L19.5092 15.962ZM16.1 15.0642C16.4854 14.6584 17.086 14.5672 17.5987 14.8623L18.347 13.5623C17.2485 12.93 15.8861 13.1113 15.0124 14.0312L16.1 15.0642Z"
											fill="currentColor"></path>
									</svg>
								</button>

								<button type="button">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 hover:text-primary">
										<path
											d="M2 11.5C2 8.21252 2 6.56878 2.90796 5.46243C3.07418 5.25989 3.25989 5.07418 3.46243 4.90796C4.56878 4 6.21252 4 9.5 4C12.7875 4 14.4312 4 15.5376 4.90796C15.7401 5.07418 15.9258 5.25989 16.092 5.46243C17 6.56878 17 8.21252 17 11.5V12.5C17 15.7875 17 17.4312 16.092 18.5376C15.9258 18.7401 15.7401 18.9258 15.5376 19.092C14.4312 20 12.7875 20 9.5 20C6.21252 20 4.56878 20 3.46243 19.092C3.25989 18.9258 3.07418 18.7401 2.90796 18.5376C2 17.4312 2 15.7875 2 12.5V11.5Z"
											stroke="currentColor"
											strokeWidth="1.5"></path>
										<path
											opacity="0.5"
											d="M17 9.50019L17.6584 9.17101C19.6042 8.19807 20.5772 7.7116 21.2886 8.15127C22 8.59094 22 9.67872 22 11.8543V12.1461C22 14.3217 22 15.4094 21.2886 15.8491C20.5772 16.2888 19.6042 15.8023 17.6584 14.8294L17 14.5002V9.50019Z"
											stroke="currentColor"
											strokeWidth="1.5"></path>
									</svg>
								</button>

								<div className="dropdown">
									<button
										type="button"
										onClick={() => setIsShowContact(!isShowContact)}
										className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f4f4] hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 rotate-90 opacity-70 hover:text-primary">
											<circle
												cx="5"
												cy="12"
												r="2"
												stroke="currentColor"
												strokeWidth="1.5"></circle>
											<circle
												opacity="0.5"
												cx="12"
												cy="12"
												r="2"
												stroke="currentColor"
												strokeWidth="1.5"></circle>
											<circle
												cx="19"
												cy="12"
												r="2"
												stroke="currentColor"
												strokeWidth="1.5"></circle>
										</svg>
									</button>
									<ul className={`dropdown-menu w-56 ${isShowContact && 'show'}`}>
										<li>
											<button type="button" className="dropdown-link">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													className="mr-2 h-4 w-4">
													<circle
														cx="11.5"
														cy="11.5"
														r="9.5"
														stroke="currentColor"
														strokeWidth="1.5"
														opacity="0.5"></circle>
													<path
														d="M18.5 18.5L22 22"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"></path>
												</svg>
												Search
											</button>
										</li>
										<li>
											<button type="button" className="dropdown-link">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													className="h-4.5 w-4.5 mr-2">
													<path
														d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
														stroke="currentColor"
														strokeWidth="1.5"></path>
													<path
														opacity="0.5"
														d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
														stroke="currentColor"
														strokeWidth="1.5"></path>
												</svg>
												Copy
											</button>
										</li>
										<li>
											<button type="button" className="dropdown-link">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													className="h-4.5 w-4.5 mr-2">
													<path
														opacity="0.5"
														d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"></path>
													<path
														d="M20.5001 6H3.5"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"></path>
													<path
														d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"></path>
													<path
														opacity="0.5"
														d="M9.5 11L10 16"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"></path>
													<path
														opacity="0.5"
														d="M14.5 11L14 16"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"></path>
												</svg>
												Delete
											</button>
										</li>
										<li>
											<button type="button" className="dropdown-link">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													className="h-4.5 w-4.5 mr-2">
													<path
														d="M9 11.5C9 12.8807 7.88071 14 6.5 14C5.11929 14 4 12.8807 4 11.5C4 10.1193 5.11929 9 6.5 9C7.88071 9 9 10.1193 9 11.5Z"
														stroke="currentColor"
														strokeWidth="1.5"></path>
													<path
														opacity="0.5"
														d="M14.3206 16.8017L9 13.29"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"></path>
													<path
														opacity="0.5"
														d="M14.4207 6.83984L9.1001 10.3515"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"></path>
													<path
														d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z"
														stroke="currentColor"
														strokeWidth="1.5"></path>
													<path
														d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z"
														stroke="currentColor"
														strokeWidth="1.5"></path>
												</svg>
												Share
											</button>
										</li>
										<li>
											<button type="button" className="dropdown-link">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													className="h-4.5 w-4.5 mr-2">
													<circle
														cx="12"
														cy="12"
														r="3"
														stroke="currentColor"
														strokeWidth="1.5"></circle>
													<path
														opacity="0.5"
														d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
														stroke="currentColor"
														strokeWidth="1.5"></path>
												</svg>
												Settings
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
						<div className="relative h-full overflow-auto sm:h-[calc(100vh_-_200px)]">
							<div className="chat-conversation-box">
								<div className="m-6 mt-0 block">
									<h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
										<span className="relative top-2 bg-white px-3 dark:bg-[#0e1726]">
											Today, {selectedUser.time}
										</span>
									</h4>
								</div>
								{selectedUser.messages.map((message) => (
									<div
										key={Math.random() * 60}
										className={`flex items-start gap-3 ${
											selectedUser.userId === message.fromUserId && 'justify-end'
										}`}>
										<div
											className={`flex-none ${
												selectedUser.userId === message.fromUserId && 'order-2'
											}`}>
											{selectedUser.userId === message.fromUserId && (
												<img
													src={`/images/users/${loginUser.path}`}
													className="h-10 w-10 rounded-full object-cover"
												/>
											)}
											{selectedUser.userId !== message.fromUserId && (
												<img
													src={`/images/users/${selectedUser.path}`}
													className="h-10 w-10 rounded-full object-cover"
												/>
											)}
										</div>
										<div className="space-y-2">
											<div className="flex items-center gap-3">
												<div
													className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${
														message.fromUserId == selectedUser.userId
															? 'rounded-br-none  !bg-primary text-white'
															: 'rounded-bl-none'
													}`}>
													{message.text}
												</div>
												<div
													className={`${
														selectedUser.userId === message.fromUserId && 'hidden'
													}`}>
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 hover:text-primary">
														<circle
															opacity="0.5"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="1.5"></circle>
														<path
															d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"></path>
														<path
															d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
															fill="currentColor"></path>
														<ellipse
															cx="9"
															cy="10.5"
															rx="1"
															ry="1.5"
															fill="currentColor"></ellipse>
													</svg>
												</div>
											</div>
											<div
												className={`text-white-dark text-xs ${
													selectedUser.userId === message.fromUserId && 'text-right'
												}`}>
												{message.time ? message.time : '5h ago'}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="absolute bottom-0 left-0 w-full p-4">
							<div className="w-full items-center space-x-3 sm:flex">
								<div className="relative flex-1">
									<input
										id="message"
										className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 py-2 focus:outline-none"
										placeholder="Type a message"
									/>
									<button
										type="button"
										className="absolute left-4 top-1/2 -translate-y-1/2 hover:text-primary">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5">
											<circle
												opacity="0.5"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="1.5"></circle>
											<path
												d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
											<path
												d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
												fill="currentColor"></path>
											<ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="currentColor"></ellipse>
										</svg>
									</button>
									<button
										type="button"
										className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-primary"
										onClick={sendMessage}>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5">
											<path
												d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z"
												stroke="currentColor"
												strokeWidth="1.5"></path>
											<path
												opacity="0.5"
												d="M6 18L21 3"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
										</svg>
									</button>
								</div>
								<div className="hidden items-center space-x-3 py-3 sm:block sm:py-0">
									<button
										type="button"
										className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5">
											<path
												d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V8Z"
												stroke="currentColor"
												strokeWidth="1.5"></path>
											<path
												opacity="0.5"
												d="M13.5 8L17 8"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
											<path
												opacity="0.5"
												d="M13.5 11L17 11"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
											<path
												opacity="0.5"
												d="M7 8L9 8"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
											<path
												opacity="0.5"
												d="M7 11L9 11"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
											<path
												opacity="0.5"
												d="M20 10V11C20 15.4183 16.4183 19 12 19M4 10V11C4 15.4183 7.58172 19 12 19M12 19V22"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
											<path
												d="M22 2L2 22"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
										</svg>
									</button>
									<button
										type="button"
										className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5">
											<path
												opacity="0.5"
												d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
											<path
												d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"></path>
										</svg>
									</button>
									<button
										type="button"
										className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5">
											<circle
												cx="12"
												cy="13"
												r="3"
												stroke="currentColor"
												strokeWidth="1.5"></circle>
											<path
												opacity="0.5"
												d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z"
												stroke="currentColor"
												strokeWidth="1.5"></path>
											<path
												d="M19 10H18"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"></path>
										</svg>
									</button>
									<button
										type="button"
										className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 opacity-70">
											<circle
												cx="5"
												cy="12"
												r="2"
												stroke="currentColor"
												strokeWidth="1.5"></circle>
											<circle
												opacity="0.5"
												cx="12"
												cy="12"
												r="2"
												stroke="currentColor"
												strokeWidth="1.5"></circle>
											<circle
												cx="19"
												cy="12"
												r="2"
												stroke="currentColor"
												strokeWidth="1.5"></circle>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
