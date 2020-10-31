import React from "react";
import {Octokit} from "@octokit/rest";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.scss';
import {Box} from "@material-ui/core"
import SearchPage from "./searchPage";
import {Repo} from "./gitTypes";
import DetailPage from "./detailPage";

const octokit = new Octokit();

export interface AppState {
    searchResults?: Repo[];
    focusedRepo?: number;
}

class App extends React.Component<unknown, AppState> {
    constructor(props: unknown) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Box className="App">
                <Router>
                    <Switch>
                        <Route path={"/detail"}>
                            <DetailPage
                                repo={this.state.searchResults?.find(repo => repo.id === this.state.focusedRepo)}/>
                        </Route>
                        <Route path={"/"}>
                            <SearchPage
                                octokit={octokit}
                                updateAppState={this._updateState}
                                searchResults={this.state.searchResults}/>
                        </Route>
                    </Switch>
                </Router>
            </Box>
        )
    }

    private _updateState = (state: AppState): void => {
        this.setState(state);
    };
}


export default App;
