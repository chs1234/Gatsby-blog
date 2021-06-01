import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

interface InfoPageProps {
    data: {
        site: {
            siteMetadata: {
                title: String;
                description: String;
                author: String;
            }
        }
    }
}

const globalStyle = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 20px;
    }
`;

const TextStyle = css`
    font-size: 18px;
    font-weight: 700;
    color: grey;
`;

// Kebab Case
const Text1 = styled.div<{disable: boolean}>`
    font-size: 20px;
    font-weight: 700;
    text-decoration: ${({ disable }) => (disable ? 'line-through': 'none')};
`;

// Camel Case
const Text2 = styled('div')<{disable: boolean}>(({ disable }) => ({
    fontSize: '15px',
    color: 'blue',
    textDecoration: disable ? 'line-through' : 'none',
}));

const InfoPage: FunctionComponent<InfoPageProps> = function({
    data: {
        site: {
            siteMetadata: { title, description, author },
        },
    }
}) {
    return (
        <div>
            <Global styles={globalStyle} />
            <div css={TextStyle}>{title}</div>
            <Text1 disable={false}>{description}</Text1>
            <Text2 disable={false}>{author}</Text2>
        </div>
    );
};

export default InfoPage;

export const metadataQuery = graphql`
    {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`;