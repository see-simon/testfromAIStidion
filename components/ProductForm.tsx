
import React, { useState, useEffect, FormEvent } from 'react';
import { Product } from '../types';

interface ProductFormProps {
  productToEdit: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ productToEdit, onSave, onCancel, isSaving }) => {
  const [productName, setProductName] = useState('');
  const [barCode, setBarCode] = useState('');
  const [errors, setErrors] = useState<{ productName?: string; barCode?: string }>({});

  const isEditing = !!productToEdit;

  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.product_name);
      setBarCode(productToEdit.bar_code);
    } else {
      setProductName('');
      setBarCode('');
    }
    setErrors({});
  }, [productToEdit]);

  const validate = () => {
    const newErrors: { productName?: string; barCode?: string } = {};
    if (!productName.trim()) {
      newErrors.productName = 'Product name is required.';
    }
    if (!barCode.trim()) {
      newErrors.barCode = 'Barcode is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSave({
      bar_code: barCode,
      product_name: productName,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-6">
        <div>
          <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="e.g., Organic Apples"
            required
          />
          {errors.productName && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.productName}</p>}
        </div>
        <div>
          <label htmlFor="bar_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Barcode
          </label>
          <input
            type="text"
            id="bar_code"
            value={barCode}
            onChange={(e) => setBarCode(e.target.value)}
            readOnly={isEditing}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${isEditing ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-600' : ''}`}
            placeholder="e.g., 9780201379624"
            required
          />
          {errors.barCode && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.barCode}</p>}
        </div>
      </div>
      <div className="flex items-center justify-end pt-6 mt-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-wait"
        >
          {isSaving ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
