import { BarChart3 } from "lucide-react";

export default function ComingSoon() {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
			<div className="text-center max-w-md">
				<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
					<BarChart3 className="w-8 h-8 text-gray-400" />
				</div>
				<h1 className="text-3xl text-gray-900 mb-3">Coming Soon</h1>
				<p className="text-gray-600">
					We&apos;re building your dashboard. Check back soon for analytics and
					insights.
				</p>
			</div>
		</div>
	);
}
