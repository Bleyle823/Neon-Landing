import React from "react";

const Button = ({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
  href,
  target = "_self",
  rel,
  onClick,
}) => {
  const className = `group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`;
  if (href) {
    return (
      <a id={id} href={href} target={target} rel={rel} className={className}>
        {leftIcon}
        <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
          <div>{title}</div>
        </span>
        {rightIcon}
      </a>
    );
  }
  return (
    <button id={id} className={className} onClick={onClick}>
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
