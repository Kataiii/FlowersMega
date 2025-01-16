import React from "react"
import CardProduct from "../../entities/product/ui/cardProduct/CardProduct"
import { AddToCartButton } from "../../features/add-to-cart/AddToCartButton"
import { ToggleFavoritesButton } from "../../features/toggle-favorite/ToggleFavoriteButton"
import { FullProductSizeDto, ProductCatalogCard, useProductsControllerGetByIdQuery } from "../../store/product"
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin"
import { Skeleton } from "antd"
import CardProductCatalog from "../../entities/product/ui/cardProduct/CardProductCatalog"

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
        // addToCartButton={<AddToCartButton product={{ ...product.productSize, product: data }} />}
        // addToFavorites={<ToggleFavoritesButton item={product} />}
        />


    )
}