// Requirements
import { Button } from "primereact/button";

// Components
import Flex from "../../Custom/Flex";
import AvatarButton from "../../Main/AvatarButton";

const ChatHeader = ({ name, image }) => {
    return (
        <Flex className="h-5rem" align="center">
            <Flex className="flex-1 p-2" align="center">
                <AvatarButton image={image} shape="circle" size="xlarge" />
                <h3 className="p-0 m-0 ml-2 text-white">{name}</h3>
            </Flex>
            <Flex className="p-3">
                <Button icon="pi pi-list" className="p-button-rounded p-button-text" />
            </Flex>
        </Flex>
    )
}

export default ChatHeader;