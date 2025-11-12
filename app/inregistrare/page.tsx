"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { User } from "@/core/types"; // Asigură-te că interfața User este definită aici sau importată corect
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addUser } from "@/service/user/addUser";
import Link from "next/link";
import PlanyviteLogo from "@/public/planyvite_logo.svg";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FieldType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const formSchema = z
  .object({
    email: z
      .string()
      .nonempty("Emailul este obligatoriu")
      .email("Email invalid"),
    name: z.string().nonempty("Numele este obligatoriu"),
    surname: z.string().nonempty("Prenumele este obligatoriu"),
    password: z
      .string()
      .nonempty("Parola este obligatorie")
      .min(6, "Parola trebuie să aibă cel puțin 6 caractere"),
    repeatPassword: z.string().nonempty("Confirmarea parolei este obligatorie"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Parolele nu se potrivesc",
    path: ["repeatPassword"],
  });

const RegisterPage = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();
  const auth = firebaseAuth;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
      repeatPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let userCredential;

      userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      // Actualizează profilul Firebase cu numele afișat
      await updateProfile(user, {
        displayName: `${values.name} ${values.surname}`,
      });

      // Creează/Actualizează utilizatorul în Firestore
      const userDoc: User = {
        uid: user.uid,
        email: user.email as string,
        displayName: values.name + " " + values.surname,
        photoURL: user.photoURL || null,
      };
      await addUser(userDoc);

      toast.success("Contul a fost creat cu succes! Te redirecționăm...");

      window.location.href = "/dashboard/setari-furnizor";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email-ul este deja folosit. Te rugăm să te autentifici.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Parola este prea slabă. Alege o parolă mai puternică.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Adresă de email invalidă.");
      } else {
        toast.error(
          "A apărut o eroare la înregistrare. Te rugăm să încerci din nou."
        );
      }
    }
  }

  return (
    <div
      className={cn(
        "p-[var(--padding-xl)_var(--padding-md)] md:max-w-[1024px] md:mx-auto",
        className
      )}
      {...props}
    >
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
      <Card className="overflow-hidden mb-4">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Înregistrare</h1>
                <p className="text-slate-500 text-balance dark:text-slate-400">
                  Creează-ți cont pentru a continua
                </p>
              </div>
              <div className="grid gap-3">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nume</FormLabel>
                            <FormControl>
                              <Input placeholder="Nume..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prenume</FormLabel>
                            <FormControl>
                              <Input placeholder="Prenume..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                          <FormLabel>Parolă</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="repeatPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmă parola</FormLabel>
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
                    <Button type="submit" variant="default" className="w-full">
                      Înregistrează-te
                    </Button>
                  </form>
                </Form>
                <div className="text-center text-sm">
                  Ai deja cont?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Autentifică-te
                  </Link>
                </div>
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
  );
};

export default RegisterPage;
