// Requirements
import React from "react";

// Components
import Flex from "../../../Custom/Flex";

const ChatMessage = ({ content, myMessage, timestamp }) => {
    return (
        <Flex justify={myMessage ? "end" : "start"}>
            {/* Wrapper */}
            <Flex direction="column">
                <Flex className="gap-1 h-1rem py-3" direction="row" align="center" justify={myMessage ? "end" : "start"}>
                    {!myMessage && <h4 className="p-0 m-0 font-normal">Mike</h4>}
                    <h4 className="p-0 m-0 font-bold text-xs text-300">{new Date(timestamp).toLocaleString("en-US", { timeStyle: "short" })}</h4>
                </Flex>

                <Flex align="center" className={`border-round ${myMessage ? "bg-primary" : "surface-ground"} w-max`}>
                    <h4 className="p-2 m-0 font-normal">{content}</h4>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ChatMessage;