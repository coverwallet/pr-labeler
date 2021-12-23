/**
 * Check if the label already exists in the repository
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {string} labelName
 */

import { Toolkit } from "actions-toolkit";


module.exports = async (tools, labelName) => {
  try {
    tools.github.issues.listForRepo()
    const labelsForRepository = await tools.github.paginate("GET /repos/{owner}/{repo}/labels", {
      ...tools.context.repo,
    })

    return !!labelsForRepository.find(label => {
      return label.name === labelName;
    });
  } catch (error) {
    tools.log.info(
      `Error happens when we was checking labels in the repository: ${error}`,
    );
    return false;
  }
};