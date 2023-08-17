import React from "react";
import { Typography } from "antd";
import "./styles.css"

export default function Messages(){
    const {Text}=Typography;

    return (
        <>

            <Text className="component-status" type="secondary">Development in progress...</Text>
        </>
    )
}