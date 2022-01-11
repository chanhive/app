import React from "react";

import { Global } from "@emotion/react";

import { GlobalStyle, Root } from "components/Layout.styles";

export interface LayoutProps {
    children: React.ReactNode;
}
export interface LayoutStates {}

export default class Layout extends React.Component<LayoutProps, LayoutStates> {
    public render() {
        const { children } = this.props;

        return (
            <>
                <Global styles={GlobalStyle} />
                <Root>{children}</Root>
            </>
        );
    }
}
