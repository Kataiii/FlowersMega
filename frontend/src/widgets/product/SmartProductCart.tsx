import React from "react"
import CardProduct from "../../entities/product/ui/cardProduct/CardProduct"
import { AddToCartButton } from "../../features/add-to-cart/AddToCartButton"
import { ToggleFavoritesButton } from "../../features/toggle-favorite/ToggleFavoriteButton"
import { FullProductSizeDto, useProductsControllerGetByIdQuery } from "../../store/product"

type SmartProductCardProps = {
    product: FullProductSizeDto,
}

export const SmartProductCard: React.FC<SmartProductCardProps> = ({ product }) => {

    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: product.productSize.idProduct});
    // const responseSize = useSizesControllerGetByIdQuery({id: size.idSize});

    if(data == null) return null;
    return (
        <>
        {
            isLoading
            ?   <p>Загрузка...</p>
            :   <CardProduct
                        product={product}
                        addToCartButton={<AddToCartButton product={{...product.productSize, product: data}} />}
                        addToFavorites={<ToggleFavoritesButton item={product} />}
                    />
        }
        </>

    )
}