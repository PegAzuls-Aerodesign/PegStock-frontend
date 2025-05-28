"use client";

import { EyeButton } from "@/components/form/eye-button";
import { AuthTextInput } from "@/components/form/input/text-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

export default function AuthPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simula uma requisição assíncrona
    setTimeout(() => {
      const isAuthenticated = email === "admin" && password === "admin";
      setIsSubmitting(false);

      if (isAuthenticated) {
        router.push("/home");
        return;
      }

      alert("E-mail ou senha inválidos");
    }, 1000);
  };

  return (
    <form className="h-full w-full max-w-120 space-y-4 p-4">
      <AuthTextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="text"
      />
      <AuthTextInput
        label="Senha"
        placeholder="Digite sua senha"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type={showPassword ? "text" : "password"}
        icon={
          <EyeButton
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            className="top-7 right-3"
          />
        }
      />
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={!email || !password || isSubmitting}
        type="submit"
      >
        Login {<Spinner className={cn("ml-2", { hidden: !isSubmitting })} />}
      </Button>
    </form>
  );
}
