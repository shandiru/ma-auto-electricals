"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Car, Calendar, DollarSign, Edit, Plus, X } from "lucide-react";
import AddCar from "../Add/AddCar";
import EditCar from "../Edit/EditCar";

const CarList = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/cars`);
      setList(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  }, [url]);

  const removeCar = async (id) => {
    try {
      setDeleteId(id);
      await axios.delete(`${url}/api/cars/${id}`);
      toast.success("Car deleted");
      fetchList();
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setDeleteId(null);
    }
  };

  const openEdit = (car) => setEditingCar(car);
  const closeModal = () => { setEditingCar(null); setShowAddModal(false); };

  useEffect(() => { fetchList(); }, [fetchList]);

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">All Cars</h1>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Plus /> Add Car
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              {["Image","Name","Model","Year","Price","Actions"].map((h) => <th key={h} className="px-6 py-3 text-left">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map(car => (
              <tr key={car._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 w-24 h-24"><img src={`${url}/images/${car.images[0]}`} className="w-full h-full object-cover rounded" /></td>
                <td className="px-6 py-3">{car.name}</td>
                <td className="px-6 py-3">{car.model}</td>
                <td className="px-6 py-3">{car.year}</td>
                <td className="px-6 py-3 text-green-600">£{car.price?.toLocaleString()}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button onClick={() => openEdit(car)} className="p-2 bg-blue-50 rounded"><Edit className="text-blue-500"/></button>
                  <button onClick={() => removeCar(car._id)} disabled={deleteId===car._id} className="p-2 bg-red-50 rounded"><Trash2 className="text-red-500"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {(editingCar || showAddModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 relative animate-fade-scale overflow-auto max-h-[90vh]">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
            <EditCar url={url} existingData={editingCar} onSuccess={() => { closeModal(); fetchList(); }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-scale {0% {opacity:0; transform:scale(0.95);}100% {opacity:1; transform:scale(1);}}
        .animate-fade-scale {animation: fade-scale 0.3s ease-out forwards;}
      `}</style>
    </div>
  );
};

export default CarList;
