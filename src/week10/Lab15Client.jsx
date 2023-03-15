import React, { useReducer, useEffect, useRef } from "react";
import io from "socket.io-client";
import { ThemeProvider } from "@mui/material/styles";
import {
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import theme from "../theme";
import SocketClient from "./socketclient";
import "../App.css";
import "../index.css";

const Lab15Client = (props) => {
  const initialState = {
    username: "",
    roomname: "",
    snackBarMsg: "",
    showMsg: false,
    msg: "",
    roomMsg: "",
    socket: null,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const serverConnect = () => {
    try {
      // connect to server locally
      let s = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      });

      setState({ socket: s });
      if (state.socket.io._readyState === "opening")
        // we'll see this if server is down or it'll get overwritten if its up
        setState({ snackBarMsg: "trying to get connection...", showMsg: true });
    } catch (err) {
      console.log(err);
      setState({ snackBarMsg: "some other problem occurred", showMsg: true });
    }
  };
  const userConnect = () => {
    state.socket.emit(
      "join",
      { name: state.username, room: state.roomname },
      (err) => {}
    );
    state.socket.on("welcome", onWelcome);
    state.socket.on("newclient", newClientJoined);
  };
  const onWelcome = (welcomeMsgFromServer) => {
    setState({ snackBarMsg: welcomeMsgFromServer, showMsg: true });
  };
  const newClientJoined = (joinMsgFromServer) => {
    setState({ roomMsg: joinMsgFromServer });
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ showMsg: false });
  };
  const onJoinClicked = () => {
    state.socket.io._readyState !== "closed"
      ? // emit join here
        userConnect()
      : // setState({
        //   snackBarMsg: SocketClient({
        //     name: state.username,
        //     room: state.roomname,
        //   }),
        //   showMsg: true,
        // })
        setState({
          snackBarMsg: "can't get connection - try later!",
          showMsg: true,
        });
  };
  const handleUserNameInput = (e) => {
    setState({ username: e.target.value });
  };
  const handleRoomNameInput = (e) => {
    setState({ roomname: e.target.value });
  };
  const emptyorundefined =
    state.username === undefined ||
    state.username === "" ||
    state.roomname === undefined ||
    state.roomname === "";

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Lab 15 - Socket.io"
          style={{ color: theme.palette.primary.main, textAlign: "center" }}
        />
        <CardContent>
          <div>
            <TextField
              onChange={handleUserNameInput}
              placeholder="User name"
              value={state.username}
            />
          </div>
          <p></p>
          <div>
            <TextField
              onChange={handleRoomNameInput}
              placeholder="Room name"
              value={state.roomname}
            />
          </div>
          <p></p>
          <div>
            <Button
              color="secondary"
              variant="contained"
              onClick={onJoinClicked}
              disabled={emptyorundefined}
            >
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
      <div>
        {state.roomMsg ? (
          <div style={{ paddingTop: "2vh" }}>{state.roomMsg}</div>
        ) : null}

        {/* {state.msg ? (
          <div style={{ paddingTop: "2vh" }}>{state.msg}</div>
        ) : null} */}

        {/* <SocketClient name={state.username} room={state.roomname} /> */}
      </div>
      <Snackbar
        open={state.showMsg}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};
export default Lab15Client;
