import { motion } from "framer-motion";

type FadeInDivProps = {
  duration?: number;
  className?: string;
  key?: string;
  children: React.ReactNode;
};
const FadeInDiv = (props: FadeInDivProps) => {
  const { duration = 1.0, className, key, children } = props;

  return (
    <motion.div
      className={className}
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInDiv;
