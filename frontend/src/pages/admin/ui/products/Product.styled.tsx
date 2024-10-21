import TextArea from "antd/es/input/TextArea";
import { styled } from "styled-components";


export const Block = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 760px;
    height: 185px;
    margin-bottom: 0;
`

export const StyledTextArea = styled(TextArea)`
    resize: none;
    overflow-x:hidden;
    overflow-y: auto;
    text-align: justify;
    word-break: normal;
    max-height: 80px;
    height: 80px;
    padding: 8px
`

export const ImageBlockOutside = styled.div`
    width: 150px;
    height: 155px;
    border-radius: 12px;
    border: 1px solid var(--primary-bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ImageBlockInside = styled.div`
    width: 142px;
    height: 147px;
    border-radius: 12px;
    border: 1px dashed var(--primary-bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledVarBlock = styled.div`
    width: 760px;
    height: 250px;
    max-height: 250px;
    border: 1px solid var(--primary-bg-color);
    border-radius: 8px;
    margin: 4px 0;
    padding: 8px;
`

export const StyledCategoriesFiltersBlock = styled.div`
    width: 760px;
    height: 42px;
    border: 1px solid var(--primary-bg-color);
    border-radius: 8px;
    margin 4px 0;
    align-items: center;
    padding: 2.5px;
    max-height: 42px;
`