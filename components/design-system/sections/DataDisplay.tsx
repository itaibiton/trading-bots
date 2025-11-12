import * as React from 'react'
import { ComponentShowcase } from '../ComponentShowcase'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

/**
 * DataDisplay - Comprehensive showcase of data display components
 *
 * Demonstrates all shadcn data display components with realistic examples:
 * - Card (various layouts and use cases)
 * - Table (with realistic data, sorting, selection)
 * - Badge (all variants and sizes)
 * - Avatar (individual and groups)
 * - Separator (horizontal and vertical)
 */
export default function DataDisplay() {
  return (
    <div className="space-y-8">
      {/* Cards Section */}
      <ComponentShowcase
        title="Card"
        description="A versatile container for grouping related content with support for headers, footers, and actions."
      >
        <div className="space-y-6">
          {/* Basic Cards Grid */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Basic Cards
            </h4>
            <div className="grid gap-4 md:grid-cols-3">
              {/* Default Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>
                    A simple card with header and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is the card content area. It can contain any type of
                    information you need to display.
                  </p>
                </CardContent>
              </Card>

              {/* Card with Footer */}
              <Card>
                <CardHeader>
                  <CardTitle>With Footer</CardTitle>
                  <CardDescription>Card with action buttons</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cards can include footer sections for actions or additional
                    information.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                  <Button size="sm">Save</Button>
                </CardFooter>
              </Card>

              {/* Card with Action */}
              <Card>
                <CardHeader>
                  <CardTitle>With Header Action</CardTitle>
                  <CardDescription>Card with header button</CardDescription>
                  <CardAction>
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use CardAction to add controls in the header area.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Practical Examples */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Practical Examples
            </h4>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* User Profile Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <Avatar className="size-16">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                        alt="Sarah Chen"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Sarah Chen</h3>
                      <p className="text-sm text-muted-foreground">
                        Product Designer
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Design</Badge>
                      <Badge variant="secondary">UI/UX</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <Button className="w-full" variant="outline">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardDescription>Total Revenue</CardDescription>
                  <CardTitle className="text-3xl">$45,231.89</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="default" className="bg-green-500">
                      +20.1%
                    </Badge>
                    <span className="text-muted-foreground">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Product Card */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500" />
                <CardHeader>
                  <CardTitle>Premium Plan</CardTitle>
                  <CardDescription>
                    Everything you need to grow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Unlimited projects</li>
                    <li>✓ Advanced analytics</li>
                    <li>✓ Priority support</li>
                  </ul>
                </CardContent>
                <CardFooter className="border-t">
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Interactive Card */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Interactive Card
            </h4>
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>Hover State</CardTitle>
                <CardDescription>
                  This card has hover effects for interactive elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hover over this card to see the border color change. Useful
                  for clickable cards or selectable items.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ComponentShowcase>

      {/* Table Section */}
      <ComponentShowcase
        title="Table"
        description="Display structured data in rows and columns with support for sorting, selection, and responsive layouts."
      >
        <div className="space-y-6">
          {/* Basic Table */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              User Management Table
            </h4>
            <Table>
              <TableCaption>A list of team members and their roles</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                          alt="Sarah Chen"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      Sarah Chen
                    </div>
                  </TableCell>
                  <TableCell>sarah.chen@example.com</TableCell>
                  <TableCell>
                    <Badge variant="default">Admin</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                          alt="Michael Park"
                        />
                        <AvatarFallback>MP</AvatarFallback>
                      </Avatar>
                      Michael Park
                    </div>
                  </TableCell>
                  <TableCell>michael.park@example.com</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Developer</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
                          alt="Emily Rodriguez"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      Emily Rodriguez
                    </div>
                  </TableCell>
                  <TableCell>emily.rodriguez@example.com</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Designer</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                          alt="James Wilson"
                        />
                        <AvatarFallback>JW</AvatarFallback>
                      </Avatar>
                      James Wilson
                    </div>
                  </TableCell>
                  <TableCell>james.wilson@example.com</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Developer</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-50">
                      Away
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa"
                          alt="Lisa Kumar"
                        />
                        <AvatarFallback>LK</AvatarFallback>
                      </Avatar>
                      Lisa Kumar
                    </div>
                  </TableCell>
                  <TableCell>lisa.kumar@example.com</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Manager</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-50">
                      Offline
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
                          alt="David Thompson"
                        />
                        <AvatarFallback>DT</AvatarFallback>
                      </Avatar>
                      David Thompson
                    </div>
                  </TableCell>
                  <TableCell>david.thompson@example.com</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Developer</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total Members</TableCell>
                  <TableCell className="text-right">6</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* Striped Table */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Transaction History (Striped Rows)
            </h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: 'TXN-001',
                    date: '2025-01-10',
                    desc: 'Monthly subscription',
                    amount: '$29.00',
                  },
                  {
                    id: 'TXN-002',
                    date: '2025-01-09',
                    desc: 'API usage',
                    amount: '$15.50',
                  },
                  {
                    id: 'TXN-003',
                    date: '2025-01-08',
                    desc: 'Storage upgrade',
                    amount: '$10.00',
                  },
                  {
                    id: 'TXN-004',
                    date: '2025-01-07',
                    desc: 'Support ticket',
                    amount: '$0.00',
                  },
                ].map((transaction, index) => (
                  <TableRow
                    key={transaction.id}
                    className={index % 2 === 1 ? 'bg-muted/30' : ''}
                  >
                    <TableCell className="font-mono text-xs">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.desc}</TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ComponentShowcase>

      {/* Badge Section */}
      <ComponentShowcase
        title="Badge"
        description="Display status indicators, labels, or tags with multiple style variants."
      >
        <div className="space-y-6">
          {/* Variants */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Variants
            </h4>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Sizes (via className)
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="text-[10px] px-1.5 py-0">Tiny</Badge>
              <Badge className="text-xs">Default</Badge>
              <Badge className="text-sm px-3 py-1">Large</Badge>
            </div>
          </div>

          {/* Status Colors */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Status Indicators
            </h4>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-green-500 hover:bg-green-600">
                Active
              </Badge>
              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                Pending
              </Badge>
              <Badge className="bg-blue-500 hover:bg-blue-600">
                In Progress
              </Badge>
              <Badge className="bg-red-500 hover:bg-red-600">Error</Badge>
              <Badge className="bg-gray-500 hover:bg-gray-600">Inactive</Badge>
              <Badge className="bg-purple-500 hover:bg-purple-600">Beta</Badge>
            </div>
          </div>

          {/* With Icons/Dots */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              With Indicators
            </h4>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline">
                <span className="size-1.5 rounded-full bg-green-500 mr-1" />
                Online
              </Badge>
              <Badge variant="outline">
                <span className="size-1.5 rounded-full bg-yellow-500 mr-1" />
                Away
              </Badge>
              <Badge variant="outline">
                <span className="size-1.5 rounded-full bg-red-500 mr-1" />
                Busy
              </Badge>
              <Badge variant="outline">
                <span className="size-1.5 rounded-full bg-gray-500 mr-1" />
                Offline
              </Badge>
            </div>
          </div>

          {/* Practical Examples */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Practical Use Cases
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Role tags:
                </span>
                <Badge variant="default">Admin</Badge>
                <Badge variant="secondary">Editor</Badge>
                <Badge variant="outline">Viewer</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Skills:
                </span>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">Python</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Plan tiers:
                </span>
                <Badge className="bg-amber-500 hover:bg-amber-600">Free</Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600">Pro</Badge>
                <Badge className="bg-purple-500 hover:bg-purple-600">
                  Enterprise
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Avatar Section */}
      <ComponentShowcase
        title="Avatar"
        description="Display user profile pictures with automatic fallback to initials."
      >
        <div className="space-y-6">
          {/* Basic Avatars */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Basic Avatars
            </h4>
            <div className="flex flex-wrap items-center gap-4">
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="Sarah Chen"
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                  alt="Michael Park"
                />
                <AvatarFallback>MP</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
                  alt="Emily Rodriguez"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Sizes
            </h4>
            <div className="flex flex-wrap items-center gap-4">
              <Avatar className="size-6">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Small"
                  alt="Small"
                />
                <AvatarFallback className="text-[10px]">XS</AvatarFallback>
              </Avatar>
              <Avatar className="size-8">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Default"
                  alt="Default"
                />
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="size-12">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Medium"
                  alt="Medium"
                />
                <AvatarFallback className="text-sm">MD</AvatarFallback>
              </Avatar>
              <Avatar className="size-16">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Large"
                  alt="Large"
                />
                <AvatarFallback className="text-lg">LG</AvatarFallback>
              </Avatar>
              <Avatar className="size-24">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=XLarge"
                  alt="Extra Large"
                />
                <AvatarFallback className="text-2xl">XL</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Avatar Groups */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Avatar Groups (Stacked)
            </h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <Avatar className="size-10 border-2 border-background">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=User1"
                      alt="User 1"
                    />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-10 border-2 border-background">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=User2"
                      alt="User 2"
                    />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-10 border-2 border-background">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=User3"
                      alt="User 3"
                    />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-10 border-2 border-background">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=User4"
                      alt="User 4"
                    />
                    <AvatarFallback>U4</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-10 border-2 border-background bg-muted">
                    <AvatarFallback className="text-xs">+5</AvatarFallback>
                  </Avatar>
                </div>
                <span className="ml-4 text-sm text-muted-foreground">
                  9 team members
                </span>
              </div>

              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <Avatar className="size-12 border-2 border-background">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
                      alt="Alice"
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-12 border-2 border-background">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
                      alt="Bob"
                    />
                    <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-12 border-2 border-background">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie"
                      alt="Charlie"
                    />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                </div>
                <span className="ml-4 text-sm text-muted-foreground">
                  Project collaborators
                </span>
              </div>
            </div>
          </div>

          {/* With Status Indicators */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              With Status Indicators
            </h4>
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative">
                <Avatar className="size-12">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Online"
                    alt="Online User"
                  />
                  <AvatarFallback>ON</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <div className="relative">
                <Avatar className="size-12">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Away"
                    alt="Away User"
                  />
                  <AvatarFallback>AW</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-yellow-500 border-2 border-background" />
              </div>
              <div className="relative">
                <Avatar className="size-12">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Busy"
                    alt="Busy User"
                  />
                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-red-500 border-2 border-background" />
              </div>
              <div className="relative">
                <Avatar className="size-12">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Offline"
                    alt="Offline User"
                  />
                  <AvatarFallback>OF</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-gray-400 border-2 border-background" />
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Separator Section */}
      <ComponentShowcase
        title="Separator"
        description="Visual divider to separate content sections horizontally or vertically."
      >
        <div className="space-y-8">
          {/* Horizontal Separator */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Horizontal Separator
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm">Section 1 content</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm">Section 2 content</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm">Section 3 content</p>
              </div>
            </div>
          </div>

          {/* Vertical Separator */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              Vertical Separator
            </h4>
            <div className="flex items-center gap-4 h-16">
              <div className="text-sm">Item 1</div>
              <Separator orientation="vertical" />
              <div className="text-sm">Item 2</div>
              <Separator orientation="vertical" />
              <div className="text-sm">Item 3</div>
              <Separator orientation="vertical" />
              <div className="text-sm">Item 4</div>
            </div>
          </div>

          {/* With Text */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              With Text Label
            </h4>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Content before separator
              </p>
              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Or continue with
                </span>
                <Separator className="flex-1" />
              </div>
              <p className="text-sm text-muted-foreground">
                Content after separator
              </p>
            </div>
          </div>

          {/* In Card */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              In Card Layout
            </h4>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Update your profile information
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Change your password and security settings
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure how you receive notifications
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* In Navigation */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-muted-foreground">
              In Navigation
            </h4>
            <div className="flex items-center gap-1 text-sm">
              <a href="#" className="hover:text-primary">
                Home
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#" className="hover:text-primary">
                Products
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#" className="hover:text-primary">
                About
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}
