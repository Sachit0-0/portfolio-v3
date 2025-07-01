import { motion } from "framer-motion";

export const sentenceVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // Delay between each letter
    },
  },
};

export const letterVariants = {
  hidden: { opacity: 0, y: `0.25em` },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Typewriter({ text, ...rest }) {
  return (
    <motion.p
      key={text}
      variants={sentenceVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
      {...rest}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={letterVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
