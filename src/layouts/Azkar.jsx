import React from "react";
import { Container, Typography, Box, List, ListItem, Paper } from "@mui/material";

const Azkar = ({ azkar, title }) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        padding: { xs: "30px 15px", md: "40px 30px" },
        marginTop: "20px",
        marginBottom: "60px",
      }}
    >
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          sx={{
            color: "#d4af37",
            fontWeight: "900",
            fontSize: { xs: "32px", md: "48px" },
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            height: "4px",
            width: "80px",
            background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
            margin: "0 auto",
            borderRadius: "2px",
          }}
        />
      </Box>

      <div className="azkar-container">
        {azkar.map((category, catIndex) => (
          <Box key={catIndex} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#d4af37",
                mb: 3,
                fontWeight: "800",
                fontSize: "24px",
                display: "inline-block",
                borderBottom: "3px solid rgba(212, 175, 55, 0.3)",
                pb: 1,
                pr: 4,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -3,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "#d4af37"
                }
              }}
            >
              {category.category}
            </Typography>

            <List sx={{ display: 'grid', gap: 3 }}>
              {category.text.map((textItem, textIndex) => {
                const mainText = Array.isArray(textItem) ? textItem[0] : textItem;
                const subText = Array.isArray(textItem) ? textItem[1] : null;

                return (
                  <ListItem
                    key={textIndex}
                    disablePadding
                    sx={{ display: 'block' }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        background: "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(212, 175, 55, 0.15)",
                        borderRadius: "20px",
                        padding: "25px",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.06)",
                          borderColor: "rgba(212, 175, 55, 0.4)",
                          transform: "translateY(-4px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                        }
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#fff",
                          lineHeight: "1.9",
                          fontSize: { xs: "17px", md: "19px" },
                          textAlign: "right",
                          fontWeight: 500,
                          fontFamily: "inherit"
                        }}
                      >
                        {mainText}
                      </Typography>
                      
                      {subText && (
                        <Box 
                          sx={{ 
                            mt: 2.5, 
                            pt: 2, 
                            borderTop: "1px dashed rgba(212, 175, 55, 0.2)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            flexDirection: "row-reverse"
                          }}
                        >
                          <Box sx={{ color: "#d4af37", fontSize: "20px", mt: 0.5 }}>✨</Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(212, 175, 55, 0.9)",
                              fontSize: "15px",
                              lineHeight: "1.6",
                              fontWeight: 600,
                              fontStyle: "italic",
                              textAlign: "right",
                              width: "100%"
                            }}
                          >
                            {subText}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </div>
    </Container>
  );
};

export default Azkar;
