"use client";

import FormWrapper from "@/components/common/form-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { FormValues, useForm } from "./use-form";

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	const { form, isPending, onSubmit } = useForm();

	return (
		<div className="space-y-6">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-2">
					<FormWrapper<FormValues>
						name="username"
						title="Username"
						required
						errors={form.formState.errors}
					>
						<Input
							{...form.register("username")}
							placeholder="Enter your username"
							error={!!form.formState.errors.username}
							type="text"
						/>
					</FormWrapper>

					<FormWrapper<FormValues>
						name="password"
						title="Password"
						required
						errors={form.formState.errors}
					>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								{...form.register("password")}
								placeholder="Enter your password"
								error={!!form.formState.errors.password}
							/>
							<span
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</span>
						</div>
					</FormWrapper>

					<Button
						type="submit"
						disabled={isPending}
						className="w-full h-11 group"
					>
						{isPending ? (
							<span>Signing in...</span>
						) : (
							<>
								<span>Sign in</span>
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
