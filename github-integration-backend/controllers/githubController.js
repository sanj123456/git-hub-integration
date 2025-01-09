const axios = require("axios");
const Integration = require("../models/Integration");
const Organization = require("../models/Organization");
const Repository = require("../models/Repository");
const Commit = require("../models/Commit");
const PullRequest = require("../models/PullRequest");
const ChangeLog = require("../models/ChangeLog");
const Issue = require("../models/Issue");
const User = require("../models/User");
const { ENV_VARIABLES } = require("../helpers");


/** Utility function for GitHub API calls */
const fetchGitHubData = async (url, accessToken, params = {}) => {
  try {
    const response = await axios.get(`${ENV_VARIABLES.GITHUB_API_BASE}${url}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`GitHub API call failed: ${url}`, error);
    throw new Error("Failed to fetch data from GitHub");
  }
};

/** Utility function for batch upsert operations */
const upsertDocuments = async (Model, documents, matchField) => {
  const operations = documents.map((doc) => ({
    updateOne: {
      filter: { [matchField]: doc[matchField] },
      update: { $set: doc },
      upsert: true,
    },
  }));
  await Model.bulkWrite(operations);
};

exports.fetchOrganizations = async (req, res) => {
  try {
    const { accessToken } = req.user;
    const { page = 1, per_page = 10 } = req.query;

    const organizations = await fetchGitHubData("/user/orgs", accessToken, {
      page,
      per_page,
    });

    await upsertDocuments(Organization, organizations, "id");

    res.json({ data: organizations, page, per_page });
  } catch (error) {
    console.error("Error fetching organizations:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch organizations", details: error.message });
  }
};

exports.fetchChangeLogs = async (req, res) => {
  try {
    const { org, repo } = req.params;
    const { accessToken } = req.user;
    const { page = 1, per_page = 10 } = req.query;

    const changeLogs = await fetchGitHubData(
      `/repos/${org}/${repo}/issues/events`,
      accessToken,
      { page, per_page },
    );

    const formattedLogs = changeLogs.map((log) => ({
      id: log.id,
      issue_id: log.issue?.id || null,
      event: log.event,
      commit_id: log.commit_id || null,
      actor: log.actor
        ? {
            id: log.actor.id,
            login: log.actor.login,
            avatar_url: log.actor.avatar_url,
            url: log.actor.url,
          }
        : null,
      created_at: log.created_at,
    }));

    await upsertDocuments(ChangeLog, formattedLogs, "id");

    res.json({ data: changeLogs, page, per_page });
  } catch (error) {
    console.error("Error fetching changelogs:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch changelogs", details: error.message });
  }
};

exports.fetchUsers = async (req, res) => {
  try {
    const { accessToken } = req.user;
    const user = await fetchGitHubData("/user", accessToken);

    await User.updateOne({ id: user.id }, { $set: user }, { upsert: true });

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch user", details: error.message });
  }
};

exports.fetchIssues = async (req, res) => {
  try {
    const { org, repo } = req.params;
    const { accessToken } = req.user;
    const { page = 1, per_page = 10 } = req.query;

    const issues = await fetchGitHubData(
      `/repos/${org}/${repo}/issues`,
      accessToken,
      { page, per_page },
    );

    await upsertDocuments(Issue, issues, "id");

    res.json({ data: issues, page, per_page });
  } catch (error) {
    console.error("Error fetching issues:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch issues", details: error.message });
  }
};

exports.fetchPullRequests = async (req, res) => {
  try {
    const { org, repo } = req.params;
    const { accessToken } = req.user;
    const { page = 1, per_page = 10 } = req.query;

    const pullRequests = await fetchGitHubData(
      `/repos/${org}/${repo}/pulls`,
      accessToken,
      { page, per_page },
    );

    await upsertDocuments(PullRequest, pullRequests, "id");

    res.json({ data: pullRequests, page, per_page });
  } catch (error) {
    console.error("Error fetching pull requests:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch pull requests", details: error.message });
  }
};

exports.fetchCommits = async (req, res) => {
  try {
    const { org, repo } = req.params;
    console.log('req.params: ', req.params)
    const { accessToken } = req.user;
    const { page = 1, per_page = 10 } = req.query;

    const commits = await fetchGitHubData(
      `/repos/${org}/${repo}/commits`,
      accessToken,
      { page, per_page },
    );

    const formattedCommits = commits.map((commit) => ({
      sha: commit.sha,
      ...commit,
    }));

    await upsertDocuments(Commit, formattedCommits, "sha");

    res.json({ data: commits, page, per_page });
  } catch (error) {
    console.error("Error fetching commits:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch commits", details: error.message });
  }
};

exports.fetchRepositories = async (req, res) => {
  try {
    const { org } = req.params;
    const { accessToken } = req.user;
    const { page = 1, per_page = 10 } = req.query;

    const repositories = await fetchGitHubData(
      `/orgs/${org}/repos`,
      accessToken,
      { page, per_page },
    );

    await upsertDocuments(Repository, repositories, "id");

    res.json({ data: repositories, page, per_page });
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch repositories", details: error.message });
  }
};

exports.authenticate = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  // Use req.body instead of req.query
  try {
    // Exchange code for an access token from GitHub
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: ENV_VARIABLES.GITHUB_CLIENT_ID,
        client_secret: ENV_VARIABLES.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } },
    );

    const { access_token, scope, token_type } = tokenResponse.data;

    if (!access_token) {
      throw new Error("Access token not received");
    }

    // Fetch user details from GitHub using the access token
    const userInfo = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userId = userInfo.data.id;

    // Check if an integration already exists for this userId
    const existingIntegration = await Integration.findOne({ userId });

    if (existingIntegration) {
      // Update only if the access token or other details have changed
      if (
        existingIntegration.accessToken !== access_token ||
        existingIntegration.scope !== scope ||
        existingIntegration.tokenType !== token_type
      ) {
        await Integration.updateOne(
          { userId },
          {
            accessToken: access_token,
            scope,
            tokenType: token_type,
            connectedAt: new Date(),
          },
        );
      }

      return res.json({
        message: "User already authenticated",
        integration: existingIntegration,
      });
    }

    // Create a new integration if one doesn't exist
    const integration = new Integration({
      userId,
      accessToken: access_token,
      scope,
      tokenType: token_type,
      connectedAt: new Date(),
    });

    await integration.save();

    res.json({ message: "Authenticated successfully", integration });
  } catch (err) {
    console.error("Authentication failed:", err.message);
    res
      .status(500)
      .json({ error: "Authentication failed", details: err.message });
  }
};

exports.fetchGitHubData = async (req, res) => {
  // Implement fetching data (e.g., organizations, repos, commits)
  // Use the stored access token in the database.
};
exports.getStatus = async (req, res) => {
  try {
    // Fetch integration data from the database
    const integration = await Integration.findOne();
    if (integration) {
      res.json({
        isConnected: true,
        connectionDate: integration.connectedAt,
      });
    } else {
      res.json({
        isConnected: false,
        connectionDate: null,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to retrieve status", details: err.message });
  }
};

exports.removeIntegration = async (req, res) => {
  const { userId } = req.body;
  try {
    await Integration.deleteOne({ userId });
    res.json({ message: "Integration removed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to remove integration", details: err.message });
  }
};
