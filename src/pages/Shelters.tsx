
import React from "react";
import Layout from "@/components/Layout";
import { EmergencyMap } from "@/components/EmergencyMap";

const Shelters = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
          Nearby Shelters
        </h2>
        <EmergencyMap />
      </div>
    </Layout>
  );
};

export default Shelters;
