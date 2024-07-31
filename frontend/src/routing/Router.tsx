import { Route, Routes, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import App from "../App";
import Cart from "../pages/cart/ui/Cart";
import CartOrder from "../pages/cart/ui/CartOrder";
import Catalog from "../pages/catalog/ui/Catalog";
import Error from "../pages/error/ui/Error";
import Favourites from "../pages/favourites/ui/Favourites";
import Main from "../pages/main/ui/Main";
import {default as AdminMain} from "../pages/admin/ui/main/Main";
import {default as AdminOrders} from "../pages/admin/ui/orders/Orders";
import {default as AdminProducts} from "../pages/admin/ui/products/Products";
import {default as AdminReviews} from "../pages/admin/ui/reviews/Reviews";
import {default as AdminProduct} from "../pages/admin/ui/products/Product";
import Order from "../pages/admin/ui/orders/Order";
import OrderCall from "../pages/orderCall/OrderCall";
import Product from "../pages/product/ui/Product";
import Orders from "../pages/profile/ui/Orders";
import Profile from "../pages/profile/ui/Profile";
import ProfileMain from "../pages/profile/ui/ProfileMain";
import AboutUs from "../pages/shop_info/ui/about_us/AboutUs";
import Contacts from "../pages/shop_info/ui/contacts/Contacts";
import Help from "../pages/shop_info/ui/help/Help";
import PaymentDelivery from "../pages/shop_info/ui/payment_and_delivery/PaymentDelivery";
import Politics from "../pages/shop_info/ui/politics/Politics";
import Modal from "../shared/ui/modal/Modal";
import ModalRoute from "../shared/ui/modalRoute/ModalRoute";
import Portal from "../shared/ui/portal/Portal";
import { 
    ABOUT_PATH, 
    ADMIN_ORDER_PATH, 
    ADMIN_PATH, 
    ADMIN_PRODUCTS_PATH, 
    ADMIN_PRODUCT_PATH, 
    ADMIN_REVIEWS_PATH, 
    ADMIN_REVIEW_PATH, 
    AUTH_PATH, 
    CART_ORDER_PATH, 
    CART_PATH, 
    CATALOG_PATH, 
    CATEGORY_PATH, 
    CITIES_PATH, 
    CONTACTS_PATH, 
    EMAIL_PATH, 
    FAST_BUY_PATH, 
    FAVOURITES_PATH, 
    FILTERS_PATH, 
    HELP_PATH, 
    HOME_PATH, 
    ORDERS_PATH, 
    ORDER_CALL_PATH, 
    ORDER_SUCCESS_PATH, 
    PAYMENT_DELIVERY_PATH, 
    POLITICS_PATH, 
    PRODUCT_PATH, 
    PROFILE_PATH, 
    RECOVERY_PASSWORD_PATH, 
    REGIST_PATH, 
    SEARCH_PATH
} from "../shared/utils/constants";
import Auth from "../widgets/auth/ui/Auth";
import Cities from "../widgets/cities/ui/Cities";
import FastBuy from "../widgets/fastBuy/ui/FastBuy";
import RecoveryPassword from "../widgets/recoveryPassword/ui/RecoveryPassword";
import Regist from "../widgets/regist/ui/Regist";
import { AuthGuard } from "./guards/AuthGuard";
import { RoleGuard } from "./guards/RoleGuard";
import Review from "../pages/admin/ui/reviews/Review";

const Router: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const previousLocation = location.state?.previousLocation;

    return (
        <>
            <Routes location={previousLocation || location}>
                <Route path={HOME_PATH} element={<App />}>
                    <Route path={HOME_PATH} element={<Main />} />
                    <Route path={CATALOG_PATH} element={<Catalog />}>
                        <Route path={`${CATALOG_PATH}${SEARCH_PATH}`} element={<Catalog/>}/>
                        <Route path={`${CATALOG_PATH}${CATEGORY_PATH}`} element={<Catalog/>}/>
                        <Route path={`${CATALOG_PATH}${FILTERS_PATH}`} element={<Catalog/>}/>
                        <Route path={`${CATALOG_PATH}${SEARCH_PATH}${CATEGORY_PATH}`} element={<Catalog/>}/>
                        <Route path={`${CATALOG_PATH}${SEARCH_PATH}${FILTERS_PATH}`} element={<Catalog/>}/>
                        <Route path={`${CATALOG_PATH}${CATEGORY_PATH}${FILTERS_PATH}`} element={<Catalog/>}/>
                        <Route path={`${CATALOG_PATH}${SEARCH_PATH}${CATEGORY_PATH}${FILTERS_PATH}`} element={<Catalog/>}/>
                    </Route>
                    <Route path={`${PRODUCT_PATH}/:name/:size`} element={<Product />} />
                    {/* <Route path={PROFILE_PATH} element={<AuthGuard/>}> */}
                        <Route path={PROFILE_PATH} element={<AuthGuard>
                            <ProfileMain/>
                        </AuthGuard>}>
                            <Route path={''} element={<Profile />} />
                            <Route path={ORDERS_PATH} element={<Orders />} />
                        </Route>
                    {/* </Route> */}
                    <Route path={CART_PATH} element={<Cart />}/>
                    <Route path={CART_ORDER_PATH} element={<CartOrder />} />
                    <Route path={FAVOURITES_PATH} element={<Favourites />} />
                    <Route path={PAYMENT_DELIVERY_PATH} element={<PaymentDelivery />} />
                    <Route path={ABOUT_PATH} element={<AboutUs />} />
                    <Route path={CONTACTS_PATH} element={<Contacts />} />
                    <Route path={HELP_PATH} element={<Help />} />
                    <Route path={POLITICS_PATH} element={<Politics />} />
                    <Route path={ADMIN_PATH} element={<RoleGuard>
                            <AdminMain/>
                        </RoleGuard>}>
                        <Route path={''} element={<AdminOrders/>}/>
                        <Route path={ADMIN_PRODUCTS_PATH} element={<AdminProducts/>}/>
                        <Route path={ADMIN_REVIEWS_PATH} element={<AdminReviews/>}/>
                    </Route>
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
                {
                    previousLocation && (
                        <Routes>
                            <Route path={REGIST_PATH} element={<ModalRoute prevLocation={HOME_PATH}>
                                <Regist />
                            </ModalRoute> } />
                            <Route path={AUTH_PATH} element={<ModalRoute prevLocation={HOME_PATH}>
                                <Auth/>
                            </ModalRoute>} />
                            <Route path={RECOVERY_PASSWORD_PATH} element={<ModalRoute prevLocation={previousLocation}>
                                <RecoveryPassword />
                            </ModalRoute>} />
                            <Route path={EMAIL_PATH} element={<Portal children={<Portal children={
                                <Modal title="Новый пароль был выслан на ваш E-mail"
                                    buttonContent="Вернуться на главную"
                                    clickHandler={() => navigate(HOME_PATH)} />
                            } />} />} />
                            <Route path={CITIES_PATH} element={<Portal children={<Cities />} />} />
                            <Route path={FAST_BUY_PATH} element={<Portal children={<FastBuy />} />} />
                            <Route path={ORDER_SUCCESS_PATH} element={<Portal children={
                                <Modal title="Ваш заказ принят"
                                    content="Мы свяжемся с вами в кротчайшее время"
                                    buttonContent="Вернуться на главную"
                                    clickHandler={() => navigate(HOME_PATH)} />
                            } />} /> 
                            <Route path={ORDER_CALL_PATH} element={<ModalRoute prevLocation={previousLocation}>
                                <OrderCall/>
                            </ModalRoute>} />
                            <Route path={ADMIN_ORDER_PATH} element={<ModalRoute prevLocation={previousLocation}>
                                <Order/>
                            </ModalRoute>}/>
                            <Route path={ADMIN_PRODUCT_PATH} element={<ModalRoute prevLocation={previousLocation}>
                                <AdminProduct/>
                            </ModalRoute>}/>
                            <Route path={ADMIN_REVIEW_PATH} element={<ModalRoute prevLocation={previousLocation}>
                                <Review/>
                            </ModalRoute>}/>
                        </Routes>
                    )
                }
        </>
    )
}

export default Router;