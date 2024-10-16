import { CSSProperties, useState } from "react";
import { styled } from "styled-components";
import { useCategoryControllerGetIdByNameQuery, useProductsSizesControllerGetByCategotyIdWithPaginationQuery } from "../../store/product";
import { SmartProductCard } from "../product/SmartProductCart";
import ModalEmpty from "../../shared/ui/modalEmpty/ModalEmpty";
import { BlockGrid } from "./BlockProducts";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button } from "antd";
import { ReactComponent as DecorIcon} from "../../shared/assets/decor.svg";
import { ReactComponent as TopperIcon} from "../../shared/assets/topper.svg";
import { ReactComponent as PostCardIcon} from "../../shared/assets/postcard.svg";
import BlockProductsExtrasModal from "./BlockProductsExtrasModal";

const Wrapper = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    position: relative;
`;

const buttonStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    width: '100%',
    height: 50
}

const iconStyle = {
    height: '90%',
    width: 'fit-content'
}

const nothingStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: '24px'
}

const BlockProductsExtras: React.FC = () => {
    const [isToppersOpen, setIsToppersOpen] = useState(false);
    const [isPostCardsOpen, setIsPostCardsOpen] = useState(false);
    const [isDecorOpen, setIsDecorOpen] = useState(false);

    const { data: toppersCategoryData, isLoading: isToppersCategoryLoading, isSuccess: isToppersCategorySuccess } = useCategoryControllerGetIdByNameQuery({ name: 'Топперы' });
    const { data: postCardsCategoryData, isLoading: isPostCardsCategoryLoading, isSuccess: isPostCardsCategorySuccess } = useCategoryControllerGetIdByNameQuery({ name: 'Открытки' });
    const { data: decorCategoryData, isLoading: isDecorCategoryLoading, isSuccess: isDecorCategorySuccess } = useCategoryControllerGetIdByNameQuery({ name: 'Декор' });

    return (
        <div>
            <Wrapper>
                <Button type="primary" style={buttonStyle} onClick={() => setIsToppersOpen(true)}>
                    <h2>Топперы</h2>
                    <TopperIcon style={iconStyle}/>
                </Button>
                <Button type="primary" style={buttonStyle} onClick={() => setIsPostCardsOpen(true)}>
                    <h2>Открытки</h2>
                    <PostCardIcon style={iconStyle}/>
                </Button>
                <Button type="primary" style={buttonStyle} onClick={() => setIsDecorOpen(true)}>
                    <h2>Декор</h2>
                    <DecorIcon style={iconStyle}/>
                </Button>
            </Wrapper>

            {
                (!isToppersCategorySuccess && !isToppersOpen) ? <></> :
                <BlockProductsExtrasModal category={Number(toppersCategoryData)} isOpen={isToppersOpen} setIsOpen={setIsToppersOpen} />
            }

            {
                (!isPostCardsCategorySuccess && !isPostCardsOpen) ? <></> :
                <BlockProductsExtrasModal category={Number(postCardsCategoryData)} isOpen={isPostCardsOpen} setIsOpen={setIsPostCardsOpen} />
            }

            {
                (!isDecorCategorySuccess && !isDecorOpen) ? <></> :
                <BlockProductsExtrasModal category={Number(decorCategoryData)} isOpen={isDecorOpen} setIsOpen={setIsDecorOpen} />
            }
        </div>
    );
};

export default BlockProductsExtras;
