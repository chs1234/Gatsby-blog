import React, { FunctionComponent, useMemo } from 'react';
import styled from '@emotion/styled';
import Introduction from 'components/Main/Introduction';
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList';
import PostList, { PostType } from 'components/Main/PostList';
import { ProfileImageProps } from 'components/Main/ProfileImage'
import { graphql } from 'gatsby';
import queryString, { ParsedQuery } from 'query-string';
import Template from 'components/Common/Template';

interface IndexPageProps {
    location: {
        search: String;
    };
    data: {
        allMarkdownRemark: {
            edges: PostType[];
        };
        file: {
            childImageSharp: {
                fluid: ProfileImageProps['profileImage'];
            }
        }
    };
}

// const CATEGORY_LIST = {
//     All: 5,
//     Web: 3,
//     Mobile: 2,
// }

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     height: 100%;
// `;

const IndexPage: FunctionComponent<IndexPageProps> = function({
    location: { search },
    data: {
        allMarkdownRemark: { edges },
        file: {
            childImageSharp: { fluid }
        }
    }
}) {
    const parsed: ParsedQuery<String> = queryString.parse(search);
    const selectedCategory: String 
        = typeof parsed.category !== 'String' || !parsed.category 
            ? 'All'
            : parsed.category;

    const categoryList = useMemo(
        () => edges.reduce((
            list: CategoryListProps['categoryList'],
            {
                node: {
                    frontmatter: { categories }
                }
            }: PostType
        ) => {
            categories.forEach(category => {
                if (list[category] === undefined) list[category] = 1;
                else list[category]++;
            });

            list['All']++;

            return list;
        },
        {All: 0}
        ),
        []
    );

    return (
        <Template>
            <Introduction profileImage={fluid} />
            <CategoryList 
                selectedCategory={selectedCategory} 
                categoryList={categoryList} 
            />
            <PostList selectedCategory={selectedCategory} posts={edges} />
        </Template>
    );
};

export default IndexPage;

export const getPostList = graphql`
    query getPostList {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date, frontmatter___title]}
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        summary
                        date(formatString: "YYYY.MM.DD")
                        categories
                        thumbnail {
                            childImageSharp {
                                fluid(
                                    maxWidth: 768
                                    maxHeight: 200
                                    fit: INSIDE
                                    quality: 100
                                ) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
        file(name: { eq: "profile-image"}) {
            childImageSharp {
                fluid(maxWidth: 120, maxHeight: 120, fit: INSIDE, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }    
        }
    }
`;