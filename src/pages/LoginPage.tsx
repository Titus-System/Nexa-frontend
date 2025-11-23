import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/useAuth';

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "cadastro" ? "cadastro" : "login";
  const [switchMode, setSwitchMode] = useState(initialMode);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
  const mode = searchParams.get("mode");
  if (mode === "cadastro") {
    setSwitchMode("cadastro");
  } else if (mode === "login") {
    setSwitchMode("login");
  }
}, [searchParams]);

  return (
    <div className={`p-6 flex flex-col justify-center items-center mb-28 ${darkMode ? "dark-mode" : ""}`}>
      <div className="mt-48 mb-24 flex flex-col items-center">
        <div className='border-1 border-[#9799A6]/60 rounded-xl p-0 flex flex-row w-[65%] justify-center items-center h-[25rem] shadow-[0_0_60px_rgba(0,0,0,0.15)]'>
          <div className='bg-gradient-to-tr from-[#0F3B57] from-20% to-[#1b5477] to-90% rounded-l-xl h-[100%] w-[50%] py-[12%] px-[5%] flex items-center justify-center flex-col'>
            <h2 className='font-bold text-white text-3xl mb-9'>Tenha acesso a todos os recursos do Nexa.</h2>
            <p className='text-white text-xs leading-5'>Crie sua conta e tenha todas as suas análises a um clique de distância, além de estatísticas exclusivas. 
            Classificações precisas, relatórios automáticos e total conformidade com a Receita Federal.</p>
          </div>
          <div className='w-[50%] h-[100%] px-[5%] py-0 flex items-center justify-center flex-col bg-white rounded-r-xl'>
            <div className='m-[40px] w-[100%] h-[100%] flex flex-col justify-start'>
              <div className='flex cursor-pointer bg-[#0F3B57]/10 rounded-xl'>
              <button
          onClick={() => setSwitchMode("login")}
          className={`
            flex-1 py-2 text-center transition-all
            ${switchMode === "login" ? "bg-[#0F3B57]/80 rounded-l-xl text-white font-semibold" : ""} 
          `}
        >
          Login
        </button>

        <button
          onClick={() => setSwitchMode("cadastro")}
          className={`
            flex-1 py-2 text-center transition-all
            ${switchMode === "cadastro" ? "bg-[#0F3B57]/80 rounded-r-xl text-white font-semibold" : ""}
          `}
        >
          Cadastro
        </button>
              </div>

      {/* FORMULÁRIO QUE MUDA */}
        {switchMode === "login" ? <LoginForm /> : <CadastroForm />}
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email_login.value.trim();
    const password = form.senha_login.value;

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      console.log("ERRO DO BACKEND:", error);
      alert(JSON.stringify(error, null, 2));
      return;
    }
    const data = await res.json();

    login(data.access_token, data.user);
    navigate("/account");

  }
  return (
    <form className="flex flex-col justify-center items-center gap-4 w-full" onSubmit={handleLogin}>
      <br />
      <div className="w-full flex flex-col text-left">
        <label htmlFor='email_login'>Email:</label>
        <input className="bg-[#0F3B57]/10 rounded-lg" name='email_login' type="email" required />
      </div>

      <div className="w-full flex-1 flex flex-col text-left">
          <label htmlFor='senha_login'>Senha:</label>
          <input type="password" className="bg-[#0F3B57]/10 w-full rounded-lg" name='senha_login' required />
      </div>

      <br />

      <button type="submit" className='mt-[3rem] bg-gradient-to-tr from-[#0F3B57] from-20% to-[#1b5477] to-80% text-white font-bold rounded-xl py-1.5 w-[95%]'>Login</button>
    </form>
  );
}

function CadastroForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const name = form.nome_cadastro.value.trim();
    const email = form.email_cadastro.value.trim();
    const password = form.senha_cadastro.value;

    const cargo = form.cargo_cadastro.value.trim();
    const telefone = form.telefone_cadastro.value.trim();


    const payload = {
      name,
      email,
      password
    };

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      console.log("ERRO DO BACKEND:", error);
      alert(JSON.stringify(error, null, 2));
      return;
    }

    const loginRes = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      alert("Conta criada, mas falha ao autenticar automaticamente.");
      navigate("/login");
      return;
    }

    const loginData = await loginRes.json();

    login(loginData.access_token, {
      ...loginData.user,
      role: cargo,
      phone: telefone
  });


    navigate("/account");

  }
  return (
    <form className="flex flex-col justify-center items-center gap-4 w-full" onSubmit={handleRegister}>
      <br />
      <div className="w-full flex flex-col text-left">
        <label htmlFor='nome_cadastro'>Nome:</label>
        <input type="text" className="bg-[#0F3B57]/10 rounded-lg" name='nome_cadastro' required />
      </div>

      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 flex flex-col text-left">
          <label htmlFor='email_cadastro'>Email:</label>
          <input type="email" className="bg-[#0F3B57]/10 w-full rounded-lg" name='email_cadastro' required />
        </div>

        <div className="flex-1 flex flex-col text-left">
          <label htmlFor='senha_cadastro'>Senha:</label>
          <input type="password" className="bg-[#0F3B57]/10 w-full rounded-lg" name='senha_cadastro' required />
        </div>
      </div>

      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 flex flex-col text-left">
          <label htmlFor='cargo_cadastro'>Cargo/Função:</label>
          <input type="text" className="bg-[#0F3B57]/10 w-full rounded-lg" id='cargo_cadastro' />
        </div>

        <div className="flex-1 flex flex-col text-left">
          <label htmlFor='telefone_cadastro'>Telefone:</label>
          <input type="tel" className="bg-[#0F3B57]/10 w-full rounded-lg" id='telefone_cadastro' />
        </div>
      </div>

      <button type="submit" className="mt-[1.4rem] bg-gradient-to-tr from-[#0F3B57] from-20% to-[#1b5477] to-80% text-white font-bold rounded-xl py-1.5 w-[90%]">Cadastrar</button>
    </form>
  );
}


export default LoginPage;
