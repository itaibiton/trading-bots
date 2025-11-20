/**
 * Simple Mode (AI-Guided) Bot Creation Page
 * Split-screen layout: Chat (60%) | Preview (40%)
 */

'use client';

import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/bot-creation/simple/ChatInterface';
import { BotPreview } from '@/components/bot-creation/simple/BotPreview';
import { useAIConversation } from '@/hooks/useAIConversation';
import { SuccessCelebration } from '@/components/bot-creation/SuccessCelebration';
import { useState } from 'react';
import type { RiskLevel, StrategyType } from '@/types/bot';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SimpleBotCreationPage() {
  const router = useRouter();
  const {
    messages,
    currentConfig,
    currentStep,
    isComplete,
    readyToDeploy,
    isLoading,
    tradingGoal,
    experienceLevel,
    riskTolerance,
    sendMessage,
    restart,
    deployBot,
  } = useAIConversation();

  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Handle navigation back to mode selection
   */
  const handleBack = () => {
    router.push('/bots/create');
  };

  /**
   * Handle bot deployment
   */
  const handleDeploy = async () => {
    await deployBot();
    setShowSuccess(true);
  };

  /**
   * Handle viewing bot after creation
   */
  const handleViewBot = () => {
    router.push('/dashboard/bots');
  };

  /**
   * Handle creating another bot
   */
  const handleCreateAnother = async () => {
    setShowSuccess(false);
    await restart();
  };

  // Extract preview data from conversation state and config
  const previewData = {
    goal: tradingGoal,
    risk: currentConfig.riskLevel as RiskLevel | undefined,
    capital: currentConfig.capitalAllocated,
    strategy: currentConfig.strategyType as StrategyType | undefined,
  };

  return (
    <div className="spacye-y-6">
      {/* Page Title */}
      <div className="mb-6">
        < Breadcrumb className="mb-4" >
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Bot</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </ Breadcrumb>
        <h1 className="text-3xl font-bold text-foreground">Create Bot - AI Guided</h1>
        <p className="text-muted-foreground mt-1">
          Chat with our AI assistant to create the perfect trading bot for your goals
        </p>
      </div >

      {/* Split Screen Layout */}
      < div className="grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-6 h-[calc(100vh-12rem)]" >
        {/* Chat Interface (60%) */}
        < div className="h-full min-h-[600px] lg:min-h-0" >
          <ChatInterface
            messages={messages}
            currentStep={currentStep}
            isLoading={isLoading}
            onSendMessage={sendMessage}
            onRestart={restart}
            onBack={handleBack}
          />
        </ div>

        {/* Bot Preview (40%) */}
        < div className="h-full min-h-[400px] lg:min-h-0" >
          <BotPreview
            goal={previewData.goal}
            risk={previewData.risk}
            capital={previewData.capital}
            strategy={previewData.strategy}
            currentStep={currentStep}
          />

          {/* Deploy Button (shown when ready) */}
          {
            readyToDeploy && (
              <div className="mt-4">
                <button
                  onClick={handleDeploy}
                  disabled={isLoading}
                  className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Deploying...' : 'Deploy Bot 🚀'}
                </button>
              </div>
            )
          }
        </ div>
      </div >

      {/* Success Celebration Modal */}
      {
        showSuccess && (
          <SuccessCelebration
            isOpen={showSuccess}
            onClose={() => setShowSuccess(false)}
            botData={{
              name: currentConfig.name || 'My Trading Bot',
              strategyType: currentConfig.strategyType || 'dca',
              riskLevel: currentConfig.riskLevel || 'medium',
              capitalAllocated: currentConfig.capitalAllocated || 1000,
              botId: 'new-bot', // Will be set after deployment
            }}
            onViewBot={handleViewBot}
            onCreateAnother={handleCreateAnother}
          />
        )
      }
    </div >
  );
}
