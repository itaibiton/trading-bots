"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, TrendingUp, Activity, ShieldCheck, ArrowRight, Bot, Settings, BarChart3, Wallet, Globe, Laptop, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

gsap.registerPlugin(ScrollTrigger);

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link
    href={href}
    className={cn("text-sm font-medium text-muted-foreground hover:text-cyan-400 transition-colors relative group", className)}
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
  </Link>
);

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(2, 6, 23, 0.8)", // slate-950/80
        backdropFilter: "blur(16px)",
        borderBottomColor: "rgba(34, 211, 238, 0.1)", // cyan-400/10
        paddingTop: "1rem",
        paddingBottom: "1rem",
        duration: 0.3,
      });
    } else {
      gsap.to(navRef.current, {
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        borderBottomColor: "transparent",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        duration: 0.3,
      });
    }
  }, [scrolled]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 border-b border-transparent transition-all duration-300"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <Bot size={24} strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
          NovaTrade<span className="text-cyan-400">Bot</span>
        </span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#how-it-works">How It Works</NavLink>
        <NavLink href="#pricing">Pricing</NavLink>
        <NavLink href="#backtesting">Backtesting</NavLink>
        <NavLink href="#docs">Docs</NavLink>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-slate-800">
          Log In
        </Button>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-5 py-2.5"
        >
          <span className="text-sm font-bold">Get Started</span>
          <ArrowRight size={16} />
        </HoverBorderGradient>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-slate-950 border-l-slate-900 text-white">
            <SheetTitle className="text-white mb-8 flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <Bot size={18} className="text-white" />
              </div>
              NovaTrade Bot
            </SheetTitle>
            <div className="flex flex-col gap-6 mt-10">
              <NavLink href="#features" className="text-lg">Features</NavLink>
              <NavLink href="#how-it-works" className="text-lg">How It Works</NavLink>
              <NavLink href="#pricing" className="text-lg">Pricing</NavLink>
              <NavLink href="#backtesting" className="text-lg">Backtesting</NavLink>
              <div className="h-px bg-slate-800 my-2" />
              <Button variant="ghost" className="justify-start text-lg px-0 text-slate-300">Log In</Button>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold">Get Started</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

const DeviceMockup = ({
  type,
  className,
  children,
}: {
  type: 'laptop' | 'phone' | 'tablet',
  className?: string,
  children: React.ReactNode,
}) => {
  return (
    <div className={cn("relative device-frame", className)} data-type={type}>
      {/* Device Frame */}
      <div className={cn(
        "relative overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl w-full h-full",
        type === 'laptop' && "rounded-xl border-b-[6px] border-b-slate-800",
        type === 'phone' && "rounded-[2.5rem] border-4 border-slate-800",
        type === 'tablet' && "rounded-2xl border-4 border-slate-800"
      )}>
        {/* Glassy Reflection */}
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none z-10" />

        {/* Screen Content */}
        <div className="relative z-0 h-full w-full bg-slate-900/50 backdrop-blur-sm p-2 sm:p-4 overflow-hidden">
          {children}
        </div>
      </div>

      {/* Glow Effect */}
      <div className={cn(
        "absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-blue-600/20 rounded-xl blur-xl -z-10 opacity-0",
        type === 'phone' && "rounded-[2.5rem]",
        type === 'tablet' && "rounded-2xl"
      )} />
    </div>
  );
};

// Simple utility to split text into words for animation
const WordSplit = ({ children, className }: { children: string; className?: string }) => (
  <span className={className}>
    {children.split(" ").map((word, i) => (
      <span key={i} className="inline-block mr-[0.25em] word-split opacity-0 translate-y-4">
        {word}
      </span>
    ))}
  </span>
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featureTextRef = useRef<HTMLDivElement>(null);
  const deviceContainerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial Entrance (Text & Stacked Devices)
      tl.fromTo("#hero-eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
      )
        .fromTo("#hero-headline",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo("#hero-subheadline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.2"
        )
        .fromTo("#hero-trust",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        )
        .fromTo(deviceContainerRef.current,
          { opacity: 0, y: "50vh" }, // Start pushed down to peek
          { opacity: 1, y: "50vh", duration: 1 }, // Stay at peek position
          "-=0.5"
        );

      // Scroll Triggered Animation
      // This controls the pinning and the "unstacking" of the devices
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500", // Increased scroll distance for the 2-stage animation
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // --- STAGE 1: Transition from Hero to Feature Section ---

      // 1. Fade out hero text and move it up
      scrollTl.to(textRef.current, {
        y: -50,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
      });

      // 2. Move device container up to center (simultaneously)
      // Moves from peek position to center screen (y: 0)
      scrollTl.to(deviceContainerRef.current, {
        y: "8vh",
        scale: 1.1,
        duration: 0.8,
      }, "<");

      // --- STAGE 2: Reveal New Title Block ---

      // 3. Fade in new title block (staggered)
      scrollTl.to(featureTextRef.current, {
        opacity: 1,
        duration: 0.1
      }, "-=0.2");

      scrollTl.to("#feature-eyebrow", {
        y: 0,
        opacity: 1,
        duration: 0.5,
      }, "<");

      scrollTl.to(".word-split", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
      }, "-=0.3");

      scrollTl.to("#feature-subheadline", {
        opacity: 1,
        duration: 0.8,
      }, "-=0.4");


      // --- STAGE 3: Unstack Devices ---

      // 4. Unstack devices (happens alongside text reveal or slightly after)
      scrollTl.to(laptopRef.current, {
        x: 0,
        y: 30, // Reduced push down
        scale: 1,
        duration: 1,
      }, "-=0.8");

      scrollTl.to(phoneRef.current, {
        x: -380,
        y: 50, // Reduced push down
        scale: 0.9,
        rotationY: 15,
        duration: 1,
        z: 50, // Move phone in front
      }, "<");

      scrollTl.to(tabletRef.current, {
        x: 380,
        y: 50, // Reduced push down
        scale: 0.9,
        rotationY: -15,
        duration: 1,
        z: 50, // Move tablet in front
      }, "<");


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-slate-100"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 opacity-40 pointer-events-none" />

      {/* Main Content Wrapper */}
      <div ref={contentRef} className="container max-w-6xl mx-auto h-full relative">

        {/* STAGE 1: Hero Text Content - Perfectly Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <div ref={textRef} className="text-center max-w-3xl mx-auto relative z-20 origin-center pointer-events-auto">
            <div id="hero-eyebrow" className="inline-flex items-center justify-center gap-2 mb-6">
              <div className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Globe size={12} />
                Automated Crypto Trading · 24/7 · Multi-Exchange
              </div>
            </div>

            <h1 id="hero-headline" className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-transparent bg-clip-text bg-linear-to-b from-white via-white to-slate-400">
              Let NovaTrade Bot Trade the Markets While You <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">Sleep</span>.
            </h1>

            <p id="hero-subheadline" className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Design bots in minutes, backtest strategies, and let our AI handle execution with built-in risk controls.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-8">
              <Button
                size="lg"
                className="hero-cta h-14 px-8 w-full sm:w-auto text-base bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all hover:scale-105"
              >
                Start Trading in Minutes
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hero-cta h-14 px-8 w-full sm:w-auto text-base border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800/50 hover:border-cyan-500/30 rounded-full backdrop-blur-sm transition-all"
              >
                Try Demo Mode
              </Button>
            </div>

            <div id="hero-trust" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                No credit card required
              </span>
              <span className="hidden sm:inline text-slate-800">•</span>
              <span>Backtest on historical data</span>
              <span className="hidden sm:inline text-slate-800">•</span>
              <span>Works with Binance, Bybit & more</span>
            </div>
          </div>
        </div>

        {/* STAGE 2: Feature Section Title (Initially Hidden) */}
        <div
          ref={featureTextRef}
          className="absolute top-[12%] left-0 w-full text-center z-30 opacity-0 pointer-events-none"
        >
          <div id="feature-eyebrow" className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 opacity-0 translate-y-4">
            Cross-Platform Control
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            <WordSplit>Trade Smarter on Every Screen.</WordSplit>
          </h2>
          <p id="feature-subheadline" className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground opacity-0">
            Your bots, your data, your profits — wherever you are. NovaTrade Bot gives you a powerful interface across devices for full visibility and control.
          </p>
        </div>

        {/* Device Illustration Cluster - Initially Stacked at Bottom Peek */}
        <div
          ref={deviceContainerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-[400px] perspective-[2000px] flex items-center justify-center z-30"
          style={{ transformStyle: "preserve-3d" }}
        >

          {/* Laptop (Center - Bottom of Stack initially) */}
          <div
            ref={laptopRef}
            className="absolute w-[80%] z-10 origin-center"
            style={{ transform: "scale(0.8) translateY(50px)" }} // Initial stacked state
          >
            <DeviceMockup type="laptop" className="aspect-16/10">
              {/* Fake Bot Panel UI */}
              <div className="h-full flex flex-col">
                <div className="h-8 border-b border-slate-800 flex items-center px-4 gap-2 bg-slate-900/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center text-[10px] text-slate-500 font-mono">NovaTrade Bot - Strategy Designer</div>
                </div>
                <div className="flex-1 p-4 grid grid-cols-12 gap-4">
                  {/* Sidebar */}
                  <div className="col-span-3 border-r border-slate-800 pr-4 space-y-4 hidden sm:block">
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Strategy</div>
                      <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded text-xs text-cyan-400 font-medium">Momentum Alpha</div>
                      <div className="p-2 hover:bg-slate-800/50 rounded text-xs text-slate-400">Mean Reversion</div>
                    </div>
                  </div>
                  {/* Main Area */}
                  <div className="col-span-12 sm:col-span-9 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white">ETH/USDT Grid</h3>
                        <p className="text-[10px] text-slate-400">Running • 12 Active Orders</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded border border-emerald-500/20">Active</div>
                        <Settings size={14} className="text-slate-500" />
                      </div>
                    </div>
                    {/* Chart Area Mock */}
                    <div className="h-32 bg-linear-to-b from-slate-800/20 to-transparent rounded border border-slate-800 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-end px-2 pb-2 gap-1">
                        {[40, 60, 45, 70, 65, 80, 55, 90, 85, 100, 95, 110, 100, 80, 60].map((h, i) => (
                          <div key={i} className="flex-1 bg-cyan-500/20 rounded-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                      {/* Line */}
                      <div className="absolute inset-0">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                          <path d="M0,100 C20,80 40,90 60,40 S100,20 140,10" fill="none" stroke="#22d3ee" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        </svg>
                      </div>
                    </div>
                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-800/30 rounded border border-slate-800">
                        <div className="text-[10px] text-slate-500">Upper Limit</div>
                        <div className="text-xs font-mono text-white">3,450.00 USDT</div>
                      </div>
                      <div className="p-3 bg-slate-800/30 rounded border border-slate-800">
                        <div className="text-[10px] text-slate-500">Lower Limit</div>
                        <div className="text-xs font-mono text-white">3,100.00 USDT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DeviceMockup>
          </div>

          {/* Phone (Left - Stacked initially) */}
          <div
            ref={phoneRef}
            className="absolute w-[25%] z-30 origin-center"
            style={{ transform: "scale(0.6) translateX(-80px) translateY(80px)" }}
          >
            <DeviceMockup type="phone" className="aspect-9/19">
              <div className="h-full flex flex-col space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-bold">Portfolio</div>
                  <Wallet size={12} className="text-slate-400" />
                </div>
                <div className="text-center py-2">
                  <div className="text-[10px] text-slate-400">Total Balance</div>
                  <div className="text-lg font-bold text-white">$12,450</div>
                  <div className="text-xs text-emerald-400">+3.47%</div>
                </div>
                <div className="space-y-2">
                  {[
                    { s: 'BTC', p: '+1.2%', c: 'text-emerald-400' },
                    { s: 'ETH', p: '-0.5%', c: 'text-rose-400' },
                    { s: 'SOL', p: '+4.1%', c: 'text-emerald-400' }
                  ].map((coin, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-slate-800/40 rounded-lg border border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[8px]">{coin.s[0]}</div>
                        <span className="text-xs font-bold">{coin.s}</span>
                      </div>
                      <span className={cn("text-xs", coin.c)}>{coin.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </DeviceMockup>
          </div>

          {/* Tablet (Right - Stacked initially) */}
          <div
            ref={tabletRef}
            className="absolute w-[35%] z-30 origin-center"
            style={{ transform: "scale(0.6) translateX(80px) translateY(60px)" }}
          >
            <DeviceMockup type="tablet" className="aspect-4/3 md:aspect-3/4 lg:aspect-4/3">
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <BarChart3 size={12} className="text-cyan-400" />
                    Performance
                  </h4>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>
                </div>
                <div className="flex-1 flex items-end gap-2 pb-2 px-1">
                  {[30, 50, 45, 70, 90, 65, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm relative group cursor-pointer hover:bg-blue-500/40 transition-colors" style={{ height: `${h}%` }}>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
                        ${h * 120}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-2 bg-slate-800/30 rounded border border-slate-800">
                    <div className="text-[8px] text-slate-500 uppercase">Win Rate</div>
                    <div className="text-sm font-bold text-white">68.5%</div>
                  </div>
                  <div className="p-2 bg-slate-800/30 rounded border border-slate-800">
                    <div className="text-[8px] text-slate-500 uppercase">Profit Factor</div>
                    <div className="text-sm font-bold text-white">2.14</div>
                  </div>
                </div>
              </div>
            </DeviceMockup>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function LandingHero() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      <Navbar />
      <HeroSection />
    </div>
  );
}
