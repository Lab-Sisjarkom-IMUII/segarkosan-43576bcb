"use client";

import React, { useState, useEffect, Suspense } from "react";
import axios from "../../lib/api"; // Pastikan path ini benar
import { setToken } from "../../lib/auth"; // Pastikan path ini benar
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showExistingUserPopup, setShowExistingUserPopup] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const existingParam = searchParams.get("existing");

    if (emailParam) {
      setEmail(emailParam);
    }

    if (existingParam === "true") {
      setShowExistingUserPopup(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("/auth/login", { email, password });

      // Sesuaikan dengan struktur response backend Anda
      // Contoh: { data: { token: "...", user: {...} } }
      const { token, user } = res.data.data;

      setToken(token);

      // Simpan user info jika perlu
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Login gagal. Periksa email dan password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        const res = await axios.post("/auth/google", {
          token: tokenResponse.access_token,
        });

        const { token, user } = res.data.data;
        setToken(token);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        router.push("/dashboard");
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.message || "Google Login gagal."
        );
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError("Google Login Failed");
    },
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-sans">
      {/* Background decoration (Optional) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-emerald-50 to-slate-50 -z-10" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 m-4">
        <div className="p-8">
          {/* --- LOGO AREA --- */}
          <div className="flex flex-col items-center mb-8">
            {/* Ganti src dengan path logo Anda di folder public, misal /images/logo.png */}
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
              {/* Placeholder Icon jika logo belum ada */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
              </svg>
            </div>
            {/* Jika sudah ada file logo:
            <Image src="/images/logo.png" alt="Logo SegarKosan" width={80} height={80} className="mb-4" />
            */}

            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-slate-500 text-sm mt-1 text-center">
              Masuk untuk memantau kualitas udara & bau kost.
            </p>
          </div>

          {/* --- ERROR ALERT --- */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              {error}
            </div>
          )}

          {/* --- FORM --- */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="nama@email.com"
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all duration-200 animate-fade-in"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </form>

          {/* --- DIVIDER --- */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400">
                Atau masuk dengan
              </span>
            </div>
          </div>

          {/* --- GOOGLE LOGIN --- */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full bg-white border border-slate-200 text-slate-700 font-medium py-2.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google Account
          </button>
        </div>

        {/* --- FOOTER --- */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-500"
            >
              Daftar Sekarang
            </a>
          </p>
        </div>
      </div>
      {/* --- EXISTING USER POPUP --- */}
      {showExistingUserPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Akun Sudah Terdaftar</h3>
              <p className="text-slate-600 text-sm mb-6">
                Email <strong>{email}</strong> sudah terdaftar di sistem kami. Silakan login menggunakan password Anda.
              </p>
              <button
                onClick={() => setShowExistingUserPopup(false)}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors duration-200"
              >
                Mengerti, Lanjut Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-50">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
