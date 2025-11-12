'use client'

import * as React from 'react'
import { ComponentShowcase } from '../ComponentShowcase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Toggle } from '@/components/ui/toggle'
import {
  Mail,
  Lock,
  Search,
  Plus,
  Trash2,
  Download,
  Heart,
  Bold,
  Italic,
  Underline,
} from 'lucide-react'

/**
 * FormComponents - Comprehensive showcase of all form-related shadcn/ui components
 *
 * Displays all form components with their variants, states, and usage examples:
 * - Button (6 variants, 3 sizes + icon sizes)
 * - Input (default, disabled, with icons, error states)
 * - Textarea (default, disabled, resizable)
 * - Label (with form fields)
 * - Select (single select, disabled)
 * - Checkbox (checked, unchecked, indeterminate, disabled)
 * - Radio Group (multiple options, disabled)
 * - Switch (on/off, disabled)
 * - Slider (single value, range, disabled)
 * - Toggle (single, multiple)
 *
 * Each showcase demonstrates the component visually with clear labels
 * and realistic examples. Mobile-first responsive design.
 */
export default function FormComponents() {
  const [sliderValue, setSliderValue] = React.useState([50])
  const [rangeSliderValue, setRangeSliderValue] = React.useState([25, 75])

  return (
    <div className="space-y-8">
      {/* Button Variants */}
      <ComponentShowcase
        title="Button Variants"
        description="Six button variants for different actions and contexts"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Default
            </Label>
            <Button variant="default">Primary Action</Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Destructive
            </Label>
            <Button variant="destructive">Delete</Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Outline
            </Label>
            <Button variant="outline">Secondary</Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Secondary
            </Label>
            <Button variant="secondary">Secondary</Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Ghost
            </Label>
            <Button variant="ghost">Ghost</Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Link
            </Label>
            <Button variant="link">Link Button</Button>
          </div>
        </div>
      </ComponentShowcase>

      {/* Button Sizes */}
      <ComponentShowcase
        title="Button Sizes"
        description="Three standard sizes and three icon-specific sizes"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Small
            </Label>
            <Button size="sm">Small Button</Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Default
            </Label>
            <Button size="default">Default Button</Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Large
            </Label>
            <Button size="lg">Large Button</Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Icon Small
            </Label>
            <Button size="icon-sm" variant="outline">
              <Plus />
            </Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Icon Default
            </Label>
            <Button size="icon" variant="outline">
              <Heart />
            </Button>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground">
              Icon Large
            </Label>
            <Button size="icon-lg" variant="outline">
              <Download />
            </Button>
          </div>
        </div>
      </ComponentShowcase>

      {/* Buttons with Icons */}
      <ComponentShowcase
        title="Buttons with Icons"
        description="Buttons combined with icons for enhanced visual communication"
      >
        <div className="flex flex-wrap gap-4">
          <Button>
            <Plus />
            Add New
          </Button>
          <Button variant="destructive">
            <Trash2 />
            Delete
          </Button>
          <Button variant="outline">
            <Download />
            Download
          </Button>
          <Button variant="secondary">
            <Search />
            Search
          </Button>
        </div>
      </ComponentShowcase>

      {/* Button States */}
      <ComponentShowcase
        title="Button States"
        description="Disabled and loading states for all button variants"
      >
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Default</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="destructive" disabled>
            Disabled Destructive
          </Button>
        </div>
      </ComponentShowcase>

      {/* Input States */}
      <ComponentShowcase
        title="Input States"
        description="Various input field states and configurations"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="space-y-2">
            <Label htmlFor="email-input">Email Address</Label>
            <Input
              id="email-input"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-input">Password</Label>
            <Input
              id="password-input"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="disabled-input">Disabled Input</Label>
            <Input
              id="disabled-input"
              disabled
              placeholder="This input is disabled"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number-input">Number Input</Label>
            <Input
              id="number-input"
              type="number"
              placeholder="0"
              min="0"
              max="100"
            />
          </div>
        </div>
      </ComponentShowcase>

      {/* Input with Icons */}
      <ComponentShowcase
        title="Input with Icons"
        description="Input fields with icon prefixes for visual context"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="space-y-2">
            <Label htmlFor="email-icon">Email with Icon</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email-icon"
                type="email"
                placeholder="you@example.com"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-icon">Password with Icon</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password-icon"
                type="password"
                placeholder="Enter password"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-icon">Search with Icon</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="search-icon"
                type="search"
                placeholder="Search..."
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Textarea */}
      <ComponentShowcase
        title="Textarea"
        description="Multi-line text input with resizable and disabled states"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="space-y-2">
            <Label htmlFor="default-textarea">Default Textarea</Label>
            <Textarea
              id="default-textarea"
              placeholder="Enter your message here..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="disabled-textarea">Disabled Textarea</Label>
            <Textarea
              id="disabled-textarea"
              disabled
              placeholder="This textarea is disabled"
              rows={4}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="large-textarea">Large Textarea</Label>
            <Textarea
              id="large-textarea"
              placeholder="Write a detailed description..."
              rows={8}
            />
          </div>
        </div>
      </ComponentShowcase>

      {/* Select */}
      <ComponentShowcase
        title="Select"
        description="Dropdown selection component with single choice"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="space-y-2">
            <Label htmlFor="default-select">Choose a framework</Label>
            <Select>
              <SelectTrigger id="default-select">
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disabled-select">Disabled Select</Label>
            <Select disabled>
              <SelectTrigger id="disabled-select">
                <SelectValue placeholder="Cannot select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country-select">Country</Label>
            <Select>
              <SelectTrigger id="country-select">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size-select">Size</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="size-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="xlarge">X-Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentShowcase>

      {/* Checkbox */}
      <ComponentShowcase
        title="Checkbox"
        description="Multi-select options with checked, unchecked, and disabled states"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Basic Checkboxes</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox1" defaultChecked />
                <Label htmlFor="checkbox1" className="font-normal">
                  Checked by default
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox2" />
                <Label htmlFor="checkbox2" className="font-normal">
                  Unchecked
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox3" disabled />
                <Label htmlFor="checkbox3" className="font-normal opacity-50">
                  Disabled unchecked
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox4" disabled defaultChecked />
                <Label htmlFor="checkbox4" className="font-normal opacity-50">
                  Disabled checked
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">
              Checkbox with descriptions
            </Label>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms" className="font-normal">
                    Accept terms and conditions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="marketing" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="marketing" className="font-normal">
                    Marketing emails
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products and features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Radio Group */}
      <ComponentShowcase
        title="Radio Group"
        description="Single-select options organized in groups"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Choose a plan</Label>
            <RadioGroup defaultValue="pro">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="plan-free" />
                <Label htmlFor="plan-free" className="font-normal">
                  Free
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pro" id="plan-pro" />
                <Label htmlFor="plan-pro" className="font-normal">
                  Pro
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enterprise" id="plan-enterprise" />
                <Label htmlFor="plan-enterprise" className="font-normal">
                  Enterprise
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Payment method</Label>
            <RadioGroup defaultValue="card">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="card" id="payment-card" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="payment-card" className="font-normal">
                    Credit card
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Pay with Visa, Mastercard, or Amex
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="paypal" id="payment-paypal" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="payment-paypal" className="font-normal">
                    PayPal
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Pay using your PayPal account
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="bank" id="payment-bank" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="payment-bank" className="font-normal">
                    Bank transfer
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Direct transfer from your bank
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Disabled state</Label>
            <RadioGroup disabled defaultValue="option1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="disabled-1" />
                <Label htmlFor="disabled-1" className="font-normal opacity-50">
                  Disabled option 1
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="disabled-2" />
                <Label htmlFor="disabled-2" className="font-normal opacity-50">
                  Disabled option 2
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </ComponentShowcase>

      {/* Switch */}
      <ComponentShowcase
        title="Switch"
        description="Toggle switches for binary on/off settings"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Basic switches</Label>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="switch1" />
                <Label htmlFor="switch1" className="font-normal">
                  Airplane mode
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch2" defaultChecked />
                <Label htmlFor="switch2" className="font-normal">
                  Bluetooth (On by default)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch3" disabled />
                <Label htmlFor="switch3" className="font-normal opacity-50">
                  Disabled (Off)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch4" disabled defaultChecked />
                <Label htmlFor="switch4" className="font-normal opacity-50">
                  Disabled (On)
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">
              Switches with descriptions
            </Label>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5 flex-1">
                  <Label htmlFor="notifications" className="font-normal">
                    Push notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5 flex-1">
                  <Label htmlFor="security" className="font-normal">
                    Two-factor authentication
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch id="security" />
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Slider */}
      <ComponentShowcase
        title="Slider"
        description="Adjustable slider controls for numeric input"
      >
        <div className="space-y-8 max-w-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Volume</Label>
              <span className="text-sm text-muted-foreground">
                {sliderValue[0]}%
              </span>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Price range</Label>
              <span className="text-sm text-muted-foreground">
                ${rangeSliderValue[0]} - ${rangeSliderValue[1]}
              </span>
            </div>
            <Slider
              value={rangeSliderValue}
              onValueChange={setRangeSliderValue}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Disabled slider</Label>
            <Slider disabled defaultValue={[50]} max={100} step={1} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Risk level</Label>
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={25} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
              <span>Very High</span>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Toggle */}
      <ComponentShowcase
        title="Toggle"
        description="Toggle buttons for toolbar actions and formatting"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Single toggles</Label>
            <div className="flex flex-wrap gap-2">
              <Toggle aria-label="Toggle bold">
                <Bold />
              </Toggle>
              <Toggle aria-label="Toggle italic">
                <Italic />
              </Toggle>
              <Toggle aria-label="Toggle underline">
                <Underline />
              </Toggle>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Toggle variants</Label>
            <div className="flex flex-wrap gap-2">
              <Toggle variant="default" aria-label="Default toggle">
                <Bold />
              </Toggle>
              <Toggle variant="outline" aria-label="Outline toggle">
                <Italic />
              </Toggle>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Toggle sizes</Label>
            <div className="flex items-center flex-wrap gap-2">
              <Toggle size="sm" aria-label="Small toggle">
                <Bold />
              </Toggle>
              <Toggle size="default" aria-label="Default toggle">
                <Italic />
              </Toggle>
              <Toggle size="lg" aria-label="Large toggle">
                <Underline />
              </Toggle>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Disabled toggles</Label>
            <div className="flex flex-wrap gap-2">
              <Toggle disabled aria-label="Disabled toggle off">
                <Bold />
              </Toggle>
              <Toggle disabled defaultPressed aria-label="Disabled toggle on">
                <Italic />
              </Toggle>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Complete Form Example */}
      <ComponentShowcase
        title="Complete Form Example"
        description="A realistic form combining multiple components"
      >
        <div className="max-w-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="form-name">Full Name</Label>
              <Input id="form-name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-email">Email</Label>
              <Input id="form-email" type="email" placeholder="john@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-country">Country</Label>
            <Select>
              <SelectTrigger id="form-country">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-bio">Bio</Label>
            <Textarea
              id="form-bio"
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Preferences</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="form-newsletter" />
                <Label htmlFor="form-newsletter" className="font-normal">
                  Subscribe to newsletter
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="form-updates" />
                <Label htmlFor="form-updates" className="font-normal">
                  Receive product updates
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Account type</Label>
            <RadioGroup defaultValue="personal">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="form-personal" />
                <Label htmlFor="form-personal" className="font-normal">
                  Personal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="form-business" />
                <Label htmlFor="form-business" className="font-normal">
                  Business
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-start justify-between gap-4 pt-2">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="form-2fa" className="font-normal">
                Enable two-factor authentication
              </Label>
              <p className="text-sm text-muted-foreground">
                Recommended for enhanced security
              </p>
            </div>
            <Switch id="form-2fa" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}
