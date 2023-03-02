
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
  <Project1Component />

 {/* <Card className="card">
 <CardHeader
 title="INFO3139 - Project1"
 style={{ textAlign: "center" }}
 />
<CardContent>
  <div>
  <img src={globe} alt="Globe" width={"100%"}/>
  </div>
  <div>
    <h3>Worldwide Travel Alerts</h3>
  </div>




</CardContent>

 </Card> */}

 {/* <AppBar>
 <Toolbar>
 <Typography variant="h6" color="inherit">
 INFO3139 - Project1
 </Typography> */}
 {/* <IconButton
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

 <MenuItem component={NavLink} to="/home" onClick={handleClose}>
 Home
 </MenuItem>
 <MenuItem component={NavLink} to="/test" onClick={handleClose}>
 Test
 </MenuItem>

 </Menu> */}
 {/* </Toolbar>
 </AppBar>
 <Typography variant="h6" color="inherit">
 INFO3139 - Project1
 </Typography> */}
 {/* <Routes>
 <Route path="/" element={<Project1Component />} />
 <Route path="/home" element={<Project1Component />} />
 <Route path="/test" element={<Project1Component />} />

 </Routes> */}
 </ThemeProvider>
 );
};
export default App;