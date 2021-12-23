/**
 * Check if the label already exists in the repository
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {string} labelName
 */
module.exports = async (tools, labelName) => {
  try {
    const labelsForRepository = await tools.github.paginate(tools.github.issues.listLabelsForRepo, {
      ...tools.context.repo,
    })

    labelsForRepositories.forEach((labels) => {
        labels.find((label) => {
          if (label.name === labelName) {
            return true;
          }
        });
      })
    return false
  } catch (error) {
    tools.log.info(
      `Error happens when we was checking labels in the repository: ${error}`,
    );
    return false;
  }
};