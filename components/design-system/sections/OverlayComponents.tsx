'use client'

import * as React from 'react'
import { ComponentShowcase } from '../ComponentShowcase'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Settings,
  User,
  LogOut,
  Plus,
  MoreVertical,
  ChevronRight,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Mail,
  MessageSquare,
  PlusCircle,
  UserPlus,
  Users,
  Info,
  HelpCircle,
  Menu,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'

/**
 * OverlayComponents - Comprehensive showcase of shadcn overlay components
 *
 * Demonstrates all overlay/modal components with interactive examples:
 * - Dialog (modals with different sizes and use cases)
 * - Sheet (slide-out panels from all directions)
 * - Popover (positioned popovers with forms)
 * - Tooltip (informational tooltips with various positions)
 * - DropdownMenu (complex menus with all features)
 */
export default function OverlayComponents() {
  const [position, setPosition] = React.useState('bottom')
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <div className="space-y-8">
      {/* Dialog Examples */}
      <ComponentShowcase
        title="Dialog"
        description="Modal dialogs for important user interactions. Includes simple dialogs, forms, and scrollable content."
      >
        <div className="flex flex-wrap gap-4">
          {/* Simple Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Simple Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog with Form */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Dialog with Form</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Scrollable Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Scrollable Dialog</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Terms and Conditions</DialogTitle>
                <DialogDescription>
                  Please read our terms and conditions carefully before proceeding.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
                <p>
                  Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
                  quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                  aut fugit, sed quia consequuntur magni dolores eos qui ratione.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline">Decline</Button>
                <Button>Accept</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Custom Size Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Large Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Bot</DialogTitle>
                <DialogDescription>
                  Configure your trading bot settings below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bot-name">Bot Name</Label>
                    <Input id="bot-name" placeholder="My Trading Bot" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="strategy">Strategy</Label>
                    <Input id="strategy" placeholder="DCA" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="investment">Investment</Label>
                    <Input id="investment" type="number" placeholder="1000" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="risk">Risk Level</Label>
                    <Input id="risk" placeholder="Medium" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Bot</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentShowcase>

      {/* Sheet Examples */}
      <ComponentShowcase
        title="Sheet"
        description="Slide-out panels from different sides of the screen. Perfect for navigation, filters, and side panels."
      >
        <div className="flex flex-wrap gap-4">
          {/* Sheet from Left */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="mr-2" />
                From Left
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Access all sections of your dashboard from here.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <LifeBuoy className="mr-2" />
                    Support
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sheet from Right */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                From Right
                <ChevronRight className="ml-2" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Bot Settings</SheetTitle>
                <SheetDescription>
                  Configure your trading bot parameters.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="sheet-name">Bot Name</Label>
                  <Input id="sheet-name" placeholder="Enter bot name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sheet-strategy">Strategy</Label>
                  <Input id="sheet-strategy" placeholder="Select strategy" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sheet-investment">Investment Amount</Label>
                  <Input
                    id="sheet-investment"
                    type="number"
                    placeholder="1000"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button>Save Changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Sheet from Top */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <ArrowUp className="mr-2" />
                From Top
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  You have 3 new notifications.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-3 py-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">New bot performance alert</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Trade executed successfully</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Risk threshold reached</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sheet from Bottom */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <ArrowDown className="mr-2" />
                From Bottom
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Quick Actions</SheetTitle>
                <SheetDescription>
                  Perform common actions quickly.
                </SheetDescription>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-4">
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <Plus className="size-6" />
                  <span className="text-xs">Create Bot</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <Settings className="size-6" />
                  <span className="text-xs">Settings</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <User className="size-6" />
                  <span className="text-xs">Profile</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <LifeBuoy className="size-6" />
                  <span className="text-xs">Help</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ComponentShowcase>

      {/* Popover Examples */}
      <ComponentShowcase
        title="Popover"
        description="Floating content panels positioned relative to trigger elements. Great for contextual information and forms."
      >
        <div className="flex flex-wrap gap-4">
          {/* Simple Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Info className="mr-2" />
                Show Info
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Bot Information</h4>
                <p className="text-sm text-muted-foreground">
                  This bot uses a Dollar Cost Averaging strategy with automated
                  risk management to execute trades safely.
                </p>
              </div>
            </PopoverContent>
          </Popover>

          {/* Popover with Form */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2" />
                Quick Settings
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Display Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust how information is displayed.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Popover positioned differently */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <HelpCircle className="mr-2" />
                Help
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Need Help?</h4>
                <p className="text-sm text-muted-foreground">
                  Check our documentation or contact support for assistance with
                  setting up your trading bots.
                </p>
                <div className="pt-2">
                  <Button size="sm" className="w-full">
                    View Documentation
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Popover with actions */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2" />
                Share
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Share this bot</h4>
                  <p className="text-sm text-muted-foreground">
                    Anyone with the link can view this bot configuration.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input readOnly value="https://tradingbot.com/bot/abc123" />
                  <Button size="sm" className="px-3">
                    Copy
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentShowcase>

      {/* Tooltip Examples */}
      <ComponentShowcase
        title="Tooltip"
        description="Informational tooltips that appear on hover. Shows helpful hints without cluttering the interface."
      >
        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            {/* Default Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Info className="mr-2" />
                  Default
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a default tooltip</p>
              </TooltipContent>
            </Tooltip>

            {/* Tooltip - Top */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <ArrowUp className="mr-2" />
                  Top
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Tooltip positioned on top</p>
              </TooltipContent>
            </Tooltip>

            {/* Tooltip - Right */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <ArrowRight className="mr-2" />
                  Right
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tooltip positioned on right</p>
              </TooltipContent>
            </Tooltip>

            {/* Tooltip - Bottom */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <ArrowDown className="mr-2" />
                  Bottom
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip positioned on bottom</p>
              </TooltipContent>
            </Tooltip>

            {/* Tooltip - Left */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <ArrowLeft className="mr-2" />
                  Left
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Tooltip positioned on left</p>
              </TooltipContent>
            </Tooltip>

            {/* Tooltip with Delay */}
            <Tooltip delayDuration={700}>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2" />
                  With Delay
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This tooltip appears after a delay</p>
              </TooltipContent>
            </Tooltip>

            {/* Complex Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <HelpCircle className="mr-2" />
                  Rich Content
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">Risk Management</p>
                  <p className="text-xs text-muted-foreground">
                    Set stop-loss and take-profit levels to protect your
                    investment
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Icon Only with Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Settings />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Settings</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </ComponentShowcase>

      {/* Dropdown Menu Examples */}
      <ComponentShowcase
        title="Dropdown Menu"
        description="Feature-rich dropdown menus with icons, shortcuts, checkboxes, radio groups, and sub-menus."
      >
        <div className="flex flex-wrap gap-4">
          {/* Simple Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <User className="mr-2" />
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown with Shortcuts */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Keyboard className="mr-2" />
                With Shortcuts
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="mr-2" />
                <span>New Bot</span>
                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown with Checkboxes */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2" />
                View Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Display Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown with Radio Group */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Position: {position}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown with Sub-menus */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2" />
                Create New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Create New</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2" />
                <span>Bot</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Github className="mr-2" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud className="mr-2" />
                <span>API</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Context Menu Style */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="mr-2" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Configure</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ComponentShowcase>
    </div>
  )
}
