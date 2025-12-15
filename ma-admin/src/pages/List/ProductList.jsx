"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Package, Tag, DollarSign, Layers, Edit } from "lucide-react";
import EditProduct from "../Edit/EditProduct"; // make sure you have EditProduct.jsx

const ProductList = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/products`);
      setList(response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  }, [url]);

  const removeProduct = async (productId) => {
    try {
      setDeleteId(productId);
      await axios.delete(`${url}/api/products/${productId}`);
      toast.success("Product deleted successfully");
      fetchList();
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete product");
    } finally {
      setDeleteId(null);
    }
  };

  const openEdit = (product) => setEditingProduct(product);
  const closeModal = () => setEditingProduct(null);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <style>{`
        /* Hide horizontal scrollbar */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            All Products
          </h1>
        </div>

        {/* Desktop Table */}
        <div className="hidden xl:block bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-linear-to-r from-slate-800 to-slate-700 text-white">
                  {["Image", "Name", "Description", "Count", "Category", "Price", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {list.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-slate-100">
                        <img
                          src={`${url}/images/${item.images?.[0]}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-1 py-4 font-semibold text-slate-800">{item.name}</td>
                    <td className="px-2 py-4 text-slate-600 text-sm max-w-[200px] wrap-break-words">
                      {item.description}
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium">
                        <Layers size={14} /> {item.count}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-sm font-medium">
                        <Tag size={14} /> {item.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-green-600 font-bold text-lg">
                      ${item.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 bg-blue-50 rounded"
                        >
                          <Edit className="text-blue-500" />
                        </button>
                        <button
                          onClick={() => removeProduct(item._id)}
                          disabled={deleteId === item._id}
                          className="p-2 bg-red-50 rounded"
                        >
                          {deleteId === item._id ? (
                            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="text-red-500" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="xl:hidden space-y-4">
          {list.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
                <div className="shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-md bg-slate-100">
                    <img
                      src={`${url}/images/${item.images?.[0]}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 truncate">{item.name}</h3>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full text-purple-700 text-xs font-medium">
                        <Tag size={12} /> {item.category}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full text-blue-700 text-xs font-medium">
                        <Layers size={12} /> Stock: {item.count}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-600" />
                      <span className="text-green-600 font-bold text-base sm:text-lg">
                        £{item.price?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 sm:p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <Edit size={18} className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => removeProduct(item._id)}
                        disabled={deleteId === item._id}
                        className="p-2 sm:p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        {deleteId === item._id ? (
                          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 size={18} className="text-red-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {list.length === 0 && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={40} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No products found</h3>
              <p className="text-slate-600">Start adding products to your inventory to see them here.</p>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <EditProduct
              url={url}
              existingData={editingProduct}
              onSuccess={fetchList}
              onClose={closeModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
