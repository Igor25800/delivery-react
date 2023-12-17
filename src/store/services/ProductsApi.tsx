import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query} from "firebase/firestore";
import {db} from "../../firebase";
import {IProducts} from "../../shared/interfaces/products/products";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        getProducts: build.query<IProducts[], void>({
            queryFn: async (): Promise<{data: IProducts[]}> => {
                const state = query (collection(db, 'products'))
                const get = await getDocs(state);
                const category= get.docs.map((el) => {
                    return  {...el.data(), id: el.id}
                });
                return {data: category as IProducts[]};
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Products' as const, id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        addProducts: build.mutation<IProducts, IProducts>({
            queryFn: async (products: IProducts): Promise<any> => {
                const add = await addDoc(collection(db, 'products'), products);
                return {data: 'add'};
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }]
        }),
        updateProducts: build.mutation<IProducts, IProducts>({
            queryFn: async (products: any): Promise<any> => {
                const stateUpdate = doc(db, 'products', products.id);
                const update = await updateDoc(stateUpdate, products);
                return {data: 'change'};
            },
            invalidatesTags: (result, error, body: IProducts) => [{type: 'Products', id: body.id}]
        }),
        deleteProducts: build.mutation<IProducts, string>({
            queryFn: async (id: string): Promise<any> => {
                const stateDelete = doc(db, 'products', id);
                const deleteCategory = await deleteDoc(stateDelete);
                return {data: 'delete'};
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }]
        }),

    })
})


export const {useGetProductsQuery, useAddProductsMutation, useUpdateProductsMutation, useDeleteProductsMutation} = productsApi