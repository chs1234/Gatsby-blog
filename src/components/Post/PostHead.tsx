import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';
import PostHeadInfo, { PostHeadInfoProps } from 'components/Post/PostHeadInfo';

type GatsbyImgProps = {
    fluid: FluidObject;
    alt: String;
    className?: String;
}

export interface PostHeadProps extends PostHeadInfoProps {
    thumbnail: {
        childImageSharp: {
            fluid: FluidObject;
        }
    }
}

const PostHeadWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 400px;

    @media (max-width: 768px) {
        height: 300px;
    }
`;

const PostHeadInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 768px;
    height: 100%;
    margin: 0 auto;
    padding: 60px 0;
    color: #ffffff;

    @media (max-width: 768px) {
        width: 100%;
        padding: 40px 20px;
    }
`;

const PrevPageIcon = styled.div`
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ffffff;
    color: #ffffff;
    font-size: 22px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        width: 100%;
        padding: 40px 20px;
    }
`;

const Title = styled.div`
    display: -webkit-box;
    overflow: hidden;
    overflow-wrap: break-word;
    margin-top: auto;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 22px;
    font-weight: 800;

    @media (max-width: 768px) {
        font-size: 30px;
    }
`;

const PostData = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 700;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        font-size: 15px;
        font-weight: 400;
    }
`;

const BackgroundImage = styled((props: GatsbyImgProps) => (
    <Img {...props} style={{postion: 'absolute'}} />
))`
    z-index: -1;
    width: 100%;
    height: 400px;
    object-fit: cover;
    filter: brightness(0.25);

    @media (max-width: 768px) {
        height: 300px;
    }
`;

const PostHead: FunctionComponent<PostHeadProps> = function({
    title,
    date,
    categories,
    thumbnail: {
        childImageSharp: { fluid }
    }
}) {
    return (
        <PostHeadWrapper>
            <BackgroundImage fluid={fluid} alt="thumbnail" />
            <PostHeadInfo title={title} date={date} categories={categories} />
        </PostHeadWrapper>
    );
}

export default PostHead;