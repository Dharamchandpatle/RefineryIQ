/**
 * Recommendations Panel Component
 * Displays AI-generated optimization recommendations
 */

import { Button } from "@/components/ui/button";
import { Recommendation } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  DollarSign,
  Lightbulb,
} from "lucide-react";

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
  onViewDetails?: (recommendation: Recommendation) => void;
}

export const RecommendationsPanel = ({
  recommendations,
  onViewDetails,
}: RecommendationsPanelProps) => {
  const getPriorityStyles = (priority: Recommendation["priority"]) => {
    switch (priority) {
      case "high":
        return {
          badge: "bg-destructive/20 text-destructive border-destructive/30",
          accent: "border-l-destructive",
        };
      case "medium":
        return {
          badge: "bg-warning/20 text-warning border-warning/30",
          accent: "border-l-warning",
        };
      case "low":
        return {
          badge: "bg-success/20 text-success border-success/30",
          accent: "border-l-success",
        };
      default:
        return {
          badge: "bg-muted text-muted-foreground",
          accent: "border-l-muted",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-orbitron font-bold text-lg text-[#0F172A]">
            AI Recommendations
          </h3>
          <p className="text-sm text-[#64748B]">
            Optimization opportunities
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.slice(0, 4).map((rec, index) => {
          const styles = getPriorityStyles(rec.priority);

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, x: 5 }}
              className={cn(
                "relative p-4 rounded-lg bg-gray-50 border border-l-4 cursor-pointer group",
                styles.accent
              )}
              onClick={() => onViewDetails?.(rec)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium uppercase border",
                      styles.badge
                    )}
                  >
                    {rec.priority}
                  </span>
                  {rec.unitId && (
                    <span className="px-2 py-0.5 rounded text-xs bg-secondary/20 text-secondary">
                      {rec.unitId}
                    </span>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h4 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors">
                {rec.title}
              </h4>

              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {rec.description}
              </p>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-success">
                  <DollarSign className="w-3 h-3" />
                  <span>${(rec.potentialSavings / 1000).toFixed(0)}K/year</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{rec.implementationTime}</span>
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        className="w-full mt-4 text-muted-foreground hover:text-primary"
      >
        View All Recommendations
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

export default RecommendationsPanel;
