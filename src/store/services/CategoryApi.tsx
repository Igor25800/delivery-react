import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query} from "firebase/firestore";
import {db} from "../../firebase";
import {ICategory} from "../../shared/interfaces/category/category";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Category'],
    endpoints: (build) => ({
        getCategory: build.query<ICategory[], void>({
            queryFn: async (): Promise<{data: ICategory[]}> => {
                const state = query (collection(db, 'category'))
                const get = await getDocs(state);
                const category= get.docs.map((el) => {
                    return  {...el.data(), id: el.id}
                });
                return {data: category as ICategory[]};
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Category' as const, id })),
                        { type: 'Category', id: 'LIST' },
                    ]
                    : [{ type: 'Category', id: 'LIST' }],
        }),
        addCategory: build.mutation<ICategory, ICategory>({
            queryFn: async (category: ICategory): Promise<any> => {
                const add = await addDoc(collection(db, 'category'), category);
                return {data: 'add'};
            },
            invalidatesTags: [{ type: 'Category', id: 'LIST' }]
        }),
        updateCategory: build.mutation<ICategory, ICategory>({
            queryFn: async (category: any): Promise<any> => {
                const stateUpdate = doc(db, 'category', category.id);
                const update = await updateDoc(stateUpdate, category);
                return {data: 'change'};
            },
            invalidatesTags: (result, error, body: ICategory) => [{type: 'Category', id: body.id}]
        }),
        deleteCategory: build.mutation<ICategory, string>({
            queryFn: async (id: string): Promise<any> => {
                const stateDelete = doc(db, 'category', id);
                const deleteCategory = await deleteDoc(stateDelete);
                return {data: 'delete'};
            },
            invalidatesTags: [{ type: 'Category', id: 'LIST' }]
        }),

    })
})


export const {useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation} = categoryApi