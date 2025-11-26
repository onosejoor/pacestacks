"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { loginUser } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const { email, password, rememberMe } = formData;

  const isDisabled = !email || !password || loading;

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { success, message } = await loginUser(formData);

      const toastType = success ? "success" : "error";

      toast[toastType](message);

      if (success) {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-auth-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-auth-card border-auth-card-border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-auth-text-primary">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-auth-text-secondary">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-auth-text-primary font-medium"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-auth-icon" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={handleInputChange}
                  className="pl-10 border-auth-input-border focus:border-auth-input-focus focus:ring-auth-input-focus"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-auth-text-primary font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-auth-icon" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 border-auth-input-border focus:border-auth-input-focus focus:ring-auth-input-focus"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-auth-icon hover:text-auth-icon-hover"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleInputChange}
                  className="rounded border-auth-input-border text-auth-button-primary focus:ring-auth-input-focus"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-auth-text-muted"
                >
                  Remember me
                </Label>
              </div>
            </div>

            <Button
              disabled={isDisabled}
              type="submit"
              className="w-full bg-auth-button-primary text-white hover:bg-auth-button-primary-hover"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-auth-text-secondary">
              Don&apos;t have an account?
            </span>
            <Link
              href="/auth/register"
              className="ml-2 text-auth-link hover:text-auth-link-hover font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
