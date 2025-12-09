import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Package, Tag, DollarSign, Layers, Edit } from "lucide-react";

const ProductList = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

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

  const editProduct = (productId) => {
    toast.info(`Edit product: ${productId}`);
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            All Products
          </h1>
          <p className="text-slate-600 text-lg">
            Manage your product inventory ({list.length}{" "}
            {list.length === 1 ? "product" : "products"})
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {list.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-slate-100">
                        <img
                          src={`${url}/images/${item.images?.[0]}`}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </td>
                    <td className="px-1 py-4 font-semibold text-slate-800 text-base">
                      {item.name}
                    </td>
                    <td className="px-1 py-4 text-slate-600 text-sm max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium">
                        <Layers size={14} />
                        {item.count}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-sm font-medium">
                        <Tag size={14} />
                        {item.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-green-600 font-bold text-lg">
                      ${item.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => editProduct(item._id)}
                          className="group relative p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200"
                        >
                          <Edit
                            size={20}
                            className="text-blue-500 group-hover:scale-110 transition-transform"
                          />
                        </button>
                        <button
                          onClick={() => removeProduct(item._id)}
                          disabled={deleteId === item._id}
                          className="group relative p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-200 disabled:opacity-50"
                        >
                          {deleteId === item._id ? (
                            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2
                              size={20}
                              className="text-red-500 group-hover:scale-110 transition-transform"
                            />
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

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {list.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-md bg-slate-100">
                    <img
                      src={`${url}/images/${item.images?.[0]}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 truncate">
                      {item.name}
                    </h3>

                    <p className="text-sm text-slate-600 mb-2 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full text-purple-700 text-xs font-medium">
                        <Tag size={12} />
                        {item.category}
                      </div>

                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full text-blue-700 text-xs font-medium">
                        <Layers size={12} />
                        Stock: {item.count}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-600" />
                      <span className="text-green-600 font-bold text-base sm:text-lg">
                        ${item.price?.toLocaleString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => editProduct(item._id)}
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
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No products found
              </h3>
              <p className="text-slate-600">
                Start adding products to your inventory to see them here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
