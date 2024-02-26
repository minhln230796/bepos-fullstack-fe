import Link from 'next/link'
import {Product} from "@/models/product.model";

const ListItem = ({ product }: { product: Product }) => {
  return <Link className="border border-slate-300 p-3 hover:underline" href={`/product/${product.id}`}>
        <h2 className="text-black">{product.name}</h2>
        <div className="text-slate-400 line-clamp-2 text-sm">{product.description}</div>
        <div className="text-orange-400 font-bold">{product.category}</div>
    </Link>
}

export default ListItem
