"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, Bot, TrendingUp, Shield } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import StarBorder from "../StarBorder";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
// 3D Card Component for the visual element
const TradingCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Invert X axis for natural feel
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="perspective-1000 w-full max-w-md mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative w-full aspect-4/3 rounded-xl bg-linear-to-br from-neutral-900 to-neutral-950 border border-white/10 shadow-2xl transition-transform duration-200 ease-out overflow-hidden"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Glow Effect */}
        <div
          className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            transform: "translateZ(1px)",
          }}
        />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="text-[10px] font-mono text-neutral-400">BOT-01.TSX</div>
        </div>

        {/* Content */}
        <div className="p-6 pt-16 space-y-4" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Bot size={20} />
              </div>
              <div>
                <div className="text-sm font-medium text-white">BTC/USDT DCA</div>
                <div className="text-xs text-neutral-400">Active • 4h 12m</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              +12.4%
            </Badge>
          </div>

          {/* Graph Placeholder */}
          <div className="h-24 w-full rounded bg-white/5 relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 right-0 h-[80%] flex items-end gap-1 px-2 pb-2">
              {[40, 60, 45, 70, 65, 85, 80, 95, 90, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/40 rounded-t-sm transition-all duration-500 group-hover:bg-primary/60"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="text-xs text-neutral-500 mb-1">Total Profit</div>
              <div className="text-lg font-semibold text-white">$1,240.50</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="text-xs text-neutral-500 mb-1">Trades</div>
              <div className="text-lg font-semibold text-white">24</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const float1Ref = useRef<HTMLDivElement>(null);
  const float2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Staggered text reveal
      tl.from(".reveal-text", {
        y: 100,
        skewY: 5,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      })
        .from(subHeadingRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.8")
        .from(ctaRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6");

      // Floating animations
      gsap.to(float1Ref.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(float2Ref.current, {
        y: -20,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background flex flex-col justify-center">
      <BackgroundLines className="absolute inset-0 w-full h-full -z-10">
        {/* We pass children to BackgroundLines but it renders them inside the z-10 container */}
        <div className="hidden"></div>
      </BackgroundLines>

      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 flex flex-col items-center">

        {/* Centered Content */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto mb-16">
          <Reveal>
            <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm border border-primary/20 bg-primary/10 text-primary backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: AI Strategy Generator
            </Badge>
          </Reveal>

          <div className="space-y-4 w-full">
            <h1 ref={headingRef} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
              <span className="inline-block overflow-hidden">
                <span className="inline-block reveal-text">Create Your</span>
              </span> <br />
              <span className="inline-block overflow-hidden">
                <span className="inline-block reveal-text text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-500 to-blue-500 animate-gradient bg-300%">
                  Trading Bot
                </span>
              </span>
              <br />
              <span className="inline-block overflow-hidden">
                <span className="inline-block reveal-text">in 5 Minutes</span>
              </span>
            </h1>

            <p ref={subHeadingRef} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI-powered trading automation. No coding required.
              <br className="hidden md:block" />
              Built-in risk management for peace of mind.
            </p>
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>Aceternity UI</span>
            </HoverBorderGradient>
            <Button>Watch Demo</Button>


          </div>

          <Reveal delay={0.4} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-neutral-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">1,000+</span> traders automating strategies
            </div>
          </Reveal>
        </div>

        {/* Visual Element - Centered */}
        <div className="relative flex items-center justify-center w-full">
          <div className="relative w-full max-w-[700px]">
            {/* Abstract background glow for the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/20 blur-[100px] rounded-full -z-10" />

            {/* Floating elements */}
            <div ref={float1Ref} className="absolute -top-4 -right-4 md:-top-12 md:-right-12 z-20">
              <div className="bg-background/80 backdrop-blur-md border border-border p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-full text-green-500">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Profit (24h)</div>
                  <div className="font-bold text-green-500">+$245.30</div>
                </div>
              </div>
            </div>

            <div ref={float2Ref} className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 z-20">
              <div className="bg-background/80 backdrop-blur-md border border-border p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-full text-blue-500">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Risk Level</div>
                  <div className="font-bold text-foreground">Low</div>
                </div>
              </div>
            </div>

            <Reveal delay={0.2} y={20}>
              <TradingCard />
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator moved out */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 opacity-50 z-20">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-linear-to-b from-transparent via-foreground to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
