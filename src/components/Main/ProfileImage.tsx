import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';

export interface ProfileImageProps {
    profileImage: FluidObject;
}

// 자신이 원하는 프로필 이미지 링크로 설정.
const PROFILE_IMAGE_LINK = 
    'https://www.denofgeek.com/wp-content/uploads/2020/06/We-Bare-Bears-Movie.png?resize=768%2C432';

const ProfileImageWrapper = styled(Img)`
    width: 120px;
    height: 120px;
    margin-bottom: 30px;
    border-radius: 50%;

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
`;

const ProfileImage: FunctionComponent<ProfileImageProps> = function({
    profileImage
}) {
    return <ProfileImageWrapper fluid={profileImage} alt="Profile Image" />;
}

export default ProfileImage;