import React, { useReducer, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Autocomplete,
 Toolbar,
 Card,
 AppBar,
 CardHeader,
 CardContent,
 Typography,
 TextField,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import globe from "./globe-clipart.jpg";
const Project1Component = (props) => {
const initialState = {
    statement: "",
};
const reducer = (state, newState) => ({ ...state, ...newState });
const [state, setState] = useReducer(reducer, initialState);


const onChange = (e, selectedOption) => {
    selectedOption
    ? setState({statement: (state.statement + " " + selectedOption)})
    : setState(initialState);

};
 return (
    <ThemeProvider theme={theme}>
    <Card className="card">
 <CardHeader
 />
<CardContent style={{ textAlign: "center"}}>
  <div>
  <img src={globe} alt="Globe" width={"40%"}/>
  </div>
  <div>
    <h3>Worldwide Travel Alerts</h3>
  </div>
</CardContent>
 </Card>


    </ThemeProvider>
 );
};
export default Project1Component;