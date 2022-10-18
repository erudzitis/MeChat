// Requirements
import { ToggleButton } from "primereact/togglebutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import EmojiPicker from "emoji-picker-react";

// Components
import Center from "../../Custom/Center";

const ChatFooter = ({ handleChat, handleEmoji, showEmoji, setShowEmoji, message, setMessage, setIsTyping }) => {
    return (
        <Center className="gap-2 h-5rem p-2" direction="row">
            {showEmoji &&
                <div className="absolute bottom-50 fadein animation-duration-500">
                    <EmojiPicker onEmojiClick={handleEmoji} lazyLoadEmojis />
                    <div className="h-3rem" />
                </div>
            }

            <ToggleButton onIcon="pi pi-minus" onLabel="" offIcon="pi pi-plus" offLabel="" checked={showEmoji} onChange={(e) => setShowEmoji(e.value)} />
            <InputText
                type="text"
                className="p-inputtext-md w-full" v
                alue={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
            />
            <Button onClick={handleChat} icon="pi pi-send" iconPos="right" disabled={!message} />
        </Center>
    )
}

export default ChatFooter;