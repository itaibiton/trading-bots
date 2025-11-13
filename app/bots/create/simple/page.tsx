/**
 * Simple Mode (AI-Guided) Bot Creation Page
 * Split-screen layout: Preview (35%) | Chat (65%)
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/bot-creation/simple/ChatInterface';
import { BotPreview } from '@/components/bot-creation/simple/BotPreview';
import { RiskLevel, StrategyType } from '@/types/bot';
import { toast } from 'sonner';

export default function SimpleBotCreationPage() {
  const router = useRouter();
  const [previewData, setPreviewData] = useState<{
    goal?: string;
    risk?: RiskLevel;
    capital?: number;
    strategy?: StrategyType;
  }>({});

  /**
   * Handle preview data updates from chat
   */
  const handleDataUpdate = (data: Partial<typeof previewData>) => {
    setPreviewData((prev) => ({ ...prev, ...data }));
  };

  /**
   * Handle navigation back to mode selection
   */
  const handleBack = () => {
    router.push('/bots/create');
  };

  /**
   * Handle bot creation completion
   */
  const handleComplete = async (conversationData: any) => {
    try {
      // Update preview with final data
      setPreviewData({
        goal: conversationData.goal,
        risk: conversationData.risk,
        capital: conversationData.capital,
        strategy: conversationData.recommendedStrategy,
      });

      // TODO: In Phase 2, make API call to create bot
      // For now, simulate success
      toast.success('Bot created successfully!', {
        description: 'Your trading bot has been created and is ready to use.',
      });

      // Navigate to bot details page (will be implemented in Phase 2)
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error creating bot:', error);
      toast.error('Failed to create bot', {
        description: 'Please try again or contact support if the issue persists.',
      });
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Create Bot - AI Guided</h1>
        <p className="text-muted-foreground mt-1">
          Answer a few questions and let our AI recommend the perfect strategy for you.
        </p>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-6 h-[calc(100vh-12rem)]">
        {/* Left Side - Bot Preview (35%) */}
        <div className="order-2 lg:order-1 h-full min-h-[400px] lg:min-h-0">
          <BotPreview
            goal={previewData.goal}
            risk={previewData.risk}
            capital={previewData.capital}
            strategy={previewData.strategy}
          />
        </div>

        {/* Right Side - Chat Interface (65%) */}
        <div className="order-1 lg:order-2 h-full min-h-[600px] lg:min-h-0">
          <ChatInterface
            onBack={handleBack}
            onComplete={handleComplete}
            onDataUpdate={handleDataUpdate}
          />
        </div>
      </div>
    </div>
  );
}
