import React, { useState, useReducer } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "../App.css";
import {
	Toolbar,
	AppBar,
	Menu,
	MenuItem,
	IconButton,
	Typography,
	Snackbar,
} from "@mui/material";
import Project1Component from "./project1component";
import AlertComponent from "./alertcomponent";
import AdvisoryAddComponent from "./AdvisoryAddComponent";
import AdvisoryListComponent from "./advisorylistcomponent";

const App = () => {
	const initialState = {
		showMsg: false,
		snackBarMsg: "",
	};
	const reducer = (state, newState) => ({ ...state, ...newState });
	const [state, setState] = useReducer(reducer, initialState);

	const snackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setState({ showMsg: false });
	};
	const msgFromChild = (msg) => {
		setState({ snackBarMsg: msg, showMsg: true });
	};
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
					<Typography variant="h6" color="inerit">
						INFO3139 - Project1
					</Typography>
					<IconButton
						id="menubtn"
						onClick={handleClick}
						color="inherit"
						style={{ marginLeft: "auto", paddingRight: "1vh" }}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem component={NavLink} to="/home" onClick={handleClose}>
							Home
						</MenuItem>
						<MenuItem component={NavLink} to="/reset" onClick={handleClose}>
							Reset Data
						</MenuItem>
						<MenuItem component={NavLink} to="/add" onClick={handleClose}>
							Add Advisory
						</MenuItem>
						<MenuItem component={NavLink} to="/list" onClick={handleClose}>
							List Advisories
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<Routes>
				<Route path="/" element={<Project1Component />} />
				<Route path="/home" element={<Project1Component />} />
				<Route
					path="/reset"
					element={<AlertComponent dataFromAlert={msgFromChild} />}
				/>
				<Route
					path="/add"
					element={<AdvisoryAddComponent dataFromAdd={msgFromChild} />}
				/>
				<Route
					path="/list"
					element={<AdvisoryListComponent dataFromList={msgFromChild} />}
				/>
			</Routes>
			<Snackbar
				open={state.showMsg}
				message={state.snackBarMsg}
				autoHideDuration={3000}
				onClose={snackbarClose}
			/>
		</ThemeProvider>
	);
};
export default App;
