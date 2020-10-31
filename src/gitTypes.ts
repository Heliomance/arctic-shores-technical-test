import {Endpoints} from "@octokit/types";

export type Repo = Endpoints["GET /search/repositories"]["response"]["data"]["items"][0];