/**
 * Footer Component
 * Professional footer with logo, tagline, and social links
 */

import { motion } from "framer-motion";
import { Github, Linkedin, Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left - Logo & Project Name */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-lg">
                RefineryIQ
              </span>
              <span className="text-xs text-muted-foreground">
                IOCL Guwahati
              </span>
            </div>
          </div>

          {/* Center - Tagline */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium">
              AI for Smarter, Safer Refineries
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © 2026 RefineryIQ. All rights reserved.
            </p>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-colors group"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-lg bg-muted hover:bg-secondary/20 flex items-center justify-center transition-colors group"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
