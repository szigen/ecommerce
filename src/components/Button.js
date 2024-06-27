import { twMerge } from "tailwind-merge";

import React from "react";
import classnames from "classnames";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  notr,
  rounded,
  outline,
  ...rest
}) {
  const classes = twMerge(
    classnames(rest.className, "flex items-center px-3 py-1.5 border cursor-pointer", {
      "border-blue-500 bg-blue-500 text-white": primary,
      "border-gray-900 bg-gray-900 text-white": secondary,
      "border-green-700 bg-green-700 text-white hover:bg-green-900 hover:border-green-900": success,
      "border-yellow-400 bg-yellow-400 text-white": warning,
      "border-gray-400 bg-gray-300 text-black": notr,
      "border-red-500 bg-red-500 text-white": danger,
      "rounded": rounded,
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-400": outline && warning,
      "text-red-500": outline && danger,
    })
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
