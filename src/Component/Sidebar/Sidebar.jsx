import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import { Typography, Box, Stack, Button, useMediaQuery } from "@mui/material";
import icon from "../../asset/newchat.png";
import { Link } from "react-router-dom";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar({ setChat, closeMenu }) {
  const { mode, setMode } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width:800px)");

  const handleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Box>
      {isMobile && (
        <Button
          endIcon={<CloseIcon />}
          sx={{
            width: 1,
            justifyContent: "flex-end",
            color: mode === "light" ? "primary.dark" : "text.primary",
          }}
          onClick={closeMenu}
        >
          Close
        </Button>
      )}

      <Link to="/" style={{ textDecoration: "none" }}>
        <Stack
          onClick={() => {
            setChat([]);
            closeMenu();
          }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.bg" },
            px: 2,
            py: 1,
            minHeight: 52,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              component="img"
              src={icon}
              sx={{
                height: 34,
                width: 34,
                borderRadius: "6px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <Typography
              fontSize={16}
              fontWeight={600}
              color="text.primary"
              sx={{ lineHeight: 1 }}
            >
              New Chat
            </Typography>
          </Stack>

          <AddCommentIcon sx={{ color: "text.primary", fontSize: 20 }} />
        </Stack>
      </Link>

      <Box p={{ xs: 2, md: 3 }}>
        <Link to="/history" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ width: 1 }} onClick={closeMenu}>
            Past Conversations
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
