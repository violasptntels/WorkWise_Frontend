import { Grid } from "@mui/material";
import StatCard from "../molecules/StatCard";

export default function DashboardStatsGrid({ data }) {
  return (
    <Grid container spacing={3}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <StatCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
}
