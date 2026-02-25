import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Card, CardActionArea, CardMedia } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

function Layout() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs display="flex" alignItems="center">
          <Box>
            <p>1 Column</p>
            <Button>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="/images/1_Column.png"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Button>
            <Button>
              <VisibilityIcon />
            </Button>
          </Box>
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <Box>
            <p>1:2 Column</p>
            <Button>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="/images/1_2_Column.png"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Button>
            <VisibilityIcon />
          </Box>
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <Box>
            <p>1:3 Column</p>
            <Button>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="/images/1_3_Column.png"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Button>
            <VisibilityIcon />
          </Box>
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <Box>
            <p>2:1 Column</p>
            <Button>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="/images/2_1_Column.png"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Button>
            <VisibilityIcon />
          </Box>
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <Box>
            <p>2:2 Column</p>
            <Button>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="/images/2_2_Column.png"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Button>
            <VisibilityIcon />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Layout;
