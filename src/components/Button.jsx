"use client";
import React from "react";

const Button = ({ name, event }) => {
  return <button onclick={event}>{name}</button>;
};

export default Button;
