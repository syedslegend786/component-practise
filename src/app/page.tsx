import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link className="border p-3 border-gray-900 text-gray-900" href={"/calendar"}>See Calendar</Link>
    </div>
  );
};

export default Home;
