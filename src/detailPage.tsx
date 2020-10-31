import React from "react";
import {Repo} from "./gitTypes";
import {Avatar, Button, Card, CardContent, Typography} from "@material-ui/core";
import {format} from "date-fns";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface DetailPagePropsPartial {
    repo?: Repo;
}

type DetailPageProps = DetailPagePropsPartial & RouteComponentProps;

class DetailPage extends React.Component<DetailPageProps> {
    render() {
        const repo = this.props.repo;
        return (
            <>
                <Button variant="contained" onClick={() => this.props.history.push("/")}>Back</Button>
                {repo &&
                <Card>
                    <CardContent>
                        <Typography>{repo.name}</Typography>
                        <div className="authorLine">
                            <Avatar src={repo.owner.avatar_url}/>
                            <Typography>{repo.owner.login}</Typography>
                        </div>
                        <Typography>Language: {repo.language}</Typography>
                        <Typography>Last
                            updated: {format(new Date(repo.updated_at), "eeee, do MMMM, yyyy, 'at' HH:mm:ss")}</Typography>
                    </CardContent>
                </Card>
                }
            </>
        );
    }
}

export default withRouter(DetailPage);