// Requirements
import React from "react";

// Components
import Flex from "../../../Custom/Flex";

// Utils
import { shortDate } from "../../../../utils";

const ChatMessage = ({ content, myMessage, timestamp, author }) => {
    return (
        <Flex justify={myMessage ? "end" : "start"}>
            {/* Wrapper */}
            <Flex direction="column" style={{ "maxWidth": "50%" }}>
                <Flex className="gap-1 h-1rem py-3" direction="row" align="center" justify={myMessage ? "end" : "start"}>
                    {!myMessage && <h4 className="p-0 m-0 font-normal">{author}</h4>}
                    <h4 className="p-0 m-0 font-bold text-xs text-300">{shortDate(timestamp)}</h4>
                </Flex>

                <Flex align="center" className={`border-round ${myMessage ? "bg-primary" : "surface-ground"}`}>
                    <h4 className="p-2 m-0 font-normal">{content}</h4>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ChatMessage;