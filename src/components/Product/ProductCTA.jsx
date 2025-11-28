"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ProductCTA() {
    return (
        <section className="w-full bg-[#317F21]  py-20 px-4">
            <div className="max-w-3xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-white text-3xl md:text-5xl font-semibold mb-6">
                    Not finding what you're looking for?
                </h2>

                {/* Subtitle */}
                <p className="text-gray-300 text-base md:text-lg mb-10">
                    Subscribe to our mailing list and get updates about new vehicles and special offers.
                </p>

                {/* Input + Button */}
                <div className="flex w-full max-w-2xl mx-auto bg-white rounded-full overflow-hidden shadow-md">
                    <input
                        type="email"
                        placeholder="example@framer.com"
                        className="flex-1 px-5 py-3 text-gray-700 focus:outline-none"
                    />

                    <div className="p-0.5">
                        <button className="hover:bg-[#317F21]  rounded-full flex items-center gap-2 bg-[#3ad81a] text-white px-6 md:px-10 py-3 font-medium whitespace-nowrap">
                            View Our Cars 
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
