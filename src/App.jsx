// // // // // import React from "react";
// // // // // import ClassyComponent from "./week6/classy_component";
// // // // // const App = () => <ClassyComponent />
// // // // // export default App;
// // // // import React from "react";
// // // // import FunctionalStateHookComponent from "./week6/functional_statehook";
// // // // const App = () => <FunctionalStateHookComponent />
// // // // export default App;
// // // import React from "react";
// // // // import MaterialUIEx1Component from "./week6/materialuiexample1";
// // // // const App = () => <MaterialUIEx1Component />
// // // // import Lab11 from "./week6/lab11";
// // // // const App = () => <Lab11 />
// // // // import MaterialUIEx4Component from "./week7/class1/materialuiexample4";
// // // // const App = () => <MaterialUIEx4Component/>
// // // import Lab12 from "./week7/class1/lab12";
// // // const App = () => <Lab12 />
// // // export default App;


// import React, { useState } from "react";
// import { Routes, Route, NavLink } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./week7/class1/theme";
// import {
//  Toolbar,
//  AppBar,
//  Menu,
//  MenuItem,
//  IconButton,
//  Typography,
// } from "@mui/material";
// import MaterialUIEx3Component from "./week7/class1/materialuiexample3";
// import MaterialUIEx5Component from "./week7/class2/materialuiexample5";
// import MaterialUIEx6Component from "./week7/class2/materialuiexample6";
// import MaterialUIEx7a from "./week7/class2/materialuiexample7a";
// import Lab13Component from "./week7/class2/lab13component";
// const App = () => {
//  const [anchorEl, setAnchorEl] = useState(null);
//  const handleClose = () => {
//  setAnchorEl(null);
//  };
//  const handleClick = (event) => {
//  setAnchorEl(event.currentTarget);
//  };
//  return (
//  <ThemeProvider theme={theme}>
//  <AppBar>
//  <Toolbar>
//  <Typography variant="h6" color="inherit">
//  INFO3139 - MaterialUI
//  </Typography>
//  <IconButton
//   id="menubtn"
//  onClick={handleClick}
//  color="inherit"
//  style={{ marginLeft: "auto", paddingRight: "1vh" }}
//  >
//  <MenuIcon 
// />
//  </IconButton>
//  <Menu
//   //id="menubtn"
// //  id="simple-menu"
//  anchorEl={anchorEl}
//  open={Boolean(anchorEl)}
//  onClose={handleClose}
//  >
//  <MenuItem component={NavLink} to="/home" onClick={handleClose}>
//  Home
//  </MenuItem>
//  <MenuItem component={NavLink} to="/ex3" onClick={handleClose}>
//  Exercise #3
//  </MenuItem>
//  <MenuItem component={NavLink} to="/ex6" onClick={handleClose}>
//  Exercise #6
//  </MenuItem>
//  <MenuItem component={NavLink} to="/ex7a" onClick={handleClose}>
//  Exercise #7a
//  </MenuItem>
//  <MenuItem component={NavLink} to="/lab13" onClick={handleClose}>
//  Lab 13
//  </MenuItem>
//  </Menu>
//  </Toolbar>
//  </AppBar>
//  <Routes>
//  <Route path="/" element={<MaterialUIEx5Component />} />
//  <Route path="/home" element={<MaterialUIEx5Component />} />
//  <Route path="/ex3" element={<MaterialUIEx3Component />} />
//  <Route path="/ex6" element={<MaterialUIEx6Component />} />
//  <Route path="/ex7a" element={<MaterialUIEx7a />} />
//  <Route path="/lab13" element={<Lab13Component />} />
//  </Routes>
//  </ThemeProvider>
//  );
// };
// export default App;

// // import { QueryClient, QueryClientProvider } from "react-query";
// // import ReactQueryExample from "./week8/reactqueryexample";
// // const queryClient = new QueryClient();
// // const App = () => {
// //  return (
// //  <QueryClientProvider client={queryClient}>
// //  <ReactQueryExample />
// //  </QueryClientProvider>
// //  );
// // };
// // export default App;


import SocketClient from "./week10/socketclient";
function App() {
 return (
 <div>
 <SocketClient />
 </div>
 );
}
export default App;
