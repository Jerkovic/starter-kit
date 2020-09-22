import {Slider} from "antd";
import Title from "antd/es/typography/Title";
import * as React from "react";

export const Home = () => {
    return (
        <div>
            <Title level={3}>UI</Title>
            <img src={require("../assets/yetric-icon.png")} />
            <Slider defaultValue={30} />
        </div>
    );
};
