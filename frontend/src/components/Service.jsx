import React, { useState } from "react";
import {
    Phone,
    Camera,
    Shield,
    CheckSquare,
    MapPin,
    Music,
    Cpu,
    Settings,
    ArrowRight,
    Hammer
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleSeeDetails = () => {
        navigate(service.link);
    };

    return (
        <div
            className="relative overflow-hidden rounded-2xl h-120 shadow-xl cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`absolute inset-0 transition-transform duration-700 ease-out ${isHovered ? "scale-110" : "scale-100"}`}
                style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 sm:p-7">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                        {service.icon}
                    </div>

                    <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">
                        {service.title}
                    </h3>

                    <div
                        className={`transition-all duration-500 ease-out overflow-hidden ${isHovered ? "max-h-32 opacity-100 translate-y-0 mb-4" : "max-h-0 opacity-0 -translate-y-3 mb-0"}`}
                    >
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {service.description}
                        </p>
                    </div>

                    <div
                        className={`transition-all duration-500 ease-out overflow-hidden ${isHovered ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-3"}`}
                    >
                        <button
                            onClick={handleSeeDetails}
                            className="bg-[#317F21] hover:bg-emerald-500 text-slate-900 font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2 transition-all duration-300 group/button"
                        >
                            See Details
                            <ArrowRight
                                className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Service() {
    const services = [
        {
            id: 1,
            title: "Car Stereos",
            description: "We supply and install high-quality car stereos to enhance your driving experience with better sound and modern features.",
            icon: <Music className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/car-stereos"
        },
        {
            id: 2,
            title: "Vehicle Diagnostics",
            description: "Using advanced diagnostic equipment, we quickly identify and fix electrical and engine faults in all vehicle makes and models.",
            icon: <Cpu className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1592492152545-8c2d0a29c0c8?w=800&q=80",
            link: "/diagnostics"
        },
        {
            id: 3,
            title: "Car Repairs & Servicing",
            description: "Our comprehensive car repairs and servicing keep your vehicle running safely, efficiently, and reliably.",
            icon: <Hammer className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
            link: "/car-repair"
        },
        {
            id: 4,
            title: "Handsfree Car Kits",
            description: "We professionally install handsfree car kits to help you stay connected while driving safely and legally.",
            icon: <Phone className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
            link: "/handfree"
        },
        {
            id: 5,
            title: "Parking Sensors/Cameras",
            description: "Our parking sensors and reversing cameras make parking easier and safer by improving visibility and awareness.",
            icon: <Camera className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
            link: "/parking"
        },
        {
            id: 6,
            title: "Car Security",
            description: "We install reliable car security systems to protect your vehicle from theft and unauthorized access.",
            icon: <Shield className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
            link: "/car-security"
        },
        {
            id: 7,
            title: "MOT",
            description: "We provide trusted MOT testing and preparation to ensure your vehicle meets all legal safety standards.",
            icon: <CheckSquare className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
            link: "/mot"
        },
        {
            id: 8,
            title: "Vehicle Tracking Systems",
            description: "Our vehicle tracking systems give you real-time location monitoring for added security and peace of mind.",
            icon: <MapPin className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
            link: "/vehicle-tracking"
        },
        {
            id: 9,
            title: "Installations & Fitting",
            description: "All installations and fittings are carried out by experienced technicians to ensure a professional, long-lasting finish.",
            icon: <Settings className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
            link: "/installation"
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">
                        Our Services
                    </h1>
                    <p className="text-lg text-slate-600">
                        Professional services tailored to your vehicle
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </div>
    );
}
