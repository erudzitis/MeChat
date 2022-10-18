// [DATE]
const shortDate = (date) => {
    return new Date(date).toLocaleString("en-US", { timeStyle: "short" });
}

//
const participantString = (participants, myId) => {
    return participants.map(participant => participant.id === myId ? "You" : participant.username).join(", ");
}

export {
    shortDate,
    participantString
}