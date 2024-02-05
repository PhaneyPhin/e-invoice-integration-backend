import { Interface } from "readline"

export interface Tax {
    percent: number,
    tax_scheme: string,
    tax_amount?: number
}

export interface Product {
    id: number,
    description?: string,
    name: string,
    price: number,
    image?: string;
    tax_categories: Tax[]
}

export const VAT = {
    id: 'S',
    percent: 10,
    tax_scheme: "VAT"
}


const products: Product[] = [
    {
        id: 1,
        name: "Computer MACbook Pro",
        price: 1400,
        image: "https://cdn.pixabay.com/photo/2017/01/22/12/07/imac-1999636_1280.png",
        tax_categories: [
            VAT
        ]
      },
      {
        id: 2,
        name: "Computer MACbook Pro M1",
        price: 1250,
        image: "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_1280.jpg",
        tax_categories: [
            VAT
        ]
      },
      {
        id: 3,
        name: "iMAC Pro",
        price: 1600,
        image: "https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_1280.jpg",
        tax_categories: [
            VAT
        ]
      },
      {
        id: 4,
        name: "Apple assets",
        price: 500,
        image: "https://cdn.pixabay.com/photo/2017/05/11/11/15/workplace-2303851_1280.jpg",
        tax_categories: [
            VAT
        ]
      },
      {
        id: 5,
        name: "Apple Mouse",
        price: 200,
        image: "https://media.istockphoto.com/id/1303938739/photo/white-wireless-mouse-floating-on-white-background-minimal-concept-idea-monochrome-3d-render.webp?b=1&s=612x612&w=0&k=20&c=ZPd9w-yGgQBa8YSIiZHH5uYRIGV9J5YJa8lHykILUBQ=",
        tax_categories: [
            VAT
        ]
      },
      {
        id: 6,
        name: "iPhone 15 128GB ",
        price: 1200,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010535312",
        tax_categories: [
            VAT
        ]
      },
]

export default products