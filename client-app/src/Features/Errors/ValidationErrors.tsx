import React from "react";
import { Message, MessageItem, MessageList } from "semantic-ui-react";

interface Props {
    errors: any;
}

export default function ValidationErrors({errors}: Props) {
    const errorList = [errors.message]

    return(
        <Message error>
            {errorList && (
                <MessageList>
                    {errorList.map((err: any, i: any) => {
                        return <MessageItem key={i}>{err}</MessageItem>
                    })}
                </MessageList>
            )}
        </Message>
    )
}