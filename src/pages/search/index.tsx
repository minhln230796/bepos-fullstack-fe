import {Product} from "@/models/product.model";
import {GetServerSideProps} from "next";
import {productService} from "@/services/productService";
import Link from "next/link";
import ListItem from "@/components/ListItem";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";

interface PageProps {
    result: Product[];
    total: number;
    page: number;
    searchKey: string;
}

const SearchPage = ({result, total, page, searchKey}: PageProps) => {
    return (
       <>
           <SearchInput searchKey={searchKey} page={page}/>
           <div className="grid grid-cols-2 sm:grid-cols-4 text-slate-700 gap-3">
               {result?.map(item => <ListItem key={item.id} product={item} />)}
           </div>
           <Pagination currentPage={parseInt(page.toString())} total={total} num={12} />
       </>
    );
}

export default SearchPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({query}) => {
    const page = query.page || 1;
    const searchKey = query.search_key?.toString() || "";
    const data = await productService.list({page: parseInt(page.toString()), limit: 12, searchKey})

    return {
        props: {
            ...data,
            page,
            searchKey
        },
    };
};
