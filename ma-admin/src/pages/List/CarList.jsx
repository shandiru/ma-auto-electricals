import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Car, Calendar, DollarSign, Edit } from "lucide-react";

const CarList = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/cars`);
      setList(response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error fetching cars");
    } finally {
      setLoading(false);
    }
  }, [url]);

  const removeCar = async (carId) => {
    try {
      setDeleteId(carId);
      await axios.delete(`${url}/api/cars/${carId}`);
      toast.success("Car deleted successfully");
      fetchList();
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car");
    } finally {
      setDeleteId(null);
    }
  };

  const editCar = (carId) => {
    // Add your edit logic here
    toast.info(`Edit car: ${carId}`);
    // You can navigate to edit page or open a modal
    // Example: navigate(`/edit/car/${carId}`);
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 bg-linear-to-br from-slate-50 to-slate-100">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">All Cars</h1>
        <p className="text-slate-600 text-lg">
          Manage your car inventory ({list.length} {list.length === 1 ? "car" : "cars"})
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-linear-to-r from-slate-800 to-slate-700 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Model</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Year</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {list.map((item, index) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-slate-100">
                      <img
                        src={`${url}/images/${item.images[0]}`}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800 text-lg truncate">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600 truncate">{item.model}</td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-slate-700 text-sm font-medium">
                      <Calendar size={14} />
                      {item.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-green-600 font-bold text-lg">${item.price?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => editCar(item._id)}
                        className="group relative p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200"
                      >
                        <Edit size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => removeCar(item._id)}
                        disabled={deleteId === item._id}
                        className="group relative p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-200 disabled:opacity-50"
                      >
                        {deleteId === item._id ? (
                          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
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
            <div className="p-4 sm:p-5">
              <div className="flex gap-4">
                {/* Image */}
                <div className="shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-md bg-slate-100">
                    <img src={`${url}/images/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 truncate mb-2">{item.name}</h3>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Car size={16} className="shrink-0" />
                      <span className="text-sm truncate">{item.model}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={16} className="shrink-0" />
                      <span className="text-sm">{item.year}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-600 shrink-0" />
                      <span className="text-lg font-bold text-green-600">${item.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => editCar(item._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <Edit size={18} className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">Edit</span>
                </button>
                <button
                  onClick={() => removeCar(item._id)}
                  disabled={deleteId === item._id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  {deleteId === item._id ? (
                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Trash2 size={18} className="text-red-500" />
                      <span className="text-sm font-medium text-red-600">Delete</span>
                    </>
                  )}
                </button>
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
              <Car size={40} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No cars found</h3>
            <p className="text-slate-600">Start adding cars to your inventory to see them here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;