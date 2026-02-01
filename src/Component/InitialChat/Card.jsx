import { Box, Typography, Stack, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Card({ heading, subtext, handleClick }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width={650} 
      minHeight={180}
      p={4}
      borderRadius={3}
      bgcolor="#fff"
      boxShadow="0 6px 20px rgba(0,0,0,0.12)"
      onClick={() => handleClick(heading)}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "#f8f9fc",
          transform: "translateY(-2px)",
        },
        "&:hover .MuiIconButton-root": {
          opacity: 1,
        },
      }}
    >
      <Box>
        <Typography fontWeight={700} fontSize={{ xs: 18, md: 22 }}>
          {heading}
        </Typography>
        <Typography fontSize={{ xs: 14, md: 16 }} color="text.secondary">
          {subtext}
        </Typography>
      </Box>

      <IconButton
        size="large"
        sx={{
          opacity: 0,
          bgcolor: "#ede7f6",
          transition: "opacity 0.3s ease",
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </Stack>
  );
}
