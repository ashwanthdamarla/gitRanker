/* global chrome */

import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

class GitRanker extends Component {
  constructor(props) {
    super(props);
    this.state = {
        configData: this.props.id,
        profile: this.props.profile,
        loading: false,
        actionDefault: "Check Rank",
      };
  }
  getRankData = async () => {
    var rankData = null;
    if (this.state.configData) {
      rankData = await fetch(
        "https://ratings-api.dev.reputationaire.com/api/result?id=" +
          this.state.configData +
          "&access=f62345e8-9378-425b-b122-ecb4a9610a38",
        {
          method: "GET",
          dataType: "JSON",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          this.setState({ fetchError: false });
          this.setState({ rankData: data });
        })
        .catch((error) => {
          this.setState({ fetchError: true });
          console.log(
            error,
            "An exception has occured while fetching rank API. Please check the application."
          );
        });
    } else {
      return "error";
    }
    this.setState({ loading: false });
    return rankData;
  };

  render() {
    return (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={true}
          style={{
            width: "300px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({ loading: true });
              this.getRankData();
            }}
            style={{
              width: "200px",
              fontSize: 10,
            }}
          >
            {this.state.loading
              ? "Crunching 50 million developers..."
              : this.state.configData&&!this.state.fetchError
              ? this.state.rankData
                ? this.state.rankData.message.average
                  ? "Github rank for the profile " +
                    this.state.profile +
                    " is " +
                    String(
                      (this.state.rankData.message.average * 100).toFixed(2)
                    ) +
                    "%"
                  : this.state.rankData.message.credit_exhausted
                  ? "Sorry Credit Exhausted"
                  : "Error Fetching. Please Try Again"
                : this.state.actionDefault + " for " + this.state.profile
              : this.state.fetchError?"Error while fetching rank API. Please check the application.":"Error Loading. Please Try Again"}
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default GitRanker;
