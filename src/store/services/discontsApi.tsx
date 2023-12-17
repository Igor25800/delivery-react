import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {collection, getDocs, deleteDoc, doc, query, addDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {IDiscounts} from "../../shared/interfaces/discounts/discounts";
import {ICategory} from "../../shared/interfaces/category/category";

export const discountsApi = createApi({
    reducerPath: 'discountsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Discounts'],
    endpoints: (build) => ({
        getDiscounts: build.query<IDiscounts[], void>({
            queryFn: async (): Promise<{data: IDiscounts[]}> => {
                const state = query (collection(db, 'discounts'))
                const get = await getDocs(state);
                const category= get.docs.map((el) => {
                    return  {...el.data(), id: el.id}
                });
                return {data: category as IDiscounts[]};
            },
            providesTags: ['Discounts']
        }),
        addDiscounts: build.mutation<IDiscounts, IDiscounts>({
            queryFn: async (discount: IDiscounts): Promise<any> => {
                const add = await addDoc(collection(db, 'discounts'), discount);
                return {data: 'add'};
            },
            invalidatesTags: ['Discounts']
        }),
        deleteDiscounts: build.mutation<IDiscounts, string>({
            queryFn: async (id: string): Promise<any> => {
                const stateDelete = doc(db, 'discounts', id);
                const deleteCategory = await deleteDoc(stateDelete);
                return {data: 'delete'};
            },
            invalidatesTags: ['Discounts']
        }),

    })
})


export const {useGetDiscountsQuery, useDeleteDiscountsMutation, useAddDiscountsMutation} = discountsApi