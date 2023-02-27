import React, { useReducer, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Card,
 CardHeader,
 CardContent,
 Snackbar,
 Typography,
} from "@mui/material";
import theme from "../../theme";
const Lab13Component = () => {
 const initialState = {
 msg: "",
 snackBarMsg: "",
 contactServer: false,
 users: [],
 names: [],
 };
 const reducer = (state, newState) => ({ ...state, ...newState });
 const [state, setState] = useReducer(reducer, initialState);
 useEffect(() => {
 fetchUsers();
 }, []);
 const fetchUsers = async () => {
 try {
 setState({
 contactServer: true,
 snackBarMsg: "Attempting to load users from server...",
 });


 let response = await fetch("http://localhost:5000/graphql", {
 method: "POST",
 headers: {
 "Content-Type": "application/json; charset=utf-8",
 },
 body: JSON.stringify({ query: "query { users{name,age,email} }" }),
 });
  let json = await response.json();
 setState({
 snackBarMsg: 'User data loaded',
 users: json.data.users,
 contactServer: true,
 names: json.data.users.map((a) => a.name),
 });
//  let json = await response.json();
//  setState({
//  snackBarMsg: `users loaded`,
//  users: json.data.users,
//  contactServer: true,
//  });

 } catch (error) {
 console.log(error);
 setState({
 msg: `Problem loading server data - ${error.message}`,
 });
 }
 };
 const snackbarClose = (event, reason) => {
 if (reason === "clickaway") {
 return;
 }
 setState({
 //msg: `${state.users.length} users loaded`,
 msg: `${state.names.length} names loaded`,
 contactServer: false,
 });
 };
 return (
 <ThemeProvider theme={theme}>
 <Card className="card">
 <CardHeader
 title="Lab 13 - Search For User"
 style={{ color: theme.palette.primary.main, textAlign: "center" }}
 />
 <CardContent>
 <div>
 <Typography color="error">{state.msg}</Typography>
 </div>
 </CardContent>
 </Card>
 <Snackbar
 open={state.contactServer}
 message={state.snackBarMsg}
 autoHideDuration={3000}
 onClose={snackbarClose}
 />
 </ThemeProvider>
 );
};
export default Lab13Component;
