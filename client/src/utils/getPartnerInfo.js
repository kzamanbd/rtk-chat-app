const getPartnerInfo = (conversation, userId) => {
    if (conversation.toUser._id === userId) {
        return conversation.fromUser;
    } else {
        return conversation.toUser;
    }
};

export default getPartnerInfo;
