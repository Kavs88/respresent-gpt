"use client";
import React from 'react';

const FEATURES = [
  {
    title: "Curated Talent",
    description: "Hand-picked artists and creators who meet our high standards of excellence and innovation."
  },
  {
    title: "Global Reach",
    description: "Connect with opportunities worldwide through our extensive network of partners and collaborators."
  },
  {
    title: "Personalized Support",
    description: "Dedicated representation and strategic guidance tailored to each artist's unique vision and goals."
  },
  {
    title: "Premium Exposure",
    description: "Showcase your work on a platform designed to attract top-tier opportunities and collaborations."
  }
];

export default function Features() {
  return (
    <div className="max-container padding-container flex flex-col">
      <h2 className="bold-40 lg:bold-64">Our Features</h2>
      
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex-1">
          <p className="regular-16 mt-5 text-gray-30">
            We provide top-tier tools and insights, designed to elevate talent representation and unlock new opportunities in a competitive landscape.
          </p>
        </div>
        
        <div className="flex-1">
          <ul className="grid gap-10 md:grid-cols-2">
            {FEATURES.map((feature, index) => (
              <li key={index} className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 