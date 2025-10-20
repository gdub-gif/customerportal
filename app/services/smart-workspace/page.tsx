import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const summaryCards = [
  {
    title: 'Total Workspaces',
    value: '5',
    helper: 'All operational',
  },
  {
    title: 'Active Users',
    value: '45',
    helper: 'of 50 licenses used',
  },
  {
    title: 'Avg CPU Usage',
    value: '52%',
    helper: 'Optimal range',
  },
  {
    title: 'Storage Used',
    value: '1.8 TB',
    helper: 'of 3 TB allocated',
  },
];

const usageTrends = [
  { label: 'Oct 13', activeUsers: 32, sessions: 68 },
  { label: 'Oct 14', activeUsers: 34, sessions: 74 },
  { label: 'Oct 15', activeUsers: 35, sessions: 79 },
  { label: 'Oct 16', activeUsers: 37, sessions: 83 },
  { label: 'Oct 17', activeUsers: 39, sessions: 88 },
  { label: 'Oct 18', activeUsers: 42, sessions: 94 },
  { label: 'Oct 19', activeUsers: 45, sessions: 101 },
];

const chartHeight = 200;
const chartWidth = (usageTrends.length - 1) * 120;

const maxChartValue = Math.max(
  ...usageTrends.flatMap((point) => [point.activeUsers, point.sessions])
);

const scaleX = (index: number) => (index / (usageTrends.length - 1)) * chartWidth;
const scaleY = (value: number) =>
  chartHeight - (value / maxChartValue) * chartHeight + 8;

const buildAreaPath = (key: 'activeUsers' | 'sessions') => {
  const firstX = scaleX(0);
  const firstY = scaleY(usageTrends[0][key]);
  const points = usageTrends
    .map((point, index) => `L ${scaleX(index)} ${scaleY(point[key])}`)
    .join(' ');

  return `M ${firstX} ${chartHeight + 8} L ${firstX} ${firstY} ${points} L ${
    scaleX(usageTrends.length - 1)
  } ${chartHeight + 8} Z`;
};

export default function SmartWorkspacePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Virtual desktop and workspace management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Smart Workspace</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Monitor workspace health, optimize license usage, and keep your hybrid team connected.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-500">Manage</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              {card.title === 'Avg CPU Usage' ? (
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                  52% of 100%
                </span>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.helper}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Usage Trends</CardTitle>
            <CardDescription>
              Active users and sessions over the past 7 days
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-900" aria-hidden />
              <span>Active Users</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-400" aria-hidden />
              <span>Sessions</span>
            </div>
            <span className="text-muted-foreground">Oct 13 - Oct 19</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight + 16}`}
              preserveAspectRatio="none"
              className="h-64 w-full"
            >
              <defs>
                <linearGradient id="activeGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#18181b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#18181b" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="sessionGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#a1a1aa" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#d4d4d8" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {[0.25, 0.5, 0.75].map((fraction) => (
                <line
                  key={fraction}
                  x1="0"
                  x2={chartWidth}
                  y1={(chartHeight + 8) * fraction}
                  y2={(chartHeight + 8) * fraction}
                  stroke="#e4e4e7"
                  strokeDasharray="4 4"
                  strokeWidth={0.75}
                />
              ))}

              <path
                d={buildAreaPath('sessions')}
                fill="url(#sessionGradient)"
                stroke="#a1a1aa"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={buildAreaPath('activeUsers')}
                fill="url(#activeGradient)"
                stroke="#18181b"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <div className="mt-6 grid gap-4 text-sm md:grid-cols-3">
              <div>
                <p className="text-muted-foreground">Peak Active Users</p>
                <p className="text-lg font-semibold">45 on Oct 19</p>
              </div>
              <div>
                <p className="text-muted-foreground">Average Sessions</p>
                <p className="text-lg font-semibold">84 per day</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Incident</p>
                <p className="text-lg font-semibold">Resolved 12 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-border pb-6">
          <CardTitle className="text-xl font-semibold">Workspace Services</CardTitle>
          <CardDescription>Overview of service areas and current status</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3 text-sm">
            {['Virtual Workspace', 'Device Management', 'Collaboration', 'Applications', 'Telephony'].map(
              (tab, index) => (
                <span
                  key={tab}
                  className={`rounded-full px-4 py-2 font-medium ${
                    index === 0
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {tab}
                </span>
              )
            )}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Connection Health</p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  Stable
                </span>
              </div>
              <p className="text-2xl font-semibold">99.8%</p>
              <p className="text-sm text-muted-foreground">
                Latency remains under the 120ms service level agreement.
              </p>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Provisioning Queue</p>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  Attention
                </span>
              </div>
              <p className="text-2xl font-semibold">12 pending</p>
              <p className="text-sm text-muted-foreground">
                New workspace requests are being processed within the next 4 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
