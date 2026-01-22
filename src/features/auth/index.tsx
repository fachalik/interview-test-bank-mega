import { LoginForm } from "./form";

export default function App() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-sm p-8 bg-white rounded-lg shadow space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-2xl font-bold text-gray-800">Credit Approval</h1>
					<p className="text-gray-500">Sign in to continue</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
