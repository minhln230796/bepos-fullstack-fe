import { Inter } from "next/font/google";
import Pagination from "@/components/Pagination";
import ListItem from "@/components/ListItem";
import {GetServerSideProps} from "next";
import {productService} from "@/services/productService";
import {Product} from "@/models/product.model";

const inter = Inter({ subsets: ["latin"] });

interface PageProps {
    result: Product[],
    total: number,
    page: number
}

export default function Home({result, total, page}: PageProps) {
  return (
      <>
          <div className="grid grid-cols-2 sm:grid-cols-4 text-slate-700 gap-3">
              {result?.map(item => <ListItem key={item.id} product={item}/>)}
          </div>
          <Pagination currentPage={parseInt(page.toString())} total={total} num={12}/>
      </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({query}) => {
    const page = query.page || 1;
    const data = await productService.list({page: parseInt(page.toString()), limit: 12})

    return {
        props: {
            ...data,
            page
        },
    };
};
