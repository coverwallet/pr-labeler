/**
 * Check if the label already exists in the repository
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {string} labelName
 */
module.exports = async (tools, labelName) => {
  try {
    let idx = 0
    let isFind = false
    while (!isFind) {       
      idx += 1
      const { data: labelsForRepository } =
      await tools.github.issues.listLabelsForRepo({
        ...tools.context.repo,
        page: idx
      });

      if (labelsForRepository.length === 0) {
        break
      }

      labelsForRepository.find((label) => {
        if (label.name === labelName) {
          isFind = true
        }
      });  
    }
    return isFind;
  } catch (error) {
    tools.log.info(
      `Error happens when we was checking labels in the repository: ${error}`,
    );
    return false;
  }
};
