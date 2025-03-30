import { CreateProduct } from '@/state/api';
import { ChangeEvent, FormEvent, useState } from 'react';
import Header from '@/app/(components)/Header';

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: CreateProduct) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === 'price' || name === 'stockQuantity' || name === 'rating'
          ? parseFloat(value)
          : value,
    });
  };

  if (!isOpen) {
    return null;
  }

  const labelCssStyles = 'block text-sm font-medium text-gray-700';
  const inputCssStyles =
    'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-2">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="name" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          <label htmlFor="price" className={labelCssStyles}>
            Product Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            id="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />

          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyles}
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
