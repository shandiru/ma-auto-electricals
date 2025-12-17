import { FaPhoneAlt , FaPhone , FaCar,
  FaWrench,
  FaTools,
  FaClock,} from "react-icons/fa";

export const motHeroData = {
  badge: "Qualified Technicians",

  title: {
    before: "Car Service &",
    highlight: "MOT Testing",
  },

  description: {
    beforeBold: "Trust ",
    bold: "Naz Motors",
    afterBold:
      " to keep you and your vehicle safe. Professional car servicing and MOT testing from certified motor technicians. We ensure your car is roadworthy, reliable, and ready to perform.",
  },

  buttons: {
    primary: {
      text: "Book MOT: 0116 251 5961",
      href: "tel:01162515961",
      icon: FaPhoneAlt,
      bg: "#C8102E",
      color: "#FFFFFF",
    },
    secondary: {
      text: "Book Your MOT",
      href: "/contact",
      border: "#C8102E",
      color: "#C8102E",
      hoverBg: "#C8102E",
      hoverColor: "#FFFFFF",
    },
  },
};

export const emergencyCtaData = {
  palette: {
    primary: "#C8102E",
    fgOnPrimary: "#FFFFFF",
    secondaryBg: "#FFB3B3",
    secondaryText: "#3B0000",
    outline: "#FFFFFF",
    darkBg: "#9B0D24",
  },

  heading: "Book Your Service or MOT Today",

  subheading:
    "Professional automotive services from qualified technicians with over 50 years of experience.",

  buttons: {
    call: {
      text: "Call 0116 251 5961",
      href: "tel:01162515961",
      icon: FaPhone,
    },
    book: {
      text: "Book MOT Test",
      href: "/contact",
    },
  },
};


export const automotiveServicesData = {
  heading: {
    title: "Professional Automotive Services",
    subtitle:
      "Comprehensive maintenance and repair solutions by certified automotive technicians at Naz Motors.",
  },

  services: [
    {
      title: "Full Car Service",
      desc: "Comprehensive vehicle inspection and maintenance service.",
      icon: FaCar,
      points: [
        "Engine oil & filter change",
        "Brake system inspection",
        "Suspension check",
        "Battery & electrical test",
        "Fluid level checks",
        "Tyre condition assessment",
      ],
    },
    {
      title: "MOT Testing",
      desc: "Official MOT testing by qualified MOT testers (Class 4 and Class 7).",
      icon: FaWrench,
      points: [
        "Qualified MOT testers",
        "Same-day results",
        "Detailed failure report",
        "Repair estimates",
        "Re-test included",
        "Digital certificate",
      ],
    },
    {
      title: "Brake Service",
      desc: "Professional brake system maintenance and repair.",
      icon: FaTools,
      points: [
        "Brake pad replacement",
        "Disc inspection",
        "Brake fluid change",
        "Handbrake adjustment",
        "Brake pipe inspection",
        "Performance testing",
      ],
    },
    {
      title: "Exhaust Systems",
      desc: "Complete exhaust system service and replacement.",
      icon: FaClock,
      points: [
        "Exhaust inspection",
        "Silencer replacement",
        "Catalytic converter",
        "Emission testing",
        "Custom fabrication",
        "Performance exhausts",
      ],
    },
  ],
};



export const majorServicesData = {
  heading: {
    title: "Major Service & Repair Work",
    subtitle:
      "Specialist services for major components and critical vehicle systems",
  },

  cta: {
    text: "Get Quote",
    href: "/contact",
  },

  services: [
    {
      title: "Cambelt Replacement",
      subtitle: "Critical timing belt replacement service",
      description:
        "Essential service to prevent catastrophic engine damage. Our qualified technicians use genuine parts and follow manufacturer specifications.",
    },
    {
      title: "Clutch Repair & Replacement",
      subtitle: "Complete clutch system service",
      description:
        "Professional clutch diagnosis, repair, and replacement. We service manual and automatic transmissions for all vehicle types.",
    },
    {
      title: "Welding Work",
      subtitle: "Professional automotive welding services",
      description:
        "Expert welding repairs for MOT failures, bodywork, and structural components. All work guaranteed and MOT compliant.",
    },
  ],
};
