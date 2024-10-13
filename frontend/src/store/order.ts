import { emptyApi as api } from "./emptyApi";
import { MinOrderCostCreateApiArg } from "./minOrderCost";
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
			query: () => ({ url: `/orders/user` }),
		}),
		ordersControllerGetWithPagination: build.query<
			OrdersControllerGetWithPaginationApiResponse,
			OrdersControllerGetWithPaginationApiArg
		>({
			query: (queryArg) => {
				const params: Record<string, any> = {};
				if (queryArg.search) {
					params.search = queryArg.search;
				}
				if (queryArg.field) {
					params.field = queryArg.field;
				}
				if (queryArg.type) {
					params.type = queryArg.type;
				}
				return {
					url: `/orders/orders-with-pagination/${queryArg.page}/${queryArg.limit}`,
					params: params
				}
			}
		}),
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

export type OrdersControllerGetWithPaginationApiResponse = {
	count: number;
	orders: Order[];
}

export type OrdersControllerGetWithPaginationApiArg = {
	page: number;
	limit: number;
	search?: string;
	field?: string;
	type?: string;
}

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
	useOrdersControllerGetByUserQuery,
	useOrdersControllerGetWithPaginationQuery
} = injectedRtkApi;
