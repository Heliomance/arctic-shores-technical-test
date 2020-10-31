import React from "react";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import {Octokit} from "@octokit/rest";
import {Repo} from "./gitTypes";
import {AppState} from "./App";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface SearchPagePropsPartial {
    octokit: Octokit;
    updateAppState: (state: AppState) => void;
    searchResults?: Repo[];
};

type SearchPageProps = SearchPagePropsPartial & RouteComponentProps;

interface SearchPageState {
    searchString: string;
}

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
    constructor(props: SearchPageProps) {
        super(props);
        this.state = {
            searchString: ""
        };
    };

    render() {
        return (
            <Box>
                <TextField id={"standard-basic"} label={"Enter search string"}
                           onChange={this._onSearchStringChange}></TextField>
                <Button variant="contained" onClick={() => this._onClickSearch()}>Search</Button>
                <Paper>
                    <TableContainer className={"resultsTableContainer"}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {["Repo Name", "Author", "Image", "Stars", "Watchers"].map(
                                        header => <TableCell>{header}</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.searchResults?.map(item => (
                                    <TableRow className={"resultsTableRow"} onClick={() => this._onClickRow(item.id)} key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.owner.login}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{item.stargazers_count}</TableCell>
                                        <TableCell>{item.watchers_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        );
    };

    private async _onClickSearch() {
        const results = await this.props.octokit.search.repos({
            q: this.state.searchString,
            sort: "stars"
        });

        this.props.updateAppState({
            searchResults: results.data.items
        });
    };

    private _onClickRow(repoId: number) {
        this.props.updateAppState({
            focusedRepo: repoId
        });
        this.props.history.push("/detail");
    };

    private _onSearchStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({searchString: event.target.value});
    };
}

export default withRouter(SearchPage);