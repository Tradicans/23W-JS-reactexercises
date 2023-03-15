import { React } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader, CardContent } from "@mui/material";
import "../App.css";
import theme from "./theme";
import Project1Component from "./project1component";
import SetupQuery from "./setupquery";

const AlertComponent = (props) => {
	const queryClient = new QueryClient();

	const sendSnack = (msg) => {
		props.dataFromAlert(msg);
	};
	const msgFromChild = (msg) => {
		sendSnack(msg);
	};
	return (
		<ThemeProvider theme={theme}>
			<Card className="card">
				<Project1Component />
				<CardHeader
					title="Alert Setup - Details"
					style={{ color: theme.palette.primary.main, textAlign: "center" }}
				/>
				<CardContent>
					<QueryClientProvider client={queryClient}>
						<SetupQuery dataFromChild={msgFromChild} />
					</QueryClientProvider>
				</CardContent>
			</Card>
		</ThemeProvider>
	);
};
export default AlertComponent;
