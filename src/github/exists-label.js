/**
 * Check if the label already exists in the repository
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {string} labelName
 */

import {Toolkit} from "actions-toolkit";
module.exports = async (_tools, labelName) => {
  const tools = new Toolkit()
  try {
    tools.github.issues.listLabelsForRepo
    const labelsForRepository = await tools.github.paginate(tools.github.issues.listLabelsForRepo, {
      ...tools.context.repo,
    })

    return !!labelsForRepository.find(label => {
      tools.log.info(`what's this ${label}`)
      return label.name === labelName;
    });
  } catch (error) {
    tools.log.info(
      `Error happens when we was checking labels in the repository: ${error}`,
    );
    return false;
  }
};