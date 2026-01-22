import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},

	// Redirects for legacy admin routes
	async redirects() {
		return [
			// Legacy admin routes
			{
				source: "/management",
				destination: "/management/users",
				permanent: true,
			},
			{
				source: "/models/simulation",
				destination: "/models",
				permanent: true,
			},
			{
				source: "/models/predict",
				destination: "/models",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
