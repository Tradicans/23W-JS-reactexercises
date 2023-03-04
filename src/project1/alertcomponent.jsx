import React, { useReducer, useEffect } from "react";
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import {
 Card,
 CardHeader,
 CardContent,
 Snackbar,
 Typography,
 List,
 ListItem,
 ListItemText,
 Divider,
} from "@mui/material";
import "../App.css";
import theme from "./theme";
import Project1Component from "./project1component";
import SetupQuery from "./setupquery";

const AlertComponent = () => {
//  const initialState = {
//  msg: "",
//  snackBarMsg: "",
//  contactServer: false,
//  results: [],
//  };
//  const reducer = (state, newState) => ({ ...state, ...newState });
//  const [state, setState] = useReducer(reducer, initialState);
 

 
//  useEffect(() => {
//  fetchResults();
//  }, []);
//  const fetchResults = async () => {
//  try {
//  setState({
//  contactServer: true,
//  snackBarMsg: "Running setup",
//  });
//  let response = await fetch("http://localhost:5000/graphql", {
//  method: "POST",
//  headers: {
//  "Content-Type": "application/json; charset=utf-8",
//  },
//  body: JSON.stringify({ query: "query { project1_setup{results} }" }),
//  });
//  let json = await response.json();

// // return the JSON to a variable called payload, then
// let resArr = [];
// resArr = json.data.project1_setup.results
//  .replace(/([.])\s*(?=[A-Z])/g, "$1|")
//  .split("|");

//  setState({
//  snackBarMsg: `alerts collection setup completed`,
//  //results: json.data.project1_setup.results,
//  results: resArr,
//  contactServer: false,
//  });
//  } catch (error) {
//  console.log(error);
//  setState({
//  msg: `Problem loading server data - ${error.message}`,
//  });
//  }
//  };
//  const snackbarClose = (event, reason) => {
//  if (reason === "clickaway") {
//  return;
//  }
//  setState({
//  //msg: `${state.results.length} results loaded`,
//  contactServer: false,
//  });
//  };




// import ReactQueryExample from "./week8/reactqueryexample";
const queryClient = new QueryClient();
// const App = () => {
//  return (
//  <QueryClientProvider client={queryClient}>
//  <ReactQueryExample />
//  </QueryClientProvider>
//  );
// };
// export default App;



 return (

    
 <ThemeProvider theme={theme}>
   
 <Card className="card">
 <Project1Component  />
 <CardHeader
 title="Alert Setup - Details"
 style={{ color: theme.palette.primary.main, textAlign: "center" }}
 />
 <CardContent>
  <QueryClientProvider client={queryClient}>
  <SetupQuery />
  </QueryClientProvider>






 </CardContent>
 </Card>
 <Snackbar
//  open={state.contactServer}
//  message={state.snackBarMsg}
//  autoHideDuration={3000}
//  onClose={snackbarClose}
 />
 </ThemeProvider>
 );
};
export default AlertComponent;
