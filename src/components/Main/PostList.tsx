import React, { FunctionComponent, useMemo } from 'react';
import styled from '@emotion/styled';
import PostItem from './PostItem';
import { FluidObject } from 'gatsby-image';
import useInfiniteScroll, { useInfiniteScrollType } from 'hooks/useInfiniteScroll';

export type PostType = {
    node: {
        id: String;
        fields: {
            slug: String;
        }
        frontmatter: {
            title: String;
            summary: String;
            date: String;
            categories: String[];
            thumbnail: {
                fluid: FluidObject;
            };
        }
    }
}

interface PostListProps {
    selectedCategory: String;
    posts: PostType[];
}

const POST_ITEM_DATA = {
    title: 'Post Item Title',
    date: '2021.05.31',
    categories: ['Web', 'Frontend', 'Testing'],
    summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellat doloremque fugit quis rem temporibus! Maxime molestias, suntrem debitis odit harum impedit. Modi cupiditate harum dignissimos eos in corrupti!',
    thumbnail: '<https://ji5485.github.io/static/e4f34c558ae8e8235ff53b0311085796/4d854/javascript-core-concept-summary-function-1.webp>',
    link: '<https://www.google.co.kr>'
};

const PostListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 768px;
    margin: 0 auto;
    padding: 50px 0 100px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        width: 100%;
        padding: 50px 20px;
    }
`;

const PostList: FunctionComponent<PostListProps> = function({
    selectedCategory,
    posts
}) {
    const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
        selectedCategory, 
        posts
    ); 

    return (
        <PostListWrapper ref={containerRef}>
            {posts.map(
                ({ 
                    node: { 
                        id, 
                        fields: { slug },
                        frontmatter 
                    }
                }: PostType) => (
                    <PostItem {...frontmatter} link={slug} key={id} />
                )
            )}
        </PostListWrapper>
    );
};

export default PostList;