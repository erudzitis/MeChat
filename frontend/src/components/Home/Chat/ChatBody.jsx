// Componenets
import ChatMessage from "./Message/ChatMessage";

const ChatBody = ({ messages, userId }) => {
    return (
        <>
            {messages.map(message => {
                return (
                    <ChatMessage
                        key={message.id}
                        content={message.content}
                        timestamp={message.created_at}
                        myMessage={userId === message.user_id}
                    />
                )
            })}
        </>
    )
}

export default ChatBody;