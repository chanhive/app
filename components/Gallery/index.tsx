/* eslint-disable jsx-a11y/media-has-caption,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import memoizeOne from "memoize-one";

import PreventBodyScroll from "@components/UI/PreventBodyScroll";

import { Body, Container, Playlist, PlaylistContainer, PlaylistItem, Root, Thumbnail, ThumbnailImage } from "@components/Gallery/index.styles";

import { PostFile } from "@utils/types";

export interface GalleryProps {
    hidden: boolean;
    files: PostFile[];
    onClose(): void;
}
export interface GalleryStates {
    currentIndex: number;
}

export default class Gallery extends React.Component<GalleryProps, GalleryStates> {
    public state: GalleryStates = {
        currentIndex: 0,
    };

    public componentDidUpdate(prevProps: Readonly<GalleryProps>) {
        if (this.props.files !== prevProps.files) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ currentIndex: 0 });
        }
    }

    private handlePlaylistItemClick = memoizeOne((index: number) => {
        return () => {
            this.setState({
                currentIndex: index,
            });
        };
    });
    private handleMediaClick = (e: React.MouseEvent<HTMLElement>) => {
        this.setState((prevStates: GalleryStates) => ({
            currentIndex: prevStates.currentIndex + 1,
        }));

        e.stopPropagation();
    };
    private handleBackgroundClick = () => {
        this.props.onClose();
    };

    private renderFile = (file: PostFile, index: number) => {
        const { files } = this.props;
        const { currentIndex } = this.state;
        const currentFile = files[currentIndex];

        return (
            <PlaylistItem isFocused={file === currentFile} key={file.id} onClick={this.handlePlaylistItemClick(index)}>
                {file.isVideo && <Thumbnail style={{ backgroundImage: `url(${file.thumbnailUrl})` }} />}
                {!file.isVideo && <ThumbnailImage src={file.thumbnailUrl} alt={`${file.name}${file.extension}`} />}
            </PlaylistItem>
        );
    };
    public render() {
        const { hidden, files } = this.props;
        const { currentIndex } = this.state;
        const currentFile = files[currentIndex];

        if (hidden) {
            return null;
        }

        return (
            <Root>
                <PreventBodyScroll />
                <Container>
                    <Body onClick={this.handleBackgroundClick}>
                        {currentFile.isVideo && <video onClick={this.handleMediaClick} autoPlay loop src={currentFile.url} />}
                        {!currentFile.isVideo && <img onClick={this.handleMediaClick} src={currentFile.url} alt={currentFile.name + currentFile.extension} />}
                    </Body>
                    <Playlist>
                        <PlaylistContainer>{files.map(this.renderFile)}</PlaylistContainer>
                    </Playlist>
                </Container>
            </Root>
        );
    }
}
