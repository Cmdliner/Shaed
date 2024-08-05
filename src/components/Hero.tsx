import { motion } from "framer-motion";
import bg_img from "../assets/nasa_bg.jpg";

const Hero = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="flex flex-col md:flex-row items-center justify-between p-3 md:p-20"
		>
			<div className="md:w-1/2 text-center md:text-left">
				<motion.h1
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.8 }}
					className="text-5xl font-bold mb-6"
				>
					Connect Globally, Chat Instantly
				</motion.h1>
				<motion.p
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.8 }}
					className="text-xl mb-8"
				>
					Experience seamless real-time messaging across the world with Shaed.
				</motion.p>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="btn btn-primary btn-lg"
				>
					Get Started
				</motion.button>
			</div>
			<motion.div
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.8 }}
				className="md:w-1/2 mt-10 md:mt-0"
			>
				<img
					src={bg_img}
					alt="Global Chat Illustration"
					className="w-full"
				/>
			</motion.div>
		</motion.div>
	);
};

export default Hero;
