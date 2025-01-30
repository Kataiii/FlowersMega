import React from "react"
import { ProductCatalogCard } from "../../store/product"
import CardProductCatalog from "../../entities/product/ui/cardProduct/CardProductCatalog"
import { ToggleFavoritesButtonProduct } from "../../features/toggle-favorite/ToggleFavoriteButtonProduct"

type SmartProductCardProps = {
    product: ProductCatalogCard,
}

export const SmartProductCardCatalog: React.FC<SmartProductCardProps> = ({ product }) => {
    return (
        <CardProductCatalog
            product={product}
            addToFavorites={<ToggleFavoritesButtonProduct item={product} />}
        />
    )
}