import { motion } from "motion/react";

const Button = ({ style, children, handleClick, disabled = false }) => {
  const buttonProps = {
    className: `
      ${style} 
      rounded-[0.7rem] 
      font-semibold 
      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
    `,
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.95 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.3,
      ease: "easeInOut",
    },
    disabled,
  };

  if (!disabled && handleClick) {
    buttonProps.onClick = handleClick;
  }

  return (
    <motion.button {...buttonProps}>
      {children} 
    </motion.button>
  );
};

export default Button;
