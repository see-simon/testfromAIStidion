
import React from 'react';
import { Product } from '../types';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (barCode: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Products Found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Get started by adding a new product.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductItem
          key={product.bar_code}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
