'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './style.scss';
import Image from "next/image";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import Cookies from "js-cookie";

interface LoginFormInputs {
  email: string;
  password: string;
}

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { showAlert } = useAlert();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);

    const { email, password } = data;

    const envEmail = process.env.NEXT_PUBLIC_EMAIL;
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (email === envEmail && password === envPassword) {
      Cookies.set("userEmail", email, { expires: 1 })
      router.push('/');
    } else {
      showAlert("Email ou senha inválidos.", "error");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Image className="logo" src={'/assets/logo/logo.svg'} alt={`Logo Dragão`} width={90} height={90} />
        <h1 className="login-title">Bem-vindo de volta</h1>
        <p className="login-subtitle">Faça login para continuar</p>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email"
            {...register('email', {
              required: 'O email é obrigatório.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Digite um email válido.',
              },
            })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              {...register('password', {
                required: 'A senha é obrigatória.',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres.',
                },
              })}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              <Image
                src={showPassword ? '/assets/eye-show.svg' : '/assets/eye-hide.svg'}
                alt={showPassword ? "Ícone para esconder senha" : "Ícone para mostrar senha"}
                width={20}
                height={20}
              />
            </button>
          </div>
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        <button className="submit-button" type="submit">
          {isLoading ? <Loader /> : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
