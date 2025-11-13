"use client";

/**
 * Bot Creation Mode Selection Page
 *
 * Beautiful, interactive mode selection screen with:
 * - Simple Mode (AI Guided) - Recommended for beginners
 * - Pro Mode (Advanced) - Full control for experienced users
 * - Comparison table showing key differences
 * - Smooth animations and hover effects
 * - Mobile responsive design
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Check, Sparkles, Zap } from 'lucide-react';

/**
 * Animation variants for cards
 * Cards slide in from left and right with stagger effect
 */
const cardVariants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -50 : 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

/**
 * Animation variants for list items
 * Fade in with slight slide up effect
 */
const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
    },
  }),
};

export default function CreateBotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Create Your Trading Bot
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your creation method and start trading in minutes
            </p>
          </motion.div>

          {/* Mode Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Simple Mode Card */}
            <motion.div
              custom="left"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/bots/create/simple" className="block h-full">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden group cursor-pointer">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="relative">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl md:text-6xl flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <Badge variant="secondary" className="shadow-sm">
                        Recommended for Beginners
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl mb-2">Simple Mode - AI Guided</CardTitle>
                    <CardDescription className="text-base">
                      Let our AI assistant guide you through creating the perfect bot for your goals
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    {/* Feature List */}
                    <ul className="space-y-3">
                      {[
                        'Chat with AI assistant',
                        'Guided strategy selection',
                        'Automatic risk management',
                        'Ready in 5 minutes',
                      ].map((feature, index) => (
                        <motion.li
                          key={feature}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={listItemVariants}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-foreground/90">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button size="lg" className="w-full group/button shadow-sm">
                      Start with AI
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Pro Mode Card */}
            <motion.div
              custom="right"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/bots/create/pro" className="block h-full">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden group cursor-pointer">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="relative">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl md:text-6xl flex items-center justify-center w-16 h-16 rounded-xl bg-accent/10 group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-8 h-8 text-foreground" />
                      </div>
                      <Badge variant="outline" className="shadow-sm">
                        Full Control
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl mb-2">Pro Mode - Advanced</CardTitle>
                    <CardDescription className="text-base">
                      Configure every aspect of your trading bot with advanced tools and analytics
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    {/* Feature List */}
                    <ul className="space-y-3">
                      {[
                        'Full parameter control',
                        'Advanced backtesting',
                        'Technical indicators',
                        'Performance analytics',
                      ].map((feature, index) => (
                        <motion.li
                          key={feature}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={listItemVariants}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-foreground" />
                          </div>
                          <span className="text-foreground/90">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button size="lg" variant="outline" className="w-full group/button shadow-sm">
                      Configure Manually
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>

          {/* Comparison Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Separator className="mb-8" />

            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Compare Modes</h2>
              <p className="text-sm text-muted-foreground">
                Choose the mode that best fits your experience level
              </p>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">Simple Mode</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">Pro Mode</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">Setup Time</td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">~5 minutes</td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">15-30 minutes</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">AI Guidance</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-500" />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">Optional</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">Customization</td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">Basic</td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">Full</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">Technical Knowledge</td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">Not required</td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">Recommended</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">Best For</td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">Beginners</td>
                        <td className="px-6 py-4 text-center text-sm text-muted-foreground">Experienced traders</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-muted-foreground">
                All bots start with paper trading for safe testing.{' '}
                <span className="font-medium text-foreground">You can always switch modes later.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
