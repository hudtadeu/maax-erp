"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    usuario: z.string().min(1, { message: "O usuário é obrigatório" }),
    password: z.string().min(1, { message: "A senha é obrigatória" }),
});

export const SignInView = () => {
    const router = useRouter(); 
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: "",
            password: "",
        },
    });

    useEffect(() => {
        const userName = localStorage.getItem("userName")
        if (userName) {
            router.replace("/dashboard")
        }
    }, [router])

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);
        
        // Simular um delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Validação das credenciais
        if (data.usuario === "admin" && data.password === "admin") {
            // Salvar dados no localStorage
            localStorage.setItem("userName", data.usuario);
            localStorage.setItem("userAdmin", "true"); // Definindo como admin
            router.push("/dashboard");
        } else if (data.usuario && data.password) {
            setError("Credenciais inválidas. Use admin/admin para acessar.");
        } else {
            setError("Usuário e senha são obrigatórios");
        }
        
        setPending(false);
    };

    return (
        <div className="dark min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-6">
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">
                                            Bem vindo!
                                        </h1>
                                        <p className="text-muted-foreground text-balance">
                                            Faça login na sua conta para continuar.
                                        </p>
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="usuario"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Usuário</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Digite seu usuário"
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
                                                    <FormLabel>Senha</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="**************"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {!!error && (
                                        <Alert className="bg-destructive/10 border-none">
                                            <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                            <AlertTitle>
                                                {error}
                                            </AlertTitle>
                                        </Alert>
                                    )}
                                    <Button
                                        disabled={pending}
                                        type="submit"
                                        className="w-full"
                                    >
                                        {pending ? "Entrando..." : "Entrar"}
                                    </Button>
                                </div>
                            </form>
                        </Form> 

                        <div
                            className="relative hidden md:flex flex-col gap-y-4 items-center justify-center"
                            style={{
                                background: "#27272a" 
                            }}
                        >
                            <span className="text-white text-3xl font-bold tracking-wide drop-shadow-md">
                                MAAX SOLUÇÕES
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs
                text-balance *:[a]:underline *:[a]:underline-offset-4">
                    Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">
                    Política de Privacidade</a>
                </div>
            </div>
        </div>
    );
};