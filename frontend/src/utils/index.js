// [DATE]
const shortDate = (date) => {
    return new Date(date).toLocaleString("en-US", { timeStyle: "short" });
}

//
const participantString = (participants, myId) => {
    return participants.map(participant => participant.id === myId ? "You" : participant.username).join(", ");
}

const participantTypingState = (participants, typing) => {
    return typing.map(typer => participants.find(participant => participant.id === typer).username + " is typing...").join(", ");
}

export {
    shortDate,
    participantString,
    participantTypingState
}