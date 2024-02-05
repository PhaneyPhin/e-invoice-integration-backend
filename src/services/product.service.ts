import products from "../product";

export class ProductService {
    find(id: number) {
        const product = products.find(item =>  item.id === id);
        if (!product) throw new Error(`Product with id ${id} not found`)

        return product
    }
}