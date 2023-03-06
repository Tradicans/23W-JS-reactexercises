import React, { useReducer, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Autocomplete,
 Card,
 CardHeader,
 CardContent,
 Typography,
 TextField,
 IconButton,
 Button,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import Project1Component from "./project1component";

const AdvisoryAddComponent = (props) => {

    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        travelername: "",
        selectedCountry: "",
        countries: "",
        //numcountries: 249,
        alerts: [],
        countrynames: [],
        alerttext: "",
        date: "",
        };
        const sendSnack = (msg) => {
            props.dataFromAdd(msg);
            };
        const reducer = (state, newState) => ({ ...state, ...newState });
        const [state, setState] = useReducer(reducer, initialState);
        const onChange = async (e, selectedOption) => {
           // setState({date: Date.now.toString});
           const currDate = new Date();
           setState({date: currDate.toISOString()});
            let queryString = `query {alertbycountry(name: "${selectedOption}"){text}}`;
            let response = await fetch(`http://localhost:5000/graphql`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: queryString}),
                });
            let json = await response.json();

            let alertText = json.data.alertbycountry.text;
            selectedOption
                ? setState({selectedCountry: selectedOption, alerttext: alertText})
                : setState({selectedCountry: "", alerttext: ""});
         };
        useEffect(() => {
           fetchCountries();
           }, []);
        const fetchCountries = async () => {
           try {
               setState({
               contactServer: true,
               snackBarMsg: "Attempting to load countries from server...",
               });
               sendSnack("Attempting to load countries from server...");
               let response = await fetch("http://localhost:5000/graphql", {
                   method: "POST",
                   headers: {
                   "Content-Type": "application/json; charset=utf-8",
                   },
                   body: JSON.stringify({ query: "query { alerts{name, text} }" }),
                   });
               let json = await response.json();
               setState({
                   snackBarMsg: 'loaded # countries',
                   alerts: json.data.alerts,
                   //numcountries: json.data.length,
                   contactServer: true,
                   countrynames: json.data.alerts.map((a) => a.name),
                   });
                   sendSnack(`loaded ${json.data.alerts.length} countries`);
           } catch (error) {
               console.log(error);
               setState({
                   msg: `Problem loading server data - ${error.message}`,
               });
           }
           

        };
        
        const onAddClicked = async () => {

            let advisory = {
            name: state.travelername,
            country: state.selectedCountry,
            text: state.alerttext,
            date: state.date,
            };
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            try {
            let query = JSON.stringify({
            query: `mutation {addadvisory(name: "${advisory.name}",country: "${advisory.country}", text: "${advisory.text}", date: "${advisory.date}" ) 
           { name, country, text, date }}`,
            });
            console.log(query);
            let response = await fetch("http://localhost:5000/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: query,
            });
            let json = await response.json();
            setState({
            showMsg: true,
            snackbarMsg: `added advisory on ${json.data.addadvisory.date}`,
            travelername: "",
            selectedCountry: "",
            alerttext: "",
            date: "",
            countries: "",
            });
            sendSnack(`added advisory on ${json.data.addadvisory.date}`);
            
            } catch (error) {
            setState({
            snackbarMsg: `${error.message} - advisory not added`,
            showMsg: true,
            });
            sendSnack(`${error.message} - advisory not added`);
            }
            };

//done: schema for advisory and mutation
//done: resolver for advisory and mutation
//done: query for advisories
//done: add to AdvisoryAddComponent to track text for selected country
//done: add code to actually add advisory - where?
//done: add additional db to env and conf?
//done: get snackbox working
//done: get date working
//done: clear autocomplete field after item added
//done: fix country num in snackbox
//done: snackbox on setupcomponent

        const handleNameInput = (e) => {
            setState({ travelername: e.target.value });
            };

        
 const emptyorundefined =
 state.travelername === undefined ||
 state.travelername === "" ||
 state.selectedCountry === undefined ||
 state.selectedCountry === "";




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
                        <TextField
                         onChange={handleNameInput}
                         placeholder="Traveler's name"
                         value={state.travelername}
                         />
                    </div>
                    <p></p>
                       <div>
                           <Autocomplete
                               id="countries"
                               options={state.countrynames}
                               getOptionLabel={(option) => option}
                               style={{ width: 300 }}
                               onChange={onChange}
                               value={state.selectedCountry}
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
                       <p></p>
                       <div>
                       <Button
                       
 color="secondary"
 variant="contained"
onClick={onAddClicked}
 disabled={emptyorundefined}
 >
Add Advisory
 </Button>
 
                       </div>
                   </CardContent>
               </Card>
           </ThemeProvider>
           );
};

export default AdvisoryAddComponent;