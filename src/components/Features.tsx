import features from "../utils/features";
import { motion } from "framer-motion";
const Features = () => {
    return (
        <div className="py-20">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose Shaed?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 * index, duration: 0.5 }}
                        className="bg-white bg-opacity-10 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <img src={feature.icon} alt={feature.title} className="w-16 h-16 mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}

export default Features;