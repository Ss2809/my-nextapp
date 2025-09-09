"use client";
import React, { memo } from "react";
import { useRouter } from "next/navigation";
import { CoolMode } from "@/components/magicui/cool-mode";

const plans = [
  {
    name: "Basic",
    price: "₹1999",
    desc: "Perfect for small photo sessions",
    features: ["1 Hour Shoot", "10 Edited Photos", "Online Gallery"],
  },
  {
    name: "Standard",
    price: "₹4999",
    desc: "Best for families & portraits",
    features: ["3 Hour Shoot", "30 Edited Photos", "Online + USB Delivery"],
  },
  {
    name: "Premium",
    price: "₹9999",
    desc: "Ideal for weddings & big events",
    features: ["Full Day Shoot", "100+ Edited Photos", "Printed Album + USB"],
  },
];

function PricingPlans() {
  const router = useRouter();

  const handleClick = () => {
    router.push("Booking/verifaction");
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-20 px-6">
      <h1 className="text-center text-5xl font-bold mb-14 text-gray-800">
        Our Packages
      </h1>

      <div className="grid sm:grid-cols-3 gap-8 max-sm:grid-cols-1">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 shadow-lg p-8 text-center transition-transform bg-white hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{plan.name}</h2>
            <p className="text-gray-500 mt-2">{plan.desc}</p>
            <p className="text-4xl font-bold text-purple-600 mt-4">{plan.price}</p>

            <ul className="mt-6 space-y-2 text-gray-700">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  {feature}
                </li>
              ))}
            </ul>
        <CoolMode>
            <button
              onClick={handleClick}
              className="mt-8 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition transform hover:scale-105 focus:outline-none"
            >
              Choose Plan
            </button>
            </CoolMode>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(PricingPlans);
