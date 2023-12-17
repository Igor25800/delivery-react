import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {collection, getDocs, addDoc, deleteDoc, doc, query} from "firebase/firestore";
import {db} from "../../firebase";
import {IOrder} from "../../shared/interfaces/order/order";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Order'],
    endpoints: (build) => ({
        getOrder: build.query<IOrder[], void>({
            queryFn: async (): Promise<{data: IOrder[]}> => {
                const state = query (collection(db, 'order'))
                const get = await getDocs(state);
                const order= get.docs.map((el) => {
                    return  {...el.data(), id: el.id}
                });
                return {data: order as IOrder[]};
            },
            providesTags: ['Order']
        }),
        addOrder: build.mutation<IOrder, IOrder>({
            queryFn: async (category: IOrder): Promise<any> => {
                const addOrder = await addDoc(collection(db, 'order'), category);
                return {data: 'add'};
            },
            invalidatesTags: ['Order']
        }),
        deleteOrder: build.mutation<IOrder, string>({
            queryFn: async (id: string): Promise<any> => {
                const stateDelete = doc(db, 'order', id);
                const deleteOrder = await deleteDoc(stateDelete);
                return {data: 'delete'};
            },
            invalidatesTags: ['Order']
        }),

    })
})


export const {useGetOrderQuery, useAddOrderMutation, useDeleteOrderMutation} = orderApi