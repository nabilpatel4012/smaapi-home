"use client";
import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  ChevronRight,
  Code,
  Database,
  Shield,
  Users,
  Zap,
  Globe,
  Terminal,
  Lock,
  BarChart,
  Rocket,
  CheckCircle,
  ArrowDown,
  Play,
} from "lucide-react";
import "./ComingSoonPage.css";

interface VisibilityState {
  [key: string]: boolean;
}

const ComingSoonPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [scrollY, setScrollY] = useState<number>(0);
  const deviceRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [currentApiIndex, setCurrentApiIndex] = useState<number>(0);

  const apiGroups = [
    [
      { method: "GET", endpoint: "/users", color: "text-green-500" },
      { method: "POST", endpoint: "/users", color: "text-yellow-500" },
      { method: "PUT", endpoint: "/users/:id", color: "text-blue-500" },
      { method: "DELETE", endpoint: "/users/:id", color: "text-red-500" },
    ],
    [
      { method: "GET", endpoint: "/products", color: "text-green-500" },
      { method: "POST", endpoint: "/products", color: "text-yellow-500" },
      { method: "PUT", endpoint: "/products/:id", color: "text-blue-500" },
      { method: "DELETE", endpoint: "/products/:id", color: "text-red-500" },
    ],
    [
      { method: "GET", endpoint: "/orders", color: "text-green-500" },
      { method: "POST", endpoint: "/orders", color: "text-yellow-500" },
      { method: "PUT", endpoint: "/orders/:id", color: "text-blue-500" },
      { method: "DELETE", endpoint: "/orders/:id", color: "text-red-500" },
    ],
  ];

  useEffect(() => {
    // Check localStorage for submission status and email
    const storedSubmission = localStorage.getItem("smaapi_waitlist_submitted");
    const storedEmail = localStorage.getItem("smaapi_waitlist_email");
    if (storedSubmission === "true" && storedEmail) {
      setIsSubmitted(true);
      setEmail(storedEmail);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentApiIndex((prev) => (prev + 1) % apiGroups.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FF8C00", "#FFA500"],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.includes("@") && email.includes(".")) {
      // Store submission status and email in localStorage
      localStorage.setItem("smaapi_waitlist_submitted", "true");
      localStorage.setItem("smaapi_waitlist_email", email);
      setIsSubmitted(true);
      triggerConfetti();
    }
  };

  const features = [
    {
      icon: <Database className="w-6 h-6 text-yellow-500" />,
      title: "Flexible Database Support",
      description:
        "Choose from SQLite, MongoDB, MySQL, or PostgreSQL to power your APIs",
      delay: "0ms",
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-500" />,
      title: "Secure API Management",
      description:
        "Create and manage API keys, set rate limits, and ensure robust security",
      delay: "100ms",
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      title: "Custom Data Models",
      description:
        "Design tables or collections with indexes and relationships effortlessly",
      delay: "200ms",
    },
    {
      icon: <Globe className="w-6 h-6 text-yellow-500" />,
      title: "Instant API Creation",
      description:
        "Generate production-ready APIs from your data models in seconds",
      delay: "300ms",
    },
    {
      icon: <BarChart className="w-6 h-6 text-yellow-500" />,
      title: "Real-Time Monitoring",
      description: "Track API performance and usage with intuitive analytics",
      delay: "400ms",
    },
  ];

  const stats = [
    {
      label: "Databases Supported",
      value: "4+",
      icon: <Database className="w-5 h-5 text-yellow-500" />,
    },
    {
      label: "API Endpoints",
      value: "Unlimited",
      icon: <Rocket className="w-5 h-5 text-yellow-500" />,
    },
    {
      label: "Security Features",
      value: "10+",
      icon: <Shield className="w-5 h-5 text-yellow-500" />,
    },
    {
      label: "Launch Countdown",
      value: "Soon",
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
    },
  ];

  const deviceRotation = Math.max(0, Math.min(15, (scrollY - 800) / 50));
  const deviceScale = Math.max(0.8, Math.min(1, (scrollY - 600) / 400));

  return (
    <div className="page-container">
      {/* Animated background */}
      <div className="fixed inset-0 bg-background">
        <div
          className="absolute w-96 h-96 rounded-full bg-yellow-500 opacity-5 blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x / 10 + scrollY / 5 + "px",
            top: mousePosition.y / 10 + scrollY / 10 + "px",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-yellow-600 opacity-10 blur-3xl transition-all duration-1000 ease-out"
          style={{
            right: mousePosition.x / 15 + scrollY / 8 + "px",
            bottom: mousePosition.y / 15 + scrollY / 12 + "px",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 0, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 0, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4 fixed top-0 left-0 right-0 bg-background bg-opacity-80 backdrop-blur-md border-b border-border z-50">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="ensory flex items-center space-x-2 ">
              <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                <img src="/smaapi-logo.svg" alt="logo"></img>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Smaapi
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Features
              </a>
              <a
                href="#waitlist"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                <button className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-all duration-300 hover:scale-105 hover:shadow-lg text-yellow-500">
                  Join Waitlist
                </button>
              </a>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-32 mt-10">
          <div className="max-w-6xl mx-auto text-center">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full  border border-yellow-500 border-opacity-20 mb-8 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <Zap className="w-4 h-4 mr-2 text-yellow-500 animate-pulse" />
              <span className="text-sm font-medium">
                Get Ready - Smaapi is Coming Soon!
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              Create APIs with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 animate-gradient-x">
                {" "}
                Unmatched Ease
              </span>
            </h1>

            <p
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-slide-up"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              Smaapi is almost here! Build powerful APIs in minutes by choosing
              your database, designing data models, and managing endpoints with
              ease.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0 animate-slide-up"
              style={{ animationDelay: "1s", animationFillMode: "forwards" }}
            >
              <a href="#waitlist">
                <button className="ps-5 pe-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center group">
                  Join Waitlist Now
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            </div>

            {/* Animated Code Preview */}
            <div
              className="relative max-w-2xl mx-auto opacity-0 animate-slide-up"
              style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-card border border-border rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    API Preview
                  </span>
                </div>
                <div className="text-left text-sm space-y-2">
                  <div className="text-muted-foreground font-mono animate-typing">
                    // Generate any API in minutes
                  </div>
                  {apiGroups[currentApiIndex].map((api, index) => (
                    <div
                      key={index}
                      className="animate-slide-in font-mono"
                      style={{ animationDelay: `${0.5 + index * 0.5}s` }}
                    >
                      <span className={`${api.color} font-bold`}>
                        {api.method}
                      </span>{" "}
                      {api.endpoint}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="mt-14 flex justify-center">
              <div className="animate-bounce">
                <ArrowDown className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="animate-stats" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-6 rounded-lg bg-card border border-border hover:border-yellow-500 hover:border-opacity-50 transition-all duration-500 hover:scale-105 ${
                    isVisible["animate-stats"]
                      ? "animate-scale-in"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full border border-yellow-500">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Device Demo Section with Image */}
        <section id="demo" className="px-6 py-32 relative overflow-hidden">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Your APIs, Your Way</h2>
            <p className="text-muted-foreground text-lg mb-16">
              Design, manage, and monitor APIs with a platform built for
              developers
            </p>

            <div
              ref={deviceRef}
              className="relative mx-auto max-w-4xl"
              style={{
                transform: `perspective(1000px) rotateX(${
                  15 - deviceRotation
                }deg) scale(${deviceScale})`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="relative p-1 rounded-2xl bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 animate-gradient-x">
                <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="/dashboard-preview.png"
                    alt="Smaapi Dashboard Preview"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div id="animate-features" className="text-center mb-16">
              <h2
                className={`text-4xl font-bold mb-4 ${
                  isVisible["animate-features"]
                    ? "animate-slide-up"
                    : "opacity-0"
                }`}
              >
                The Future of API Development
              </h2>
              <p
                className={`text-muted-foreground text-lg ${
                  isVisible["animate-features"]
                    ? "animate-slide-up"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                Get ready to build APIs faster and smarter than ever before
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  id={`animate-feature-${index}`}
                  className={`group p-6 rounded-lg border border-border bg-card hover:border-yellow-500 hover:border-opacity-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                    isVisible[`animate-feature-${index}`]
                      ? "animate-scale-in"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="mb-4 p-3 rounded-lg border border-yellow-500 w-fit transition-all duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl blur-md opacity-3 animate-pulse"></div>
              <div className="relative p-8 rounded-2xl border border-border bg-card shadow-lg">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto border border-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Don’t Miss the Launch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Smaapi is coming to revolutionize API development. Join the
                  waitlist for exclusive early access and be part of the future.
                </p>

                {isSubmitted ? (
                  <div className="p-6 rounded-lg bg-yellow-500/10 border border-yellow-500/20 animate-slide-up">
                    <p className="text-white font-semibold">
                      🎉 Thank you for joining the waitlist with {email}!
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Stay tuned for exclusive updates and early access details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        required
                      />
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap"
                      >
                        Join Waitlist
                      </button>
                    </div>
                  </form>
                )}

                <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-yellow-500" />
                    Free beta access
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-yellow-500" />
                    Early features
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-yellow-500" />
                    Launch perks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-border bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-6 h-6  flex items-center justify-center">
                  <img src="/smaapi-logo.svg" alt="logo"></img>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Smaapi
                </span>
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <a
                  href="#"
                  className="hover:text-foreground transition-colors hover:scale-105"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="hover:text-foreground transition-colors hover:scale-105"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="hover:text-foreground transition-colors hover:scale-105"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Smaapi. All rights reserved. Get
              ready for the future of API development.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoonPage;
