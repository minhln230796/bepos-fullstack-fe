
interface ListData {
    page: number;
    limit: number;
    searchKey?: string;
}
export const productService =  {
    async list (data: ListData) {
        let url = `http://localhost:5000/products?page=${data.page}&limit=${data.limit}`;
        if (data.searchKey) {
            url += `&search_key=${data.searchKey}`;
        }
        const response = await fetch(url);
        return await response.json();
    },

    async detail(id: string) {
        const response = await fetch(`http://localhost:5000/products/${id}`)
        return await response.json();
    }
}