"use client";
import React, { useState } from "react";

function page() {
  const [showPassword, setShowPassword] = useState(false);
  function showpassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div>
      <input type={showPassword ? "text" : "password"} placeholder="Enter your password" />
      <button onClick={showpassword}>{showPassword ? "Hide" : "Show"}</button>
    </div>
  );
}

export default page;
