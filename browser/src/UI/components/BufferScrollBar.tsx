import * as React from "react"

import styled from "styled-components"

import { bufferScrollBarSize } from "./common"

export interface IBufferScrollBarProps {
    bufferSize: number
    height: number
    windowTopLine: number
    windowBottomLine: number
    markers: IScrollBarMarker[]
    visible: boolean
}

export interface IScrollBarMarker {
    line: number
    height: number
    color: string
}

const ScrollBarContainer = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.2);
    width: ${bufferScrollBarSize};
    border-bottom: 1px solid black;
`

const ScrollBarWindow = styled.div`
    position: absolute;
    width: ${bufferScrollBarSize};
    background-color: rgba(200, 200, 200, 0.2);
    border-top:1px solid rgba(255, 255, 255, 0.1);
    border-bottom:1px solid rgba(255, 255, 255, 0.1);
`

export class BufferScrollBar extends React.PureComponent<IBufferScrollBarProps, {}> {

    constructor(props: any) {
        super(props)
    }

    public render(): JSX.Element {

        if (!this.props.visible) {
            return null
        }

        const windowHeight = ((this.props.windowBottomLine - this.props.windowTopLine + 1) / this.props.bufferSize) * this.props.height
        const windowTop = ((this.props.windowTopLine - 1) / this.props.bufferSize) * this.props.height

        const windowStyle: React.CSSProperties  = {
            top: windowTop + "px",
            height: windowHeight + "px",
        }

        const markers = this.props.markers || []

        const markerElements = markers.map((m) => {
            const line = m.line
            const pos = (line / this.props.bufferSize) * this.props.height
            const size = "2px"

            const markerStyle: React.CSSProperties = {
                position: "absolute",
                top: pos + "px",
                height: size,
                backgroundColor: m.color,
                width: "100%",
            }

            return <div style={markerStyle} key={m.line.toString() + m.color}/>
        })

        return <ScrollBarContainer>
                    <ScrollBarWindow style={windowStyle}></ScrollBarWindow>
                    {markerElements}
                </ScrollBarContainer>
    }
}
