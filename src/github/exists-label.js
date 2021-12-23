/**
 * Check if the label already exists in the repository
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {string} labelName
 */
module.exports = async (tools, labelName) => {
  try {
    const {
      data: labelsForRepositories,
    } = await tools.github.paginate(tools.github.issues.listLabelsForRepo, {
      ...tools.context.repo,
    });

    tools.log.info(`what's this??? ${labelsForRepositories}`)
 
    const x = await tools.github.paginate(tools.github.issues.listLabelsForRepo, {
      ...tools.context.repo,
    })

    tools.log.info(`waht's this??????? ${x}`)

    x.forEach((labels) => {
        labels.find((label) => {
          if (label.name === labelName) {
            return true;
          }
        });
      })
    return false;
  } catch (error) {
    tools.log.info(
      `Error happens when we was checking labels in the repository: ${error}`,
    );
    return false;
  }
};