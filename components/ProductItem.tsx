
import React from 'react';
import { Product } from '../types';
import { PencilIcon, TrashIcon, BarcodeIcon } from './icons';

interface ProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (barCode: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 transition-transform duration-200 hover:scale-[1.02]">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.product_name}</h3>
        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
            <BarcodeIcon className="w-4 h-4 mr-2" />
            <span>{product.bar_code}</span>
        </div>
      </div>
      <div className="flex space-x-2 self-end sm:self-center">
        <button
          onClick={() => onEdit(product)}
          className="p-2 text-blue-600 rounded-full hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          aria-label={`Edit ${product.product_name}`}
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(product.bar_code)}
          className="p-2 text-red-600 rounded-full hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
          aria-label={`Delete ${product.product_name}`}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
