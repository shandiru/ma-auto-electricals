"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import {
  Trash2,
  Package,
  Tag,
  DollarSign,
  Layers,
  Edit,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  X,
} from "lucide-react";
import EditProduct from "../Edit/EditProduct";

const ProductList = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // 🔄 FETCH PRODUCTS
  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/products`);
      setList(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [url]);

  // 🔥 REAL-TIME STOCK UPDATE (Socket.io)
  useEffect(() => {
    const socket = io(url);

    socket.on("stockUpdated", () => {
      fetchList();
    });

    return () => socket.disconnect();
  }, [url, fetchList]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // 🗑 DELETE PRODUCT
  const removeProduct = async (id) => {
    try {
      setDeleteId(id);
      await axios.delete(`${url}/api/products/${id}`);
      toast.success("Product deleted");
      fetchList();
      setProductToDelete(null);
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // 🔍 FILTER + SORT
  const filteredAndSortedData = useMemo(() => {
    let data = [...list];

    if (searchTerm) {
      data = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        return sortConfig.direction === "asc"
          ? aVal > bVal
            ? 1
            : -1
          : aVal < bVal
          ? 1
          : -1;
      });
    }

    return data;
  }, [list, searchTerm, sortConfig]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(
    filteredAndSortedData.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey)
      return <ArrowUpDown size={14} className="opacity-40" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 rounded mb-4 w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">Image</th>
            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name <SortIcon columnKey="name" />
            </th>
            <th className="p-3">Description</th>
            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("count")}
            >
              Stock <SortIcon columnKey="count" />
            </th>
            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price <SortIcon columnKey="price" />
            </th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((item) => (
            <tr key={item._id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                <img
                  src={`${url}/images/${item.images?.[0]}`}
                  className="w-14 h-14 object-cover rounded"
                />
              </td>
              <td className="p-3 font-semibold">{item.name}</td>
              <td className="p-3 text-sm">{item.description}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.count === 0
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {item.count}
                </span>
              </td>
              <td className="p-3 font-bold">
                £{item.price.toLocaleString()}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => setEditingProduct(item)}
                  className="p-2 bg-blue-100 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setProductToDelete(item)}
                  className="p-2 bg-red-100 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DELETE CONFIRM */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="font-bold mb-4">Delete Product?</h3>
            <p className="mb-4">{productToDelete.name}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => removeProduct(productToDelete._id)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingProduct && (
        <EditProduct
          url={url}
          existingData={editingProduct}
          onSuccess={() => {
            fetchList();
            setEditingProduct(null);
          }}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
