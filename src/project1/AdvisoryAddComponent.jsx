import React, { useReducer, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Autocomplete,
 Card,
 CardHeader,
 CardContent,
 Typography,
 TextField,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import Project1Component from "./project1component";

const AdvisoryAddComponent = () => {
    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        travelers: [],
        countrynames: [],
        };
       
        const reducer = (state, newState) => ({ ...state, ...newState });
        const [state, setState] = useReducer(reducer, initialState);
       
        // const onChange = async (e, selectedOption) => {
        //    let queryString = `query {alerts(name: "${selectedOption}"){email}}`;
        //    let response = await fetch(`http://localhost:5000/graphql`, {
        //        method: "POST",
        //        headers: {
        //        "Content-Type": "application/json; charset=utf-8",
        //        },
        //        body: JSON.stringify({ query: queryString}),
        //        });
        //    let json = await response.json();
        //    let email = json.data.travelerbyname.email; 
        //    selectedOption
        //        ? setState({msg: `${selectedOption} selected. This traveler can be contacted at ${email}`})
        //        : setState({msg: ""});
        // };
       
        useEffect(() => {
           fetchCountries();
           }, []);
       
        const fetchCountries = async () => {
           try {
               setState({
               contactServer: true,
               snackBarMsg: "Attempting to load countries from server...",
               });
               let response = await fetch("http://localhost:5000/graphql", {
                   method: "POST",
                   headers: {
                   "Content-Type": "application/json; charset=utf-8",
                   },
                   body: JSON.stringify({ query: "query { alerts{name} }" }),
                   });
               let json = await response.json();
               setState({
                   snackBarMsg: 'loaded # countries',
                   contactServer: true,
                   countrynames: json.data.alerts.map((a) => a.name),
                   });
           } catch (error) {
               console.log(error);
               setState({
                   msg: `Problem loading server data - ${error.message}`,
               });
           }
        };
        
        // const snackbarClose = (event, reason) => {
        //    if (reason === "clickaway") {
        //        return;
        //    }
        //    setState({
        //    msg: `${state.travelers.length} travelers loaded`,
        //    contactServer: false,
        //    });
        //    };
        
        return (
           <ThemeProvider theme={theme}>
               <Card className="card">
               <Project1Component  />
                   <CardHeader
                       title="Add Advisory"
                       style={{ color: theme.palette.primary.main, textAlign: "center" }}
                   />
                   <CardContent>
                       <div>
                           <Autocomplete
                               id="countries"
                               options={state.countrynames}
                               getOptionLabel={(option) => option}
                               style={{ width: 300 }}
                               //onChange={onChange}
                               renderInput={(params) => (
                               <TextField
                                   {...params}
                                   label="countries"
                                   variant="outlined"
                                   fullWidth
                               />
                               )}
                           />
                           <Typography color="error">{state.msg}</Typography>
                       </div>
                   </CardContent>
               </Card>
           </ThemeProvider>
           );
};

export default AdvisoryAddComponent;