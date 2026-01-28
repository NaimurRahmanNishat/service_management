import { motion } from "framer-motion";

interface MarqueeProps {
  texts: string[];
}

const Marquee = ({ texts }: MarqueeProps) => {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
      >
        {[...texts, ...texts].map((text, index) => (
          <span
            key={index}
            className="mx-12 text-lg text-gray-600 font-semibold"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;