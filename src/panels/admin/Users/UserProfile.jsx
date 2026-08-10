import { Box, Paper, Avatar, Typography, Stack, Divider } from '@mui/material';
import { Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { COLORS } from '../utils/constants';
import { ROLE_LABELS } from './usersMockData';
import StatusBadge from '../components/StatusBadge';


export default function UserProfile({ user }) {
  if (!user) return null;

  const infoRows = [
    { icon: Mail, label: user.email },
    { icon: Phone, label: user.phone },
    { icon: MapPin, label: user.location },
    { icon: Calendar, label: `Joined ${user.joinedAt}` },
    { icon: Clock, label: `Last login ${user.lastLogin}` },
  ];


  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${COLORS.border}`, bgcolor: COLORS.surface }}>
      <Stack alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
        <Avatar sx={{ width: 72, height: 72, bgcolor: COLORS.primarySoft, color: COLORS.primary, fontSize: 24, fontWeight: 700 }}>
          {user.name.slice(0, 2).toUpperCase()}
        </Avatar>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: 17, color: COLORS.textPrimary }}>{user.name}</Typography>
          <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>{ROLE_LABELS[user.role]}</Typography>
        </Box>
        <StatusBadge status={user.status} />
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={1.5}>
        {infoRows.map((row, i) => (
          <Stack key={i} direction="row" spacing={1.25} alignItems="center">
            <row.icon size={16} color={COLORS.textMuted} />
            <Typography sx={{ fontSize: 13.5, color: COLORS.textSecondary }}>{row.label}</Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-around">
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, color: COLORS.textPrimary }}>
            {user.role === 'employer' ? user.jobsPosted ?? 0 : user.applicationsCount ?? 0}
          </Typography>
          <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>
            {user.role === 'employer' ? 'Jobs Posted' : 'Applications'}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}