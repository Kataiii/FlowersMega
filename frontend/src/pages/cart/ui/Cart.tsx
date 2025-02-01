import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  cartSelectors,
  selectTotalCount,
} from "../../../entities/cart/redux/selectors";
import Button from "../../../shared/ui/button/Button";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { CART_ORDER_PATH, CATALOG_PATH } from "../../../shared/utils/constants";
import { useAppSelector } from "../../../store/store";
import { CartProductCard } from "../../../widgets/cart-product-card/CartProductCard";
import { useMinOrderCostGetQuery } from "../../../store/minOrderCost";
import { selectActiveCity } from "../../../entities/city/redux/selectors";
import { useCategoryControllerGetIdByNameQuery } from "../../../store/product";
import CenteredSpin from "../../../shared/ui/spinner/CenteredSpin";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { data: categoryIdData, isLoading: isLoadingCategoryIdData } =
    useCategoryControllerGetIdByNameQuery({ name: "Открытки" });
  const cartTotal = useAppSelector(selectTotalCount);
  const productsInCart = useAppSelector(cartSelectors.selectAll);
  const activeCity = useAppSelector(selectActiveCity);
  const { data: minOrderCost, isLoading: minOrderCostLoading } =
    useMinOrderCostGetQuery();
  const totalCost = useMemo(
    () =>
      productsInCart
        .map((p) => p.count * (p.prise ?? 0))
        .reduce((prev, curr) => prev + curr, 0),
    [productsInCart]
  );
  const orderHandler = () => {
    navigate(CART_ORDER_PATH);
  };

  return (
    <Container style={{ margin: "0 auto", flexGrow: 3, padding: "35px 0" }}>
      <h1
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 32,
          color: "var(--secondary-text-color)",
        }}
      >{`Моя корзина (${cartTotal})`}</h1>
      <div style={{ padding: "0 10px" }}>
        <div
          style={{
            borderRadius: "6px",
            padding: "16px 16px 32px 16px",
            backgroundColor: "#FFFFFF",
          }}
        >
          {productsInCart.length === 0 ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: 45,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 25,
              }}
            >
              <h2
                style={{
                  fontFamily: "Inter",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "var(--secondary-text-color)",
                }}
              >
                Корзина пуста
              </h2>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "var(--secondary-text-color)",
                }}
              >
                Для выбора товаров перейдите в каталог
              </p>
              <div style={{ width: "fit-content" }}>
                <Button
                  buttonContent={"Перейти в каталог"}
                  clickHandler={() => navigate(CATALOG_PATH)}
                ></Button>
              </div>
            </div>
          ) : minOrderCostLoading || isLoadingCategoryIdData ? (
            <CenteredSpin />
          ) : (
            <div>
              {productsInCart.map((product, index) => (
                <CartProductCard
                  key={`CartProductCard-${index}`}
                  product={product}
                  categoryIdData={categoryIdData}
                />
              ))}

              <div
                style={{
                  padding: "15px 0 25px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      width: "45%",
                      padding: "0 15px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: 16,
                        color: "var(--secondary-text-color)",
                      }}
                    >
                      Промокод
                    </p>
                    <input
                      style={{
                        border: "1px solid #8B8B8B",
                        borderRadius: 4,
                        width: 370,
                        height: 40,
                        padding: "0 5px",
                        fontFamily: "Inter",
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#8B8B8B",
                      }}
                      placeholder="Введите промокод"
                    />
                  </div>
                  <div style={{ width: "45%", padding: "0 15px" }}>
                    <div
                      style={{
                        display: "flex",
                        padding: "12px 0",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: 16,
                          color: "var(--secondary-text-color)",
                        }}
                      >
                        Итого по позициям:
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: 16,
                          color: "var(--secondary-text-color)",
                        }}
                      >
                        {totalCost.toLocaleString()} ₽
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "12px 0",
                        justifyContent: "space-between",
                        borderTop: "1px solid #73D982",
                        borderBottom: "1px solid #73D982",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: 16,
                          color: "var(--secondary-text-color)",
                          display: "flex",
                          gap: 5,
                        }}
                      >
                        Доставка{" "}
                        <p
                          style={{
                            color: "var(--primary-bg-color)",
                            borderBottom: "1px solid var(--primary-bg-color)",
                          }}
                        >
                          г.{activeCity?.name}
                        </p>
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: 16,
                          color: "var(--secondary-text-color)",
                        }}
                      >
                        Бесплатно
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "12px 0",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 600,
                          fontSize: 20,
                          color: "var(--secondary-text-color)",
                        }}
                      >
                        Итого:
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 600,
                          fontSize: 20,
                          color:
                            totalCost <
                            (minOrderCost && minOrderCost.length > 0
                              ? minOrderCost[0].value
                              : Infinity)
                              ? "var(--error)"
                              : "var(--secondary-text-color)",
                        }}
                      >
                        {totalCost.toLocaleString()} ₽
                      </p>
                    </div>
                    {totalCost <
                    (minOrderCost && minOrderCost.length > 0
                      ? minOrderCost[0].value
                      : Infinity) ? (
                      <div
                        style={{
                          display: "flex",
                          padding: "12px 0",
                          justifyContent: "end",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: 12,
                            color: "var(--error)",
                          }}
                        >
                          Минимальная сумма заказа{" "}
                          {minOrderCost ? minOrderCost[0].value : 0} ₽
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div style={{ width: "40%", margin: "0 auto" }}>
                  <Button
                    style={{
                      backgroundColor:
                        totalCost <
                        (minOrderCost && minOrderCost.length > 0
                          ? minOrderCost[0].value
                          : Infinity)
                          ? "gray"
                          : "var(--primary-bg-color)",
                    }}
                    disabled={
                      totalCost <
                      (minOrderCost && minOrderCost.length > 0
                        ? minOrderCost[0].value
                        : Infinity)
                    }
                    buttonContent={"Оформить заказ"}
                    clickHandler={orderHandler}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Cart;