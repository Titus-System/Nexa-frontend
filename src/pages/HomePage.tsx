import { useState, useEffect } from 'react';
import { ArrowRight, Upload, Bot, FileText, Shield, Clock, Target, Zap, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate, useNavigation } from 'react-router-dom';

export default function HomePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

    // Animação dos steps
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Intersection Observer para animações
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[id^="animate-"]');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const navigate = useNavigate();

    const steps = [
        {
            icon: Upload,
            title: "Envie seus Dados",
            description: "Upload de PDF com lista de materiais ou Part-Number direto na plataforma"
        },
        {
            icon: Bot,
            title: "IA Analisa",
            description: "Varredura inteligente consolidando dados técnicos e fiscais do produto"
        },
        {
            icon: FileText,
            title: "Receba o Relatório",
            description: "Classificação NCM, descrição, fabricante e origem em documento completo"
        }
    ];

    const benefits = [
        { icon: Shield, title: "Reduza Riscos e Multas", desc: "Evite penalidades com classificações que atendem à Receita Federal" },
        { icon: Clock, title: "Economize Tempo", desc: "Automatize horas de pesquisa manual e foque no seu negócio" },
        { icon: Target, title: "Máxima Precisão", desc: "IA treinada com informações atualizadas, minimizando erros humanos" },
        { icon: FileText, title: "Relatórios Completos", desc: "Documentos com fabricante, origem e endereço consolidados" }
    ];

    return (
        <div className="bg-[#010A26] text-gray-200 overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#010A26] via-[#0F1B3C] to-[#010A26]"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center space-y-8 animate-fade-in">
                            {/* Badge */}
                            <div className="inline-flex items-center px-4 py-2 bg-[#0F3B57]/30 border border-[#0F3B57] rounded-full backdrop-blur-sm">
                                <Zap className="w-4 h-4 text-cyan-400 mr-2" />
                                <span className="text-sm text-cyan-400 font-medium">Inteligência Artificial Avançada</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-400 bg-clip-text text-transparent leading-tight">
                                Inteligência Aduaneira
                                <span className="block text-4xl md:text-6xl mt-2">para sua Empresa</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                                Elimine multas e acelere o desembaraço. A <span className="text-cyan-400 font-semibold">Nexa</span> automatiza 
                                a classificação fiscal com a precisão que sua operação exige.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                                <button 
                                    onClick={() => navigate('/classification')}
                                    className="cursor-pointer group bg-gradient-to-r from-[#0F3B57] to-[#1E5A8A] hover:from-[#1E5A8A] hover:to-[#0F3B57] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center"
                                >
                                    Iniciar Nova Análise
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>

                            {/* Stats */}
                            {/* <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-400">99.8%</div>
                                    <div className="text-sm text-gray-400">Precisão</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-400">75%</div>
                                    <div className="text-sm text-gray-400">Tempo Economizado</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-400">0</div>
                                    <div className="text-sm text-gray-400">Multas Evitadas</div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="animate-steps" className="py-32 bg-gradient-to-b from-[#081736] to-[#010A26] relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwRjNCNTciIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+CiAgPC9wYXR0ZXJuPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] opacity-20"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Simples, <span className="text-cyan-400">Rápido</span> e Preciso
                            </h2>
                            <p className="text-xl text-gray-400">Em apenas três passos, você tem seu relatório completo.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = currentStep === index;
                                
                                return (
                                    <div 
                                        key={index}
                                        className={`relative p-8 rounded-2xl transition-all duration-500 transform ${
                                            isActive 
                                                ? 'bg-gradient-to-br from-[#0F3B57] to-[#1E5A8A] scale-105 shadow-2xl' 
                                                : 'bg-[#0F3B57]/50 backdrop-blur-sm hover:bg-[#0F3B57]/70'
                                        }`}
                                    >
                                        {/* Step number */}
                                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                                            {index + 1}
                                        </div>

                                        <div className="text-center space-y-6">
                                            <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                                isActive ? 'bg-white/20' : 'bg-white/10'
                                            }`}>
                                                <Icon className={`w-8 h-8 transition-colors ${
                                                    isActive ? 'text-cyan-300' : 'text-white'
                                                }`} />
                                            </div>

                                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                            <p className="text-gray-300 leading-relaxed">{step.description}</p>
                                        </div>

                                        {/* Connection line */}
                                        {index < steps.length - 1 && (
                                            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="animate-benefits" className="py-32 relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                A Vantagem <span className="text-cyan-400">Competitiva</span> que Você Precisa
                            </h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                Transforme um processo complexo em uma operação ágil e segura.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div 
                                        key={index}
                                        className={`group p-8 rounded-2xl bg-gradient-to-br from-[#0F3B57]/50 to-[#1E5A8A]/30 backdrop-blur-sm border border-[#0F3B57]/30 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105 ${
                                            isVisible['animate-benefits'] ? 'animate-fade-in-up' : 'opacity-0'
                                        }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="space-y-6">
                                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                {benefit.title}
                                            </h3>
                                            
                                            <p className="text-gray-300 leading-relaxed">
                                                {benefit.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-32 bg-gradient-to-r from-[#081736] via-[#0F3B57] to-[#081736] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiNjeWFuIiBvcGFjaXR5PSIwLjMiLz4KICA8L3BhdHRlcm4+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPgo8L3N2Zz4=')] opacity-30"></div>
                    
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div className="inline-flex items-center px-4 py-2 bg-cyan-400/20 border border-cyan-400/30 rounded-full">
                                <TrendingUp className="w-4 h-4 text-cyan-400 mr-2" />
                                <span className="text-cyan-400 font-medium">Otimize Agora</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                Pronto para <span className="text-cyan-400">revolucionar</span> seu processo aduaneiro?
                            </h2>
                            
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Deixe a <span className="text-cyan-400 font-semibold">Nexa</span> ser sua parceira estratégica 
                                na automação fiscal e ganhe agilidade e segurança nas suas importações.
                            </p>

                            <div className="pt-8">
                                <button 
                                    onClick={() => navigate('/classification')}
                                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center mx-auto"
                                >
                                    Começar Agora
                                    <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
                                </button>
                                
                                <p className="text-gray-400 text-sm mt-4">
                                    ✨ Resultados em minutos
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    );
};