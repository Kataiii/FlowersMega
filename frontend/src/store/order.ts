import { emptyApi as api } from "./emptyApi";
import { ProductSize } from "./product";

const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		ordersControllerCreate: build.mutation<
			OrdersControllerCreateApiResponse,
			OrdersControllerCreateApiArg
		>({
			query: (queryArg) => ({
				url: `/orders`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		ordersControllerGetAll: build.query<
			OrdersControllerGetAllApiResponse,
			OrdersControllerGetAllApiArg
		>({
			query: () => ({ url: `/orders` }),
	  	}),
		ordersControllerGetById: build.query<
		  OrdersControllerGetByIdApiResponse,
		  OrdersControllerGetByIdApiArg
		>({
		  	query: (queryArg) => ({ url: `/orders/${queryArg.id}` }),
		}),
		ordersControllerGetByUser: build.query<
			OrdersControllerGetByUserApiResponse,
		  	OrdersControllerGetByUserApiArg
		>({
			query: () => ({ url: `/orders/user`}),
		})
	}),
	overrideExisting: false,
});
export { injectedRtkApi as orderApi };

export type OrdersControllerGetAllApiResponse = /** status 200  */ Order[];
export type OrdersControllerGetAllApiArg = void;
export type OrdersControllerCreateApiResponse = /** status 201  */ Order;
export type OrdersControllerGetByIdApiResponse = /** status 200  */ Order;
export type OrdersControllerGetByIdApiArg = {
  id: number;
};
export type OrdersControllerGetByUserApiResponse = /** status 200 */ Order[];
export type OrdersControllerGetByUserApiArg = void;

export type OrdersControllerCreateApiArg = {
	body: {
		name: string;
		dateOrder: string;
		dateDelivery: string;
		cost: number;
		idUser?: number;
		nameCustomer: string;
		emailCustomer: string;
		phoneCustomer: string;
		nameRecipient: string;
		phoneRecipient: string;
		canCall: boolean;
		idCity: number;
		addressDelivery: string;
		startTimeDelivery: string;
		endTimeDelivery: string;
		comment?: string;
		itemsOrder: ItemOrder[];
	};
};

export type ItemOrder = {
	product: ProductSize;
	count: number;
}

export type Order = {
	id: number;
	name: string;
	dateOrder: string;
	dateDelivery: string;
	cost: number;
	idUser?: number;
	nameCustomer: string;
	emailCustomer: string;
	phoneCustomer: string;
	nameRecipient: string;
	phoneRecipient: string;
	canCall: boolean;
	idCity?: number;
	addressDelivery: string;
	startTimeDelivery: string;
	endTimeDelivery: string;
	comment?: string;
	itemsOrder: ItemOrder[];
};
export const {
	useOrdersControllerCreateMutation,
	useOrdersControllerGetAllQuery,
	useOrdersControllerGetByIdQuery,
	useOrdersControllerGetByUserQuery
} = injectedRtkApi;
