import { Button } from "@mui/material";

// Komponen atomik SubmitButton, menerima children dan props lain
export default function SubmitButton({ children, ...props }) {
  return (
    <Button type="submit" variant="contained" sx={{ backgroundColor: "#2563eb" }} {...props}>
      {children}
    </Button>
  );
}
