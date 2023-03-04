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

const AdvisoryAddComponent = () => {
    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        travelername: "",
        selectedCountry: "",
        countrynames: [],
        };
       
        const reducer = (state, newState) => ({ ...state, ...newState });
        const [state, setState] = useReducer(reducer, initialState);
       
        const onChange = async (e, selectedOption) => {
            selectedOption
                ? setState({selectedCountry: selectedOption})
                : setState({selectedCountry: ""});
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
        
        // const onAddClicked = async () => {
        //     let user = {
        //     name: state.name,
        //     age: state.age,
        //     email: state.email,
        //     };
        //     let myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");
        //     try {
        //     let query = JSON.stringify({
        //     query: `mutation {adduser(name: "${user.name}",age: ${user.age}, email: "${user.email}" ) 
        //    { name, age, email }}`,
        //     });
        //     console.log(query);
        //     let response = await fetch("http://localhost:5000/graphql", {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json; charset=utf-8",
        //     },
        //     body: query,
        //     });
        //     let json = await response.json();
        //     setState({
        //     showMsg: true,
        //     snackbarMsg: `User ${json.data.adduser.name} added`,
        //     name: "",
        //     age: 0,
        //     email: "",
        //     });
        //     } catch (error) {
        //     setState({
        //     snackbarMsg: `${error.message} - user not added`,
        //     showMsg: true,
        //     });
        //     }
        //     };

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
// onClick={onAddClicked}
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