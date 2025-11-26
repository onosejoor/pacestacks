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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { registerUser } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/lib/configs/schema.config";
import { getErrorMessage } from "@/lib/utils";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<RegisterSchema>({
    email: "",
    name: "",
    password: "",
    role: "staff",
  });

  const { email, name, password, role } = formData;

  const isDisabled = loading || !email || !name || !password;

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { success, message } = await registerUser(formData);

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
            Create Account
          </CardTitle>
          <CardDescription className="text-auth-text-secondary">
            Enter your details to create your account
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
                htmlFor="name"
                className="text-auth-text-primary font-medium"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-auth-icon" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={handleInputChange}
                  className="pl-10 border-auth-input-border focus:border-auth-input-focus focus:ring-auth-input-focus"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-auth-text-primary font-medium"
              >
                Role
              </Label>
              <Select
                value={role}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: value as "staff" | "admin",
                  }))
                }
              >
                <SelectTrigger className="border-auth-input-border focus:border-auth-input-focus focus:ring-auth-input-focus">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
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
                  placeholder="Create a password"
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

            <Button
              disabled={isDisabled}
              type="submit"
              className="w-full bg-auth-button-primary text-white hover:bg-auth-button-primary-hover"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-auth-text-secondary">
              Already have an account?
            </span>
            <Link
              href="/auth/login"
              className="ml-2 text-auth-link hover:text-auth-link-hover font-medium"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
