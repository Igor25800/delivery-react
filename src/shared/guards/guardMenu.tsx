import {LoaderFunction, LoaderFunctionArgs, redirect} from 'react-router-dom'
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase"
export interface RouteParams {
    category: string;
}

export const loader: LoaderFunction<LoaderFunctionArgs<RouteParams>> = async ({ params }) => {
    const docRef = query(collection(db, 'category'), where('category', '==', params.category));
    const querySnapshot = await getDocs(docRef);
    const data = querySnapshot.docs.map(el => el.data())
    if(!data.length) {
        return redirect('error');
    }
    return data;
};