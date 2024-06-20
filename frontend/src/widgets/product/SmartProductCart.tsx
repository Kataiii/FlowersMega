import React from "react"
import CardProduct from "../../entities/product/ui/cardProduct/CardProduct"
import { AddToCartButton } from "../../features/add-to-cart/AddToCartButton"
import { ToggleFavoritesButton } from "../../features/toggle-favorite/ToggleFavoriteButton"
import { Product, ProductSize, useProductsControllerGetByIdQuery } from "../../store/product"
import { Size, useSizesControllerGetByIdQuery } from "../../store/size"

type SmartProductCardProps = {
    size: ProductSize,
}

export const SmartProductCard: React.FC<SmartProductCardProps> = ({ size }) => {

    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: size.idProduct });
    const responseSize = useSizesControllerGetByIdQuery({id: size.idSize});

    return isLoading && !data && !responseSize.data
        ? <p>Загрузка</p>
        : <CardProduct
            product={{...data!, productSize: size, size: responseSize.data }}
            addToCartButton={<AddToCartButton product={{...size, product: data!}} />}
            addToFavorites={<ToggleFavoritesButton item={size} />}
        />
}