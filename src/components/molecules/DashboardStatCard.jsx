import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function DashboardStatCard({ title, value, color, link, extra }) {
  return (
    <Card sx={{ backgroundColor: color }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="h4" gutterBottom>{value}</Typography>
        {link && (
          <Button size="small" component={Link} to={link}>
            Lihat {title.toLowerCase()}
          </Button>
        )}
        {extra && (
          <Typography variant="body2" mt={1}>
            {extra}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
