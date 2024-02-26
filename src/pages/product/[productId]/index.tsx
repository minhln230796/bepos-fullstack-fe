import {GetServerSideProps} from "next";
import {productService} from "@/services/productService";
import {Product} from "@/models/product.model";
import Link from "next/link";

interface PageProps {
    product: Product;
}
const DetailProduct = ({product}: PageProps) => {
    return <div className="flex flex-col gap-3 w-full max-w-[500px] mx-auto">
        <div className="flex justify-between gap-3">
            <div className="text-black font-bold">
                Name:
            </div>
            <Link className="text-blue-500 hover:text-blue-800" href={`/search?search_key=${product.name}`}>
                {product.name}
            </Link>
        </div>
        <div className="flex justify-between gap-3">
            <div className="text-black font-bold">
                Description:
            </div>
            <div className="text-slate-500">
                {product.description}
            </div>
        </div>
        <div className="flex justify-between gap-3">
            <div className="text-black font-bold">
                Category:
            </div>
            <Link className="text-blue-500 hover:text-blue-800" href={`/search?search_key=${product.category}`}>
                {product.category}
            </Link>
        </div>
        <div className="flex justify-between gap-3">
            <div className="text-black font-bold">
                Price:
            </div>
            <div className="text-slate-500">
                {product.price}
            </div>
        </div>
    </div>
}

export default DetailProduct;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({params}) => {
    const response = await productService.detail(params?.productId?.toString() || "")

    return {
        props: {
            product: response.detail
        },
    };
};
