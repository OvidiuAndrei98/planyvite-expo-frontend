"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import PlanyviteLogo from "@/public/planyvite_logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/core/context/authContext";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  email: z.string().nonempty("Emailul este obligatoriu").email("Email invalid"),
  password: z
    .string()
    .nonempty("Parola este obligatorie")
    .min(6, "Parola trebuie să aibă cel puțin 6 caractere"),
});

export const LoginPage = () => {
  const router = useRouter();
  const { login, loginWithGoogle, isProcessingLogin, isAuthReady } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password);
  }

  return (
    <div className="p-[var(--padding-xl)_var(--padding-md)] md:max-w-[1024px] md:mx-auto">
      <div className={cn("flex flex-col gap-4 md:gap-6")}>
        <div className="flex justify-center mb-4">
          <Image
            className="cursor-pointer"
            onClick={() => router.push("/")}
            src={PlanyviteLogo}
            alt="planyvite-logo"
            width={200}
            height={50}
          />
        </div>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bine ai venit</h1>
                  <p className="text-slate-500 text-balance dark:text-slate-400">
                    Conectează-te pentru a continua
                  </p>
                </div>
                <div className="grid gap-3">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Email..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parola</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={!isAuthReady || isProcessingLogin}
                      >
                        {isProcessingLogin && <Spinner />}
                        Autentificare
                      </Button>
                    </form>
                  </Form>
                  <div className="after:border-slate-200 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t dark:after:border-slate-800">
                    <span className="bg-white text-slate-500 relative z-10 px-2 dark:bg-slate-950 dark:text-slate-400">
                      Sau conectează-te cu
                    </span>
                  </div>
                  <div className="w-full">
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={!isAuthReady || isProcessingLogin}
                      onClick={() => {
                        loginWithGoogle();
                      }}
                    >
                      G<span>Conectează-te cu Google</span>
                    </Button>
                  </div>
                </div>
                <div className="text-center text-sm">
                  Nu ai cont?{" "}
                  <a href="/register" className="underline underline-offset-4">
                    Înregistrează-te
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-[#f8e0ff] relative hidden md:block dark:bg-slate-800 p-5">
              {/* <Image
              src={LoginImage}
              alt="login-image"
              className="align-center h-full w-full"
            /> */}
            </div>
          </CardContent>
        </Card>
        <div className="text-slate-500 *:[a]:hover:text-slate-900 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 dark:text-slate-400 dark:*:[a]:hover:text-slate-50">
          Continuând, ești de acord cu{" "}
          <a className="font-semibold" href="#">
            Termenii și condițiile
          </a>{" "}
          și{" "}
          <a className="font-semibold" href="#">
            Politica de confidențialitate
          </a>
          .
        </div>
        <div className="text-slate-500 *:[a]:hover:text-slate-900 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 dark:text-slate-400 dark:*:[a]:hover:text-slate-50">
          <ul className="flex flex-row items-center justify-center gap-2">
            <li className="font-semibold">
              <Link href={"/"}>Acasă</Link>
            </li>
            <li>contact@planyvite.ro</li>
            <li>+40741448739</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
