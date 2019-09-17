import React from "react";
import ReactDOM from "react-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TimeDisplayer from "./TimeDisplayer";
import PositionedSnackbar from "./SpentTime";
import WatchIcon from "@material-ui/icons/Watch";
import Typography from '@material-ui/core/Typography';

import "./styles.css";

function createData(entry, departure) {
  return { entry, departure };
}

function msToTime(s) {
  if (isNaN(s)) {
    return "";
  }
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ":" + mins + ":" + secs;
}

class App extends React.Component {
  state = {
    rows: [],
    dataCounter: 0,
    snackBarOpen: false,
    time: 0
  };

  handleEntry = () => {
    var fullDate = new Date();
    var time = fullDate;
    let temp = [...this.state.rows];

    if (this.state.dataCounter % 2 === 0) {
      temp.push(createData(time, ""));
      this.setState(prevState => ({
        rows: temp,
        dataCounter: prevState.dataCounter + 1
      }));
    } else {
      temp[temp.length - 1].departure = time;
      this.setState(prevState => ({
        rows: temp,
        dataCounter: prevState.dataCounter + 1,
        time:
          prevState.time +
          temp[temp.length - 1].departure.getTime() -
          temp[temp.length - 1].entry.getTime()
      }));
    }
  };

  handleReset = () => {
    this.setState({
      rows: [],
      dataCounter: 0,
      snackBarOpen: false,
      time: 0
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      snackBarOpen: false
    });
  };

  EditEntry = index => {
    console.log(index);
  };

  render() {
    return (
      <div className="App">
      <div className="Table">
        <TimeDisplayer EditEntry={this.EditEntry} rows={this.state.rows} />
        </div>
        <div className="TimeSpent" />
        <PositionedSnackbar
          time={msToTime(this.state.time)}
          isOpen={this.state.snackBarOpen}
        />

        <div className="Buttons">
            <Button
              onClick={() => {
                this.setState(prevState => ({
                  snackBarOpen: !prevState.snackBarOpen
                }));
              }}
              variant="outlined"
              color="primary"
              className="Button"
              style={{ fontSize: '0.8em' }}
            >
            <Typography nowrap variant='button'>
            Time
            </Typography>
              <WatchIcon className="RightIcon" />
            </Button>
            <Button
              onClick={this.handleEntry}
              variant="outlined"
              color="primary"
              className="Button"
              style={{ fontSize: '0.8em', textOverflow: "ellipsis" }}
            >
            <Typography nowrap variant='button'>
            Enter/Depart
            </Typography>
              <AlarmIcon className="RightIcon" />
            </Button>
            <Button
              onClick={this.handleReset}
              className="Button"
              variant="outlined"
              color="primary"
              style={{ fontSize: '0.8em' }}
            >
            <Typography nowrap variant='button'>
            Reset
            </Typography>
              <DeleteIcon className="RightIcon" />
            </Button>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
