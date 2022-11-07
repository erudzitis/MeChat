// [DATE]
export const shortDate = (date) => {
    return new Date(date).toLocaleString("en-US", { timeStyle: "short" });
}

//
export const participantString = (participants, myId) => {
    return participants.map(participant => participant.id === myId ? "You" : participant.username).join(", ");
}

export const participantTypingState = (participants, typing) => {
    return typing.map(typer => participants.find(participant => participant.id === typer).username + " is typing...").join(", ");
}

export const newFormData = (data) => {
    // Creating form data instace
    const formData = new FormData();
    // Appending key value pairs to form data
    for (var key in data) {
        formData.append(key, data[key]);
    }

    return formData;
}