/**
 * API Service Layer
 * Simulates backend API calls with mock data
 * In production, these would connect to actual backend endpoints
 */

import {
  alerts,
  generateEnergyData,
  generatePredictions,
  kpis,
  mockUsers,
  recommendations,
  refineryUnits,
  type Alert,
  type EnergyData,
  type KPIData,
  type Prediction,
  type Recommendation,
  type RefineryUnit
} from "@/data/mockData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// JWT token storage
const TOKEN_KEY = "refineryiq_token";
const USER_KEY = "refineryiq_user";

/**
 * Authentication API
 */
export const authApi = {
  /**
   * Login with email and password
   * Returns JWT token on success
   */
  login: async (email: string, password: string) => {
    await delay(800); // Simulate network latency

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Generate mock JWT token
    const token = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    );

    // Store in localStorage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },

  /**
   * Logout - Clear stored credentials
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  },
};

/**
 * Energy Data API
 */
export const energyApi = {
  /**
   * Get all energy data
   */
  getData: async (): Promise<EnergyData[]> => {
    await delay(500);
    return generateEnergyData();
  },

  /**
   * Get energy data for specific unit
   */
  getUnitData: async (unitId: string): Promise<EnergyData[]> => {
    await delay(400);
    const allData = generateEnergyData();
    return allData.filter((d) => d.unitId === unitId);
  },

  /**
   * Get aggregated daily totals
   */
  getDailyTotals: async (): Promise<
    { date: string; totalEnergy: number; totalProduction: number }[]
  > => {
    await delay(600);
    const allData = generateEnergyData();

    // Group by date and sum
    const grouped = allData.reduce(
      (acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = { energy: 0, production: 0 };
        }
        acc[curr.date].energy += curr.energy;
        acc[curr.date].production += curr.production;
        return acc;
      },
      {} as Record<string, { energy: number; production: number }>
    );

    return Object.entries(grouped)
      .map(([date, data]) => ({
        date,
        totalEnergy: data.energy,
        totalProduction: data.production,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },
};

/**
 * KPI API
 */
export const kpiApi = {
  /**
   * Get all KPIs
   */
  getAll: async (): Promise<KPIData[]> => {
    await delay(300);
    return kpis;
  },

  /**
   * Calculate SEC for all units
   */
  getSEC: async (): Promise<{ unitId: string; sec: number }[]> => {
    await delay(400);
    return refineryUnits.map((unit) => ({
      unitId: unit.unitId,
      sec: parseFloat((Math.random() * 0.05 + 0.07).toFixed(4)),
    }));
  },
};

/**
 * Alerts API
 */
export const alertsApi = {
  /**
   * Get all alerts
   */
  getAll: async (): Promise<Alert[]> => {
    await delay(200);
    return alerts;
  },

  /**
   * Get unacknowledged alerts
   */
  getActive: async (): Promise<Alert[]> => {
    await delay(200);
    return alerts.filter((a) => !a.acknowledged);
  },

  /**
   * Acknowledge an alert
   */
  acknowledge: async (alertId: string): Promise<void> => {
    await delay(300);
    const alert = alerts.find((a) => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
    }
  },
};

/**
 * Units API
 */
export const unitsApi = {
  /**
   * Get all refinery units
   */
  getAll: async (): Promise<RefineryUnit[]> => {
    await delay(400);
    return refineryUnits;
  },

  /**
   * Get specific unit details
   */
  getUnit: async (unitId: string): Promise<RefineryUnit | undefined> => {
    await delay(300);
    return refineryUnits.find((u) => u.unitId === unitId);
  },
};

/**
 * Predictions API
 */
export const predictionsApi = {
  /**
   * Get energy predictions
   */
  getPredictions: async (): Promise<Prediction[]> => {
    await delay(700);
    return generatePredictions();
  },
};

/**
 * Recommendations API
 */
export const recommendationsApi = {
  /**
   * Get all optimization recommendations
   */
  getAll: async (): Promise<Recommendation[]> => {
    await delay(500);
    return recommendations;
  },

  /**
   * Get recommendations by priority
   */
  getByPriority: async (priority: string): Promise<Recommendation[]> => {
    await delay(400);
    return recommendations.filter((r) => r.priority === priority);
  },
};

/**
 * Chatbot API
 * Uses Google's Gemini AI for intelligent responses
 */
export const chatbotApi = {
  /**
   * Send query to AI chatbot using Gemini API
   */
  query: async (
    message: string
  ): Promise<{ response: string; data?: unknown }> => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!API_KEY) {
      throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
    }

    try {
      // Build context about the refinery for better AI responses
      const lowerMessage = message.toLowerCase();
      const isRefineryQuestion = 
        lowerMessage.includes("sec") || 
        lowerMessage.includes("energy") || 
        lowerMessage.includes("alert") || 
        lowerMessage.includes("refinery") || 
        lowerMessage.includes("unit") || 
        lowerMessage.includes("efficiency") || 
        lowerMessage.includes("recommendation") ||
        lowerMessage.includes("prediction") ||
        lowerMessage.includes("optimize") ||
        lowerMessage.includes("plant");

      let context = "";
      if (isRefineryQuestion) {
        context = `You are RefineryIQ Assistant, an AI expert in refinery operations and energy management. 
      
Current Refinery Status:
- Overall SEC: 0.0842 MWh/bbl
- Active Alerts: ${alerts.filter(a => !a.acknowledged).length}
- Processing Units: 8 total (6 online, 1 maintenance, 1 warning)
- Current Efficiency: 91.4%
- Total Capacity: 470,000 bbl/day

Available Data:
${JSON.stringify({
  kpis: kpis.map(k => ({ name: k.name, value: k.value, unit: k.unit })),
  activeAlerts: alerts.filter(a => !a.acknowledged).map(a => ({ unitId: a.unitId, type: a.type, message: a.message })),
  units: refineryUnits.map(u => ({ unitId: u.unitId, name: u.name, status: u.status, efficiency: u.efficiency })),
  recommendations: recommendations.slice(0, 3).map(r => ({ title: r.title, priority: r.priority, potentialSavings: r.potentialSavings }))
}, null, 2)}

Provide helpful, concise, and technical responses about refinery operations, energy consumption, alerts, and optimization recommendations. Use the data provided when relevant to the question.

`;
      } else {
        context = "You are RefineryIQ Assistant, a helpful AI assistant. Answer the user's question clearly and concisely.\n\n";
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${context}User Question: ${message}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API Error Response:", errorData);
        throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I apologize, but I couldn't generate a response. Please try again.";

      // Extract relevant data based on the query for refinery questions
      let relevantData = undefined;
      
      if (lowerMessage.includes("sec") || lowerMessage.includes("energy consumption")) {
        relevantData = kpis.find((k) => k.name === "Overall SEC");
      } else if (lowerMessage.includes("alert") || lowerMessage.includes("alarm")) {
        relevantData = alerts.filter((a) => !a.acknowledged);
      } else if (lowerMessage.includes("recommendation") || lowerMessage.includes("optimize")) {
        relevantData = recommendations.slice(0, 3);
      } else if (lowerMessage.includes("prediction") || lowerMessage.includes("forecast")) {
        relevantData = generatePredictions();
      } else if (lowerMessage.includes("unit")) {
        relevantData = refineryUnits;
      }

      return {
        response: aiResponse,
        data: relevantData,
      };
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      console.error("Error details:", error.message);
      
      // Check if API key is missing
      if (!API_KEY) {
        return {
          response: `⚠️ Gemini API key is not configured. Please check that your .env file contains VITE_GEMINI_API_KEY and restart the dev server.`,
        };
      }
      
      // Fallback to mock responses if API fails
      return {
        response: `⚠️ I'm having trouble connecting to the Gemini AI service (${error.message}). Please check:\n1. Your internet connection\n2. The API key is valid\n3. The dev server was restarted after adding the .env file\n\nFor now, I can help with basic refinery info. The current SEC is 0.0842 MWh/bbl, there are ${alerts.filter(a => !a.acknowledged).length} active alerts, and the plant is running at 91.4% efficiency.`,
      };
    }
  },
};
