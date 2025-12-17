import { FaPhoneAlt , FaPhone , FaCar,
  FaWrench,
  FaTools,
  FaClock,} from "react-icons/fa";

export const motHeroData = {
  badge: "Qualified Technicians",

  title: {
    before: "Installations &",
    highlight: "Fitting Services",
  },

  description: {
    // beforeBold: "Trust ",
    // bold: "Naz Motors",
    afterBold:
      "Professional installations and fittings for all your car electrical and accessory needs. MA Auto Electrics ensures every system is installed safely, securely, and to the highest standard.",
  },

  buttons: {
    primary: {
      text: "Book: 0116 251 5961",
      href: "tel:01162515961",
      icon: FaPhoneAlt,
      bg: "#C8102E",
      color: "#FFFFFF",
    },
    secondary: {
      text: "Book Your Service",
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

  heading: "Car Electric Specialists in Accrington, Lancashire",

  subheading:
    "Contact MA Auto Electrics today for expert installations and fittings of car electrical systems and accessories.",

  buttons: {
    call: {
      text: "Call 0116 251 5961",
      href: "tel:01162515961",
      icon: FaPhone,
    },
    book: {
      text: "Book Service",
      href: "/contact",
    },
  },
};


export const automotiveServicesData = {
  heading: {
    title: "Professional Installations & Fitting",
    subtitle:
      "Expert fitting of electrical systems, accessories, and devices for all vehicle makes and models",
  },

 services: [
  {
    title: "Car Electrical Installations",
    desc: "Comprehensive installation of electrical components and systems.",
    icon: FaCar,
    points: [
      "Wiring and harness installation",
      "Battery and power system connections",
      "Lighting upgrades and repairs",
      "Audio and infotainment systems",
    ],
  },
  {
    title: "Accessory Fitting",
    desc: "Professional installation of car accessories for optimal performance.",
    icon: FaWrench,
    points: [
      "Handsfree kits and phone mounts",
      "Parking sensors and cameras",
      "Alarm and security systems",
      "Vehicle tracking devices",
    ],
  },
  {
    title: "Professional Equipment & Tools",
    desc: "All fittings carried out using the latest tools and techniques.",
    icon: FaTools,
    points: [
      "Precision tools for neat installations",
      "Compatibility checks with vehicle electronics",
      "Secure mounting and wiring",
      "System testing and verification",
    ],
  },
  {
    title: "Maintenance & Troubleshooting",
    desc: "Ensure your installations remain functional and safe.",
    icon: FaClock,
    points: [
      "Fault diagnosis on fitted systems",
      "Repair or replacement of damaged components",
      "Software and firmware updates",
      "System recalibration and testing",
    ],
  },
  {
    title: "Custom Solutions & Upgrades",
    desc: "Tailored solutions for unique requirements or advanced upgrades.",
    icon: FaBolt,
    points: [
      "Bespoke wiring solutions",
      "Integration of multiple systems",
      "Upgrades to existing installations",
      "Expert advice and planning",
    ],
  },
],
};



export const majorServicesData = {
  heading: {
    title: "Why Choose MA Auto Electrics for Installations & Fitting?",
    subtitle:
      "We deliver professional, reliable, and safe installations for all car systems and accessories. Every job is done to the highest standard for lasting performance.",
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
