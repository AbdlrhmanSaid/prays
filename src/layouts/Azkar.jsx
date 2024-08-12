import React from "react";
import { Container, Typography, Box, List, ListItem } from "@mui/material";

const Azkar = ({ azkar, title }) => {
  return (
    <Container
      maxWidth="md"
      style={{
        backgroundColor: "#121212",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
      }}
      className="text-center morning"
    >
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          style={{
            color: "#FFB74D",
            fontWeight: "600",
            letterSpacing: "1.5px",
            marginBottom: "20px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <div className="textInfo">
        {azkar.map((item, index) => (
          <Box key={index} mb={4}>
            <Typography
              variant="h5"
              style={{
                color: "#E0E0E0",
                marginBottom: "15px",
                textDecoration: "underline",
              }}
            >
              {item.category}
            </Typography>
            <List>
              {item.text.map((textItem, textIndex) => (
                <ListItem
                  key={textIndex}
                  style={{ paddingLeft: 0, paddingBottom: "10px" }}
                >
                  {Array.isArray(textItem) ? (
                    <div>
                      <Typography
                        variant="body1"
                        style={{ color: "white", lineHeight: "1.7" }}
                      >
                        {textItem[0]}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: "#BDBDBD",
                          fontWeight: "bold",
                          marginTop: "5px",
                        }}
                      >
                        {textItem[1]}
                      </Typography>
                    </div>
                  ) : (
                    <Typography
                      variant="body1"
                      style={{ color: "#E0E0E0", lineHeight: "1.7" }}
                    >
                      {textItem}
                    </Typography>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </div>
    </Container>
  );
};

export default Azkar;
