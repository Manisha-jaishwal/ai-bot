import { Box, Typography, Stack, Grid } from "@mui/material";
import icon from "../../asset/BotIcon.png";
import Card from "./Card";

export default function InitialChat({ generateResponse }) {
  const initialData = [
    { heading: "Hi, what is the weather", subtext: "Get immediate AI generated response" },
    { heading: "Hi, what is my location", subtext: "Get immediate AI generated response" },
    { heading: "Hi, what is the temperature", subtext: "Get immediate AI generated response" },
    { heading: "Hi, how are you", subtext: "Get immediate AI generated response" },
  ];

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
  
      <Stack
        spacing={4}
      justifyContent="center"
        alignItems="center"
        width="100%"
        maxWidth="1600px"
        px={2}
      >
        
        <Typography
          fontSize={{ xs: 22, md: 32 }}
          fontWeight={700}
          textAlign="center"
        >
          How Can I Help You Today?
        </Typography>

      
        <Box
          component="img"
          src={icon}
          sx={{
            height: 70,
            width: 70,
            borderRadius: "50%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />

        
        <Grid container spacing={4} width="100%" display={"flex"} justifyContent={"center"}>
          {initialData.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}                     
              key={item.heading}
              display="flex"             
              justifyContent="center"    
            >
              <Card
                heading={item.heading}
                subtext={item.subtext}
                handleClick={generateResponse}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
