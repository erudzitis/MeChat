// Componenets
import ChatMessage from "./Message/ChatMessage";

const ChatBody = ({ messages, userId }) => {
    return (
        <>
            {messages.map(message => {
                return (
                    <ChatMessage
                        key={message.user_id}
                        content={message.content}
                        timestamp={message.created_at}
                        myMessage={userId === message.user_id}
                        author={message.username}
                    />
                )
            })}
        </>
    )
}

export default ChatBody;