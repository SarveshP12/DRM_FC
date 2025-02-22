"use client"; // Ensure this runs on the client side

import { ConvexProvider, ConvexReactClient } from "convex/react";

// Initialize Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function ConvexProviderWrapper({ children }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}