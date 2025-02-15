"use client";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	message: string;
	children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	title,
	message,
	children,
}) => {
	if (!isOpen) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 flex items-center justify-center bg-muted/50 z-50"
				>
					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
						className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center"
					>
						<h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
						<p className="text-gray-700 mb-4">{message}</p>
						<div className="flex justify-center space-x-4">{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
