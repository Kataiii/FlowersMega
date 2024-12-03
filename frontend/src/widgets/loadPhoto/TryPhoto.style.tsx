import { styled } from "styled-components";

export const AvatarUploader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    & div{
        width: 200px !important;
        height: 200px !important;
        border-radius: 50% !important;
    }

    & span{
        border-radius: 50%;
        overflow: hidden;
    }

    & img{
        width: fit-content !important;
        height: 100% !important;
    }

    & button{
        width: 100% !important;
        height: 100% !important;
        padding-top: 75px !important;
        display: block;
    }
`