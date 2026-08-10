import { Box } from '@mui/material';
import { Users, UserCheck, Building2, UserPlus } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function UserStatistics({ stats, loading }) {
  const cards = [
    { key: 'totalUsers', label: 'Total Users', icon: Users, accent: 'primary' },
    { key: 'jobSeekers', label: 'Job Seekers', icon: UserCheck, accent: 'info' },
    { key: 'employers', label: 'Employers', icon: Building2, accent: 'accent' },
    { key: 'newThisMonth', label: 'New This Month', icon: UserPlus, accent: 'success' },
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2.5 }}>
      {cards.map((c) => (
        <StatCard
          key={c.key}
          label={c.label}
          value={stats?.[c.key]?.value?.toLocaleString() ?? '—'}
          trend={stats?.[c.key]?.trend}
          icon={c.icon}
          accent={c.accent}
          loading={loading}
        />
      ))}
    </Box>
  );
}