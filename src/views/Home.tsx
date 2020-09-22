import Title from "antd/es/typography/Title";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {ItemList} from "../components/ItemList";

@inject("rootStore")
@observer
export class Home extends React.Component<any, any> {
    public render() {
        const {items} = this.props.rootStore;
        return (
            <div>
                <Title level={3}>Yetric UI</Title>
                <img src={require("../assets/yetric-icon.png")} />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    adipisci aut culpa ea, eligendi est, id in incidunt
                    inventore maxime nam nesciunt nostrum odio quibusdam quo
                    similique unde, voluptates voluptatum.
                </p>
                <ItemList store={items} />
            </div>
        );
    }
}
