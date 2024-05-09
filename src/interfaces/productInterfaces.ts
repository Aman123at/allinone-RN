interface IModernProductListProps {
  data: {
    products: any;
  };
  nav: any;
  isSearchPage: boolean;
  searchInput: string;
}

interface IProductImage {
  _id: string;
  id: string;
  secure_url: string;
}

interface IProduct {
  __v: number;
  _id: string;
  avgReview: any;
  category: string;
  description: string;
  images: IProductImage[];
  name: string;
  numberOfReviews: number;
  price: number;
  ratings: number;
  reviews: any;
  subCategory: string;
  units: number;
  user: string;
}

interface IModernProductCardProps {
  product: IProduct;
  nav: any;
  pImage: IProductImage;
  price: number;
  title: string;
  id: string;
}

interface IProductDetailsProps {
    route:any;
    navigation:any;
}

export {IModernProductListProps, IProduct, IProductImage,IModernProductCardProps,IProductDetailsProps};
