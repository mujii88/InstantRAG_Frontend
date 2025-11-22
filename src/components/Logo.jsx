import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <motion.img
                src="/logo.svg"
                alt="InstantRAG Logo"
                className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                animate={{
                    filter: [
                        'drop-shadow(0 0 15px rgba(0,255,255,0.5))',
                        'drop-shadow(0 0 25px rgba(0,255,255,0.7))',
                        'drop-shadow(0 0 15px rgba(0,255,255,0.5))',
                    ]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <div>
                <motion.h1
                    className="text-2xl font-bold text-gradient tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    InstantRAG
                </motion.h1>
                <p className="text-xs text-muted-foreground font-medium">RAG as a Service</p>
            </div>
        </motion.div>
    );
};

export default Logo;
