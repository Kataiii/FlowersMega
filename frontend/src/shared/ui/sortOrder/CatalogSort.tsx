import { CaretDownOutlined } from "@ant-design/icons"
import { ConfigProvider, Select } from "antd"

export type SortOption = "popularity_asc" | "popularity_desc" | "price_asc" | "price_desc"

interface CatalogSortProps {
    onChange: (value: SortOption) => void
    value?: SortOption
}

export const CatalogSort: React.FC<CatalogSortProps> = ({ onChange, value }) => {
    const options = [
        { value: "averageRating_asc", label: "По популярности (возр.)" },
        { value: "averageRating_desc", label: "По популярности (убыв.)" },
        { value: "price_asc", label: "Цена по возрастанию" },
        { value: "price_desc", label: "Цена по убыванию" },
    ]

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBorder: "var(--primary-bg-color)"
                },
                components: {
                    Select: {

                        optionSelectedColor: "var(--primary-bg-color)"

                    },

                }
            }}
        >
            <Select
                value={value}
                defaultValue={"price_asc"}
                onChange={onChange}
                options={options}
                suffixIcon={<CaretDownOutlined />}
                style={{
                    width: 200,
                    backgroundColor: "transparent",
                    borderRadius: "4px",
                    color: "var(--pink-color)",
                }}
                placeholder="Сортировка"
                popupMatchSelectWidth={false}
                className="catalog-sort"
            />
        </ConfigProvider>
    )
}

