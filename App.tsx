
import React, { useState, useEffect } from 'react';
import { Product } from './types';
import ProductList from './components/ProductList';
import Modal from './components/Modal';
import ProductForm from './components/ProductForm';
import { PlusIcon } from './components/icons';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Mocks fetching initial data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts([
        { bar_code: '8901030748111', product_name: 'Parle-G Gold Biscuits' },
        { bar_code: '7501055311299', product_name: 'Coca-Cola Classic 355ml' },
        { bar_code: '036000291452', product_name: 'Colgate Total Toothpaste' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleOpenModalForCreate = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = (product: Product) => {
    setIsSaving(true);
    // Mock API call
    setTimeout(() => {
      if (productToEdit) {
        // Update
        setProducts(products.map((p) => (p.bar_code === product.bar_code ? product : p)));
      } else {
        // Create
        if (products.some(p => p.bar_code === product.bar_code)) {
            alert("Error: A product with this barcode already exists.");
        } else {
            setProducts([product, ...products]);
        }
      }
      setIsSaving(false);
      handleCloseModal();
    }, 1000);
  };

  const handleDeleteProduct = (barCode: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        // Mock API call
        setTimeout(() => {
            setProducts(products.filter((p) => p.bar_code !== barCode));
        }, 500);
    }
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Dashboard</h1>
          <button
            onClick={handleOpenModalForCreate}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
            Add Product
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-lg">Loading products...</p>
          </div>
        ) : (
          <ProductList
            products={products}
            onEdit={handleOpenModalForEdit}
            onDelete={handleDeleteProduct}
          />
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={productToEdit ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm
          productToEdit={productToEdit}
          onSave={handleSaveProduct}
          onCancel={handleCloseModal}
          isSaving={isSaving}
        />
      </Modal>
    </div>
  );
};

export default App;
