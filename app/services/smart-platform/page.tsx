import * as React from 'react';
import {
  Activity,
  BarChart3,
  CloudCog,
  FileText,
  Gauge,
  Settings2,
} from 'lucide-react';
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
    title: 'Total Requests',
    value: '3.2M',
    helper: '+12% from last month',
    icon: Activity,
  },
  {
    title: 'Avg Latency',
    value: '52ms',
    helper: 'Target < 100ms',
    icon: Gauge,
  },
  {
    title: 'Platform Uptime',
    value: '99.97%',
    helper: 'Last 30 days',
    icon: CloudCog,
  },
  {
    title: 'Monthly Cost',
    value: '$128K',
    helper: '+8% this month',
    icon: BarChart3,
  },
];

const requestData = [
  { label: '00', requests: 180, latency: 120 },
  { label: '04', requests: 220, latency: 110 },
  { label: '08', requests: 280, latency: 95 },
  { label: '12', requests: 340, latency: 80 },
  { label: '16', requests: 310, latency: 90 },
  { label: '20', requests: 260, latency: 102 },
  { label: '24', requests: 290, latency: 88 },
];

const costData = [
  { month: 'Jan', cost: 2100 },
  { month: 'Feb', cost: 1950 },
  { month: 'Mar', cost: 2250 },
  { month: 'Apr', cost: 2480 },
  { month: 'May', cost: 2600 },
  { month: 'Jun', cost: 2720 },
  { month: 'Jul', cost: 2850 },
];

const chartHeight = 200;
const barWidth = 36;
const barGap = 24;
const chartPadding = 12;

const maxRequestVolume = Math.max(...requestData.map((data) => data.requests));
const maxLatency = Math.max(...requestData.map((data) => data.latency));
const maxCost = Math.max(...costData.map((data) => data.cost));

export default function SmartPlatformPage() {
  const requestChartWidth =
    requestData.length * (barWidth + barGap) - barGap + chartPadding * 2;
  const requestPoints = requestData
    .map((data, index) => {
      const x = chartPadding + index * (barWidth + barGap) + barWidth / 2;
      const y =
        chartHeight - (data.latency / maxLatency) * chartHeight + chartPadding;

      return `${x},${y}`;
    })
    .join(' ');

  const costChartWidth =
    costData.length * (barWidth + barGap) - barGap + chartPadding * 2;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Cloud infrastructure and platform services</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Smart Platform</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> Platform Report
          </Button>
          <Button className="gap-2">
            <Settings2 className="h-4 w-4" /> Configure
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['Overview', 'Cloud Infrastructure', 'Cloud Workloads'].map((label, index) => (
          <button
            key={label}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              index === 0
                ? 'bg-primary text-primary-foreground shadow'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={index === 0}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title} className="border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <p className="mt-6 text-3xl font-semibold text-foreground">{card.value}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{card.helper}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border/60">
          <CardHeader className="space-y-1">
            <CardTitle>Request Volume & Latency</CardTitle>
            <CardDescription>Last 24 hours performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                Request Volume
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
                Avg Latency
              </div>
            </div>
            <div className="relative mt-6">
              <svg
                width={requestChartWidth}
                height={chartHeight + chartPadding * 2}
                viewBox={`0 0 ${requestChartWidth} ${chartHeight + chartPadding * 2}`}
                role="img"
                aria-label="Request volume bar chart with latency line overlay"
                className="w-full"
              >
                <defs>
                  <linearGradient id="requestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 4 }).map((_, index) => {
                  const y = chartPadding + (index * chartHeight) / 3;

                  return (
                    <line
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      x1={chartPadding / 2}
                      x2={requestChartWidth - chartPadding / 2}
                      y1={y}
                      y2={y}
                      stroke="#E5E7EB"
                      strokeDasharray="4 6"
                    />
                  );
                })}
                {requestData.map((data, index) => {
                  const x = chartPadding + index * (barWidth + barGap);
                  const barHeight = (data.requests / maxRequestVolume) * chartHeight;

                  return (
                    <g key={data.label}>
                      <rect
                        x={x}
                        y={chartHeight - barHeight + chartPadding}
                        width={barWidth}
                        height={barHeight}
                        rx={8}
                        fill="url(#requestGradient)"
                        stroke="rgba(59,130,246,0.3)"
                      />
                      <text
                        x={x + barWidth / 2}
                        y={chartHeight + chartPadding + 20}
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--muted-foreground)"
                      >
                        {data.label}
                      </text>
                    </g>
                  );
                })}
                <polyline
                  points={requestPoints}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/60">
          <CardHeader className="space-y-1">
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>Monthly infrastructure costs by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <svg
                width={costChartWidth}
                height={chartHeight + chartPadding * 2}
                viewBox={`0 0 ${costChartWidth} ${chartHeight + chartPadding * 2}`}
                role="img"
                aria-label="Monthly cost breakdown bar chart"
                className="w-full"
              >
                {Array.from({ length: 4 }).map((_, index) => {
                  const y = chartPadding + (index * chartHeight) / 3;

                  return (
                    <line
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      x1={chartPadding / 2}
                      x2={costChartWidth - chartPadding / 2}
                      y1={y}
                      y2={y}
                      stroke="#E5E7EB"
                      strokeDasharray="4 6"
                    />
                  );
                })}
                {costData.map((data, index) => {
                  const x = chartPadding + index * (barWidth + barGap);
                  const barHeight = (data.cost / maxCost) * chartHeight;

                  return (
                    <g key={data.month}>
                      <rect
                        x={x}
                        y={chartHeight - barHeight + chartPadding}
                        width={barWidth}
                        height={barHeight}
                        rx={10}
                        fill="rgba(99,102,241,0.85)"
                      />
                      <text
                        x={x + barWidth / 2}
                        y={chartHeight + chartPadding + 20}
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--muted-foreground)"
                      >
                        {data.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Current Month</dt>
                <dd className="text-lg font-semibold text-foreground">$128,400</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Forecast</dt>
                <dd className="text-lg font-semibold text-foreground">$132,900</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Savings Opportunities</dt>
                <dd className="text-foreground">$6,200 identified</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Optimization Score</dt>
                <dd className="flex items-center gap-2 text-foreground">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" /> 87/100
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
