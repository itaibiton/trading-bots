/**
 * Bot Creation Hook
 * Manages state for the bot creation flow across all modes
 */

'use client';

import { useState, useCallback } from 'react';
import { BotCreationData, BotCreationStep, ValidationError, RiskLevel, StrategyType } from '@/types/bot';

export interface UseBotCreationOptions {
  mode: 'template' | 'ai' | 'pro';
  onComplete?: (data: BotCreationData) => void;
}

export interface UseBotCreationReturn {
  // State
  formData: Partial<BotCreationData>;
  currentStep: number;
  steps: BotCreationStep[];
  validationErrors: ValidationError[];
  isValid: boolean;

  // Actions
  updateFormData: (data: Partial<BotCreationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  validateStep: (step: number) => boolean;
  reset: () => void;
  submit: () => Promise<void>;
}

/**
 * Default form data
 */
const defaultFormData: Partial<BotCreationData> = {
  tradingMode: 'paper', // Always default to paper trading
  strategyParams: {},
};

/**
 * Step definitions for template mode
 */
const templateSteps: BotCreationStep[] = [
  {
    id: 1,
    title: 'Choose Strategy',
    description: 'Select a trading strategy template',
    isComplete: false,
    isActive: true,
  },
  {
    id: 2,
    title: 'Configure Trading',
    description: 'Set trading pair and capital',
    isComplete: false,
    isActive: false,
  },
  {
    id: 3,
    title: 'Set Risk Controls',
    description: 'Define risk management rules',
    isComplete: false,
    isActive: false,
  },
  {
    id: 4,
    title: 'Review & Create',
    description: 'Confirm your bot configuration',
    isComplete: false,
    isActive: false,
  },
];

/**
 * Step definitions for AI mode
 */
const aiSteps: BotCreationStep[] = [
  {
    id: 1,
    title: 'Chat with AI',
    description: 'Answer questions about your goals',
    isComplete: false,
    isActive: true,
  },
  {
    id: 2,
    title: 'Review Recommendation',
    description: 'Check AI-suggested configuration',
    isComplete: false,
    isActive: false,
  },
  {
    id: 3,
    title: 'Adjust Settings',
    description: 'Fine-tune if needed',
    isComplete: false,
    isActive: false,
  },
  {
    id: 4,
    title: 'Create Bot',
    description: 'Deploy your trading bot',
    isComplete: false,
    isActive: false,
  },
];

/**
 * Step definitions for pro mode
 */
const proSteps: BotCreationStep[] = [
  {
    id: 1,
    title: 'Basic Configuration',
    description: 'Name, strategy, and trading pair',
    isComplete: false,
    isActive: true,
  },
  {
    id: 2,
    title: 'Strategy Parameters',
    description: 'Configure strategy-specific settings',
    isComplete: false,
    isActive: false,
  },
  {
    id: 3,
    title: 'Risk Management',
    description: 'Advanced risk controls',
    isComplete: false,
    isActive: false,
  },
  {
    id: 4,
    title: 'Backtest',
    description: 'Test strategy with historical data',
    isComplete: false,
    isActive: false,
  },
  {
    id: 5,
    title: 'Deploy',
    description: 'Review and create bot',
    isComplete: false,
    isActive: false,
  },
];

/**
 * Bot Creation Hook
 */
export function useBotCreation({ mode, onComplete }: UseBotCreationOptions): UseBotCreationReturn {
  // Determine steps based on mode
  const getStepsByMode = () => {
    switch (mode) {
      case 'template':
        return templateSteps;
      case 'ai':
        return aiSteps;
      case 'pro':
        return proSteps;
      default:
        return templateSteps;
    }
  };

  // State
  const [formData, setFormData] = useState<Partial<BotCreationData>>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<BotCreationStep[]>(getStepsByMode());
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  /**
   * Update form data
   */
  const updateFormData = useCallback((data: Partial<BotCreationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  /**
   * Validate a specific step
   */
  const validateStep = useCallback(
    (step: number): boolean => {
      const errors: ValidationError[] = [];

      // Template Mode Validation
      if (mode === 'template') {
        if (step === 1) {
          if (!formData.strategyId) {
            errors.push({ field: 'strategyId', message: 'Please select a strategy' });
          }
        }

        if (step === 2) {
          if (!formData.tradingPair) {
            errors.push({ field: 'tradingPair', message: 'Please select a trading pair' });
          }
          if (!formData.capitalAllocated || formData.capitalAllocated < 10) {
            errors.push({ field: 'capitalAllocated', message: 'Capital must be at least $10' });
          }
        }

        if (step === 3) {
          if (!formData.riskLevel) {
            errors.push({ field: 'riskLevel', message: 'Please select a risk level' });
          }
          if (
            formData.stopLossPercentage === undefined ||
            formData.stopLossPercentage < 1 ||
            formData.stopLossPercentage > 50
          ) {
            errors.push({ field: 'stopLossPercentage', message: 'Stop loss must be between 1% and 50%' });
          }
          if (
            formData.takeProfitPercentage === undefined ||
            formData.takeProfitPercentage < 1 ||
            formData.takeProfitPercentage > 100
          ) {
            errors.push({ field: 'takeProfitPercentage', message: 'Take profit must be between 1% and 100%' });
          }
        }
      }

      // AI Mode Validation
      if (mode === 'ai') {
        if (step === 2) {
          if (!formData.strategyType) {
            errors.push({ field: 'strategyType', message: 'AI must recommend a strategy first' });
          }
        }
      }

      // Pro Mode Validation
      if (mode === 'pro') {
        if (step === 1) {
          if (!formData.name || formData.name.trim().length < 3) {
            errors.push({ field: 'name', message: 'Bot name must be at least 3 characters' });
          }
          if (!formData.strategyType) {
            errors.push({ field: 'strategyType', message: 'Please select a strategy type' });
          }
          if (!formData.tradingPair) {
            errors.push({ field: 'tradingPair', message: 'Please select a trading pair' });
          }
        }
      }

      setValidationErrors(errors);
      return errors.length === 0;
    },
    [mode, formData]
  );

  /**
   * Check if current form data is valid
   */
  const isValid = validationErrors.length === 0;

  /**
   * Move to next step
   */
  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      const newSteps = steps.map((step) => ({
        ...step,
        isComplete: step.id === currentStep ? true : step.isComplete,
        isActive: step.id === currentStep + 1,
      }));

      setSteps(newSteps);
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  }, [currentStep, steps, validateStep]);

  /**
   * Move to previous step
   */
  const prevStep = useCallback(() => {
    const newSteps = steps.map((step) => ({
      ...step,
      isActive: step.id === currentStep - 1,
    }));

    setSteps(newSteps);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, [currentStep, steps]);

  /**
   * Go to specific step
   */
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= steps.length) {
        const newSteps = steps.map((s) => ({
          ...s,
          isActive: s.id === step,
        }));

        setSteps(newSteps);
        setCurrentStep(step);
      }
    },
    [steps]
  );

  /**
   * Reset form
   */
  const reset = useCallback(() => {
    setFormData(defaultFormData);
    setCurrentStep(1);
    setSteps(getStepsByMode());
    setValidationErrors([]);
  }, [mode]);

  /**
   * Submit form
   */
  const submit = useCallback(async () => {
    // Validate all required fields
    const finalErrors: ValidationError[] = [];

    if (!formData.name) {
      finalErrors.push({ field: 'name', message: 'Bot name is required' });
    }
    if (!formData.strategyType && !formData.strategyId) {
      finalErrors.push({ field: 'strategy', message: 'Strategy is required' });
    }
    if (!formData.tradingPair) {
      finalErrors.push({ field: 'tradingPair', message: 'Trading pair is required' });
    }
    if (!formData.capitalAllocated || formData.capitalAllocated < 10) {
      finalErrors.push({ field: 'capitalAllocated', message: 'Valid capital amount is required' });
    }
    if (!formData.riskLevel) {
      finalErrors.push({ field: 'riskLevel', message: 'Risk level is required' });
    }

    if (finalErrors.length > 0) {
      setValidationErrors(finalErrors);
      throw new Error('Validation failed');
    }

    // Call completion callback with validated data
    if (onComplete) {
      onComplete(formData as BotCreationData);
    }
  }, [formData, onComplete]);

  return {
    // State
    formData,
    currentStep,
    steps,
    validationErrors,
    isValid,

    // Actions
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    validateStep,
    reset,
    submit,
  };
}

/**
 * Hook for managing AI conversation state
 */
export function useAIConversation() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationData, setConversationData] = useState<{
    goal?: string;
    risk?: RiskLevel;
    capital?: number;
    recommendedStrategy?: StrategyType;
  }>({});

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role,
        content,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  const updateConversationData = useCallback((data: Partial<typeof conversationData>) => {
    setConversationData((prev) => ({ ...prev, ...data }));
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setConversationData({});
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    conversationData,
    addMessage,
    updateConversationData,
    setIsLoading,
    reset,
  };
}
