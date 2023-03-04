
import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
 Toolbar,
 Card,
 CardHeader,
 CardContent,
 AppBar,
 Menu,
 MenuItem,
 IconButton,
 Typography,
} from "@mui/material";
import globe from "./globe-clipart.jpg";
import Project1Component from "./project1component";
import AlertComponent from "./alertcomponent";

const App = () => {
 const [anchorEl, setAnchorEl] = useState(null);
 const handleClose = () => {
 setAnchorEl(null);
 };
 const handleClick = (event) => {
 setAnchorEl(event.currentTarget);
 };
 return (
 <ThemeProvider theme={theme}>
<AppBar>
  <Toolbar>
    <Typography variant="h6" color="inerit">
      INFO3139 - Project1
    </Typography>
    <IconButton
    id="menubtn"
    onClick={handleClick}
    color="inherit"
    style={{ marginLeft: "auto", paddingRight: "1vh" }}
    >
      <MenuIcon />
    </IconButton>
    <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    >
       <MenuItem component={NavLink} to="/home" onClick={handleClose}>
 Home
 </MenuItem>
 <MenuItem component={NavLink} to="/reset" onClick={handleClose}>
 Reset Data
 </MenuItem>
    </Menu>
  </Toolbar>
</AppBar>
<Routes>
  <Route path="/" element={<Project1Component />} />
  <Route path="/home" element={<Project1Component />} />
  <Route path="/reset" element={<AlertComponent />} />

</Routes>

 </ThemeProvider>
 );
};
export default App;