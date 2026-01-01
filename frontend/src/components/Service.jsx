import React, { useState } from "react";
import {
    Music,
    Cpu,
    Wrench,
    PhoneCall,
    Camera,
    ShieldCheck,
    ClipboardCheck,
    MapPin,
    ArrowRight,
    Cog,
    Disc,
    Wind,
    Lock,
    Zap,
    CircuitBoard,
    Recycle,
    Droplets,
    Settings,
    Sliders,
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
            description:
                "We supply and install high-quality car stereos to enhance your driving experience with better sound and modern features.",
            icon: <Music className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/car-stereos",
        },
        {
            id: 2,
            title: "Vehicle Diagnostics",
            description:
                "Using advanced diagnostic equipment, we quickly identify and fix electrical and engine faults.",
            icon: <Cpu className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/diagnostics",
        },
        {
            id: 3,
            title: "Car Repairs & Servicing",
            description:
                "Our comprehensive car repairs and servicing keep your vehicle running safely.",
            icon: <Wrench className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/car-repair",
        },
        {
            id: 4,
            title: "Handsfree Car Kits",
            description:
                "We professionally install handsfree car kits to help you stay connected safely.",
            icon: <PhoneCall className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/handfree",
        },
        {
            id: 5,
            title: "Parking Sensors / Cameras",
            description:
                "Parking sensors and reversing cameras improve visibility and safety.",
            icon: <Camera className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/parking",
        },
        {
            id: 6,
            title: "Car Security",
            description:
                "We install reliable car security systems to protect your vehicle.",
            icon: <ShieldCheck className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/car-security",
        },
        {
            id: 7,
            title: "MOT",
            description:
                "Trusted MOT testing and preparation to meet legal safety standards.",
            icon: <ClipboardCheck className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/mot",
        },
        {
            id: 8,
            title: "Vehicle Tracking Systems",
            description:
                "Real-time vehicle tracking for security and peace of mind.",
            icon: <MapPin className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/vehicle-tracking",
        },
        {
            id: 9,
            title: "Installations & Fitting",
            description:
                "Professional installations carried out by experienced technicians.",
            icon: <Settings className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/installation",
        },
        {
            id: 10,
            title: "Mechanical (All)",
            description:
                "Complete mechanical repairs to keep your vehicle running smoothly.",
            icon: <Cog className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/mechanical",
        },
        {
            id: 11,
            title: "Brake Pads",
            description:
                "Supply and fitting of high-quality brake pads for maximum safety.",
            icon: <Disc className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/brake-pads",
        },
        {
            id: 12,
            title: "Window Regulators",
            description:
                "Repair and replacement of faulty electric window regulators.",
            icon: <Sliders className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/window-regulators",
        },
        {
            id: 13,
            title: "Wiper Motors",
            description:
                "Wiper motor repairs for clear visibility in all weather.",
            icon: <Wind className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/wiper-motors",
        },
        {
            id: 14,
            title: "Central Door Motors",
            description:
                "Diagnosis and repair of central locking systems.",
            icon: <Lock className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/central-locking",
        },
        {
            id: 15,
            title: "All Car Electrics",
            description:
                "Expert auto electrical repairs and fault finding.",
            icon: <Zap className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/car-electrics",
        },
        {
            id: 16,
            title: "ECU Repairs / Services",
            description:
                "Advanced ECU diagnostics and repairs for optimal performance.",
            icon: <CircuitBoard className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/ecu-repair",
        },
        {
            id: 17,
            title: "EGR",
            description:
                "EGR diagnostics and cleaning to reduce emissions.",
            icon: <Recycle className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/egr",
        },
        {
            id: 18,
            title: "AdBlue",
            description:
                "AdBlue system diagnostics and repairs for diesel vehicles.",
            icon: <Droplets className="w-6 h-6 text-[#317F21]" />,
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
            link: "/adblue",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6 scroll-m-5" id="services">
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
