import { Button } from "@mui/material";

export default function CancelButton({ children = "Batal", ...props }) {
  return (
    <Button variant="outlined" color="error" {...props}>
      {children}
    </Button>
  );
}
