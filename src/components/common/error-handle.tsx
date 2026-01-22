import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

import {
	AlertTriangle,
	Info,
	LogIn,
	SearchX,
	ServerCrash,
	ServerOff,
	ShieldX,
	XCircle,
} from "lucide-react";
import React from "react";
type ResponseHandlerProps = {
	status?: number;
};

export default function ErrorHandler({ status }: ResponseHandlerProps) {
	// logger.log("Error status:", status);

	const getTitle = () => {
		switch (status) {
			case 204:
				return "No Content";
			case 400:
				return "Bad Request";
			case 401:
				return "Unauthorized";
			case 403:
				return "Forbidden";
			case 404:
				return "Not Found";
			case 500:
				return "Server Error";
			case 503:
				return "Service Unavailable";
			default:
				return "Error";
		}
	};

	const getMessage = () => {
		switch (status) {
			case 204:
				return "No data to display at the moment.";
			case 400:
				return "Your request couldn't be processed. Please review your input and try again.";
			case 401:
				return "You need to be signed in to access this page.";
			case 403:
				return "Access denied. You do not have the required permissions.";
			case 404:
				return "We couldn't find what you were looking for. Please check the address or try again later.";
			case 500:
				return "Something went wrong on our end. Please try again soon or contact support if the issue persists.";
			case 503:
				return "Our service is temporarily unavailable. We're working to restore access as soon as possible.";
			default:
				return `An error occurred${status ? ` (status ${status})` : ""}. Please try again or contact support.`;
		}
	};

	const StatusIcon = () => {
		switch (status) {
			case 204:
				return Info; // No content / empty state

			case 400:
				return AlertTriangle; // Bad request / validation error

			case 401:
				return LogIn; // Authentication required

			case 403:
				return ShieldX; // Forbidden / no permission

			case 404:
				return SearchX; // Not found

			case 500:
				return ServerCrash; // Internal server error

			case 503:
				return ServerOff; // Service unavailable

			default:
				return XCircle; // Unknown error
		}
	};

	return (
		<div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						{React.createElement(StatusIcon())}
					</EmptyMedia>
					<EmptyTitle>{getTitle()}</EmptyTitle>
					<EmptyDescription>{getMessage()}</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Link href="/">
						<Button>Back to Home Page</Button>
					</Link>
				</EmptyContent>
			</Empty>

			<p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500 dark:text-gray-400">
				&copy; {new Date().getFullYear()} - PT. Skyworx Indonesia
			</p>
		</div>
	);
}
