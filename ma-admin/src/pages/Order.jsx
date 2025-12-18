import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  CreditCard,
  Check,
  X,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function OrdersTable({ url }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/orders`);
        const fetchedOrders = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];
        setOrders(fetchedOrders);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [url]);

  // Sort function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(
      (order) =>
        order.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "createdAt") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <ShoppingCart className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-gray-600 font-medium">Loading orders...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
          </div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <ShoppingCart className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h2>
        <p className="text-center max-w-sm text-gray-500">
          You currently have no orders. Once an order is placed, it will appear
          here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Order Management
            </h1>
            <p className="text-gray-600">
              Total Orders: <span className="font-semibold">{orders.length}</span>
              {searchTerm && (
                <span className="ml-2">
                  | Filtered: <span className="font-semibold">{filteredOrders.length}</span>
                </span>
              )}
            </p>
          </div>
          
          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-sm text-gray-600 whitespace-nowrap">
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by customer, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-linear-to-r from-blue-600 to-blue-500">
              <tr>
                <th
                  onClick={() => handleSort("user")}
                  className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer
                    {sortField === "user" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Products
                  </div>
                </th>
                <th
                  onClick={() => handleSort("amount")}
                  className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Amount
                    {sortField === "amount" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th
                  onClick={() => handleSort("createdAt")}
                  className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Date
                    {sortField === "createdAt" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-blue-50 transition-colors duration-200 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {order.user}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-gray-400" />
                      {order.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {order.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {Array.isArray(order.products) && order.products.length > 0 ? (
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {order.products.length} item(s)
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          {order.products[0].name}
                          {order.products.length > 1 && ` +${order.products.length - 1} more`}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No products</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      £{order.amount?.toFixed(2) || "0.00"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.payment_status === "paid" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        <Check className="w-3 h-3" /> Paid
                      </span>
                    ) : order.payment_status === "pending" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                        <X className="w-3 h-3" /> Failed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {paginatedOrders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Card Header */}
            <div className="bg-linear-to-r from-blue-600 to-blue-500 px-4 py-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-white text-xs font-semibold uppercase tracking-wide mb-1">
                    ID
                  </div>
                  <div className="text-white font-bold">
                    {order.orderId || order._id.slice(-8)}
                  </div>
                </div>
                <div>
                  {order.payment_status === "paid" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                      <Check className="w-3 h-3" /> Paid
                    </span>
                  ) : order.payment_status === "pending" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
                      <X className="w-3 h-3" /> Failed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              {/* Customer Info */}
              <div className="flex items-start gap-3">
                <div className="shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">
                    {order.user}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{order.email}</span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" />
                    {order.phone}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Order Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Amount</div>
                  <div className="text-lg font-bold text-gray-900">
                    £{order.amount?.toFixed(2) || "0.00"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Date</div>
                  <div className="text-sm text-gray-900">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Address
                </div>
                <div className="text-sm text-gray-900">{order.address}</div>
              </div>

              {/* Products Toggle */}
              <button
                onClick={() =>
                  setExpandedRow(expandedRow === order._id ? null : order._id)
                }
                className="w-full flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Products ({order.products?.length || 0})
                </span>
                {expandedRow === order._id ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {/* Products List */}
              {expandedRow === order._id && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2 animate-slideDown">
                  {Array.isArray(order.products) && order.products.length > 0 ? (
                    order.products.map((p, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm bg-white p-2 rounded"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-500">Qty: {p.quantity}</div>
                        </div>
                        <div className="font-semibold text-gray-900">
                          £{p.price.toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-2">
                      No products
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredOrders.length === 0 && searchTerm && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No orders found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search term
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredOrders.length > 0 && totalPages > 1 && (
        <div className="mt-6 bg-white rounded-lg shadow-md border border-gray-200 p-4">
          {/* Desktop Pagination */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left side - Info */}
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
              <span className="font-semibold">
                {Math.min(endIndex, filteredOrders.length)}
              </span>{" "}
              of <span className="font-semibold">{filteredOrders.length}</span> results
            </div>

            {/* Right side - Pagination buttons */}
            <div className="flex items-center gap-2">
              {/* First page */}
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="First page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Previous page */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              {/* Next page */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last page */}
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Last page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Pagination */}
          <div className="md:hidden space-y-4">
            {/* Info */}
            <div className="text-sm text-gray-600 text-center">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
              <div className="text-xs mt-1">
                ({startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of{" "}
                {filteredOrders.length} results)
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-2">
              {/* First page */}
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="First"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>

              {/* Previous page */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex-1 max-w-[100px] px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                Previous
              </button>

              {/* Current page indicator */}
              <div className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold min-w-[50px] text-center">
                {currentPage}
              </div>

              {/* Next page */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex-1 max-w-[100px] px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                Next
              </button>

              {/* Last page */}
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Last"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick page jump (for mobile) */}
            {totalPages > 5 && (
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-200">
                <label htmlFor="pageJump" className="text-sm text-gray-600">
                  Jump to:
                </label>
                <select
                  id="pageJump"
                  value={currentPage}
                  onChange={(e) => goToPage(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <option key={page} value={page}>
                      Page {page}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}