import React, { useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Card,
 CardHeader,
 CardContent,
 Snackbar,
 Typography,
} from "@mui/material";
import theme from "./theme";
import Project1Component from "./project1component";

const AlertComponent = () => {
 const initialState = {
 msg: "",
 snackBarMsg: "",
 contactServer: false,
 results: [],
 };
 const reducer = (state, newState) => ({ ...state, ...newState });
 const [state, setState] = useReducer(reducer, initialState);
 

 
 useEffect(() => {
 fetchResults();
 }, []);
 const fetchResults = async () => {
 try {
 setState({
 contactServer: true,
 snackBarMsg: "Running setup",
 });
 let response = await fetch("http://localhost:5000/graphql", {
 method: "POST",
 headers: {
 "Content-Type": "application/json; charset=utf-8",
 },
 body: JSON.stringify({ query: "query { project1_setup{results} }" }),
 });
 let json = await response.json();

// return the JSON to a variable called payload, then
let resArr = [];
resArr = json.data.project1_setup.results
 .replace(/([.])\s*(?=[A-Z])/g, "$1|")
 .split("|");





 setState({
 snackBarMsg: `alerts collection setup completed`,
 //results: json.data.project1_setup.results,
 results: resArr,
 contactServer: true,
 });
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
 msg: `${state.results.length} results loaded`,
 contactServer: false,
 });
 };
 return (
    
 <ThemeProvider theme={theme}>
   
 <Card className="card">
 <Project1Component  />
 <CardHeader
 title="Alert Setup - Details"
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
export default AlertComponent;
