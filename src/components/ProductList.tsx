import React, { useEffect, useState } from "react";
interface Props {
  category: string;
}
const ProductList = ({ category }: Props) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetching Products in ", category);
    setProducts(["clothing", "household"]);
  }, [category]);
  return <div>Product List</div>;
};

export default ProductList;
