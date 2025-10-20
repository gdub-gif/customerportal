import * as React from 'react';
import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  UserPlus,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type SummaryMetric = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  accent: string;
};

type SecurityPolicy = {
  name: string;
  description: string;
  compliance: number;
  status: 'Active' | 'Disabled';
};

type UserRole = {
  role: string;
  count: number;
  description: string;
};

const summaryMetrics: SummaryMetric[] = [
  {
    title: 'Active Users',
    value: '245',
    change: '+12 this week',
    icon: Users,
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'MFA Enabled',
    value: '98%',
    change: '2% increase',
    icon: ShieldCheck,
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Active Sessions',
    value: '187',
    change: '+24 in last hour',
    icon: Activity,
    accent: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'Security Alerts',
    value: '3',
    change: '2 critical',
    icon: AlertTriangle,
    accent: 'bg-amber-100 text-amber-700',
  },
];

const securityPolicies: SecurityPolicy[] = [
  {
    name: 'Multi-Factor Authentication',
    description: 'Required for all users',
    compliance: 100,
    status: 'Active',
  },
  {
    name: 'Password Complexity',
    description: '12 characters • rotation every 90 days',
    compliance: 100,
    status: 'Active',
  },
  {
    name: 'Session Timeout',
    description: '30 minutes of inactivity',
    compliance: 100,
    status: 'Active',
  },
  {
    name: 'IP Whitelisting',
    description: 'Enabled for corporate network',
    compliance: 85,
    status: 'Disabled',
  },
];

const userRoles: UserRole[] = [
  {
    role: 'Admin',
    count: 8,
    description: 'Full access to system settings',
  },
  {
    role: 'Manager',
    count: 22,
    description: 'Department level access',
  },
  {
    role: 'User',
    count: 198,
    description: 'Standard permissions',
  },
  {
    role: 'Guest',
    count: 157,
    description: 'Limited read-only access',
  },
];

const statusColors: Record<SecurityPolicy['status'], string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Disabled: 'bg-slate-200 text-slate-700',
};

export default function SmartIamPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase text-muted-foreground">Identity &amp; Access Management</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Smart IAM</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Monitor authentication coverage, track active sessions, and manage role-based access all from a single,
            centralized dashboard.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="border-dashed">
            Security Report
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.title} className="border-none bg-muted/40 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <CardTitle className="mt-2 text-3xl font-bold">{metric.value}</CardTitle>
                  <p className="mt-2 text-xs text-muted-foreground">{metric.change}</p>
                </div>
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${metric.accent}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Security Policies</CardTitle>
            <CardDescription>Current access control and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityPolicies.map((policy) => (
              <div
                key={policy.name}
                className="rounded-lg border border-border/60 p-4 shadow-sm transition-colors hover:border-border"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-foreground">{policy.name}</p>
                    <p className="text-xs text-muted-foreground">{policy.description}</p>
                    <div className="mt-3 h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${policy.compliance}%` }}
                        role="presentation"
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="flex w-full items-end justify-between sm:w-auto sm:flex-col sm:items-end sm:justify-start sm:gap-2">
                    <span className="text-sm font-semibold text-foreground">{policy.compliance}%</span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[policy.status]}`}
                    >
                      {policy.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Users by Role</CardTitle>
              <CardDescription>Distribution of permission tiers across access levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userRoles.map((role) => (
                <div key={role.role} className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{role.role}</p>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{role.count}</p>
                    <p className="text-xs text-muted-foreground">users</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50">
            <CardHeader>
              <CardTitle className="text-lg">Security Alerts</CardTitle>
              <CardDescription className="text-slate-300">
                3 alerts require review. MFA enforcement policies were bypassed for 2 users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                <AlertTriangle className="h-5 w-5 text-amber-300" aria-hidden />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Unrecognized device sign-in</p>
                  <p className="text-xs text-slate-300">Flagged 12 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Policy update pending</p>
                  <p className="text-xs text-slate-300">Review MFA grace period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
