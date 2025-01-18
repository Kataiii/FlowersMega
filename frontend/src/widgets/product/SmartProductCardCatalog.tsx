import React from "react"
import CardProduct from "../../entities/product/ui/cardProduct/CardProduct"
import { AddToCartButton } from "../../features/add-to-cart/AddToCartButton"
import { ToggleFavoritesButton } from "../../features/toggle-favorite/ToggleFavoriteButton"
import { FullProductSizeDto, ProductCatalogCard, useProductsControllerGetByIdQuery } from "../../store/product"
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin"
import { Button, Skeleton } from "antd"
import { ReactComponent as AddCart } from '../../shared/assets/add_cart.svg';
import CardProductCatalog from "../../entities/product/ui/cardProduct/CardProductCatalog"
import { ButtonText } from "../../pages/admin/ui/products/Products"
import { ButtonStyle } from "../../shared/ui/button/Button"
import { ToggleFavoritesButtonProduct } from "../../features/toggle-favorite/ToggleFavoriteButtonProduct"

type SmartProductCardProps = {
    product: ProductCatalogCard,
}

export const SmartProductCardCatalog: React.FC<SmartProductCardProps> = ({ product }) => {

    // const { isLoading, data } = useProductsControllerGetByIdQuery({ id: product.productSize.idProduct });
    // // const responseSize = useSizesControllerGetByIdQuery({id: size.idSize});

    // if (data == null) return null;
    return (
        <CardProductCatalog
            product={product}
            // addToCartButton={}
            addToFavorites={<ToggleFavoritesButtonProduct item={product} />}
        />


    )
}