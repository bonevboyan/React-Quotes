import React from "react";

import { useAppSelector } from "../../store/hooks";

import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
	const products = useAppSelector((state) => state.products.products);

	console.log(products);

	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{products.map((product) => (
					<ProductItem
						key={product.id}
						id={product.id}
						title={product.title}
						price={product.price}
						description={product.description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
