
import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
 Toolbar,
 AppBar,
 Menu,
 MenuItem,
 IconButton,
 Typography,
} from "@mui/material";
// import MaterialUIEx3Component from "./week7/class1/materialuiexample3";
// import MaterialUIEx5Component from "./week7/class2/materialuiexample5";
// import MaterialUIEx6Component from "./week7/class2/materialuiexample6";
// import MaterialUIEx7a from "./week7/class2/materialuiexample7a";
// import Lab13Component from "./week7/class2/lab13component";
import Project1Component from "./project1component";

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
 <Typography variant="h6" color="inherit">
 INFO3139 - Project1
 </Typography>
 <IconButton
  id="menubtn"
 onClick={handleClick}
 color="inherit"
 style={{ marginLeft: "auto", paddingRight: "1vh" }}
 >
 <MenuIcon 
/>
 </IconButton>
 <Menu
  //id="menubtn"
//  id="simple-menu"
 anchorEl={anchorEl}
 open={Boolean(anchorEl)}
 onClose={handleClose}
 >
 {/* <MenuItem component={NavLink} to="/home" onClick={handleClose}>
 Home
 </MenuItem>
 <MenuItem component={NavLink} to="/ex3" onClick={handleClose}>
 Exercise #3
 </MenuItem>
 <MenuItem component={NavLink} to="/ex6" onClick={handleClose}>
 Exercise #6
 </MenuItem>
 <MenuItem component={NavLink} to="/ex7a" onClick={handleClose}>
 Exercise #7a
 </MenuItem>
 <MenuItem component={NavLink} to="/lab13" onClick={handleClose}>
 Lab 13
 </MenuItem> */}
 <MenuItem component={NavLink} to="/home" onClick={handleClose}>
 Home
 </MenuItem>
 <MenuItem component={NavLink} to="/test" onClick={handleClose}>
 Test
 </MenuItem>

 </Menu>
 </Toolbar>
 </AppBar>
 <Routes>
 <Route path="/" element={<Project1Component />} />
 <Route path="/home" element={<Project1Component />} />
 <Route path="/test" element={<Project1Component />} />
 {/* <Route path="/ex3" element={<MaterialUIEx3Component />} />
 <Route path="/ex6" element={<MaterialUIEx6Component />} />
 <Route path="/ex7a" element={<MaterialUIEx7a />} />
 <Route path="/lab13" element={<Lab13Component />} /> */}
 </Routes>
 </ThemeProvider>
 );
};
export default App;