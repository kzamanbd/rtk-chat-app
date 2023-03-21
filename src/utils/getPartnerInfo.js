const getPartnerInfo = (participants, userId) => {
	if (participants.toUser._id === userId) {
		return participants.fromUser;
	} else {
		return participants.toUser;
	}
};

export default getPartnerInfo;
