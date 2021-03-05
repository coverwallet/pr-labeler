const createLabelIfNotExists = require('./github/create-label-if-not-exists');
const addLabel = require('./github/add-label');
const removeLabel = require('./github/remove-label');
const existsLabel = require('./github/exists-label');

const getLabelConfig = (tools) => {
  const labelConfig = [
    {
      name: 'size_xs',
      size: tools.inputs.xs_max_size,
      color: 'abdee6',
    },
    {
      name: 'size_s',
      size: tools.inputs.s_max_size,
      color: 'cbaacb',
    },
    {
      name: 'size_m',
      size: tools.inputs.m_max_size,
      color: 'ffaea5',
    },
    {
      name: 'size_l',
      size: tools.inputs.l_max_size,
      color: 'ffffb5',
    },
    {
      name: 'size_xl',
      size: Infinity,
      color: 'cce2cb',
    },
  ];
  return labelConfig;
};

const createLabelsIfNotExists = async (tools, labelConfig) => {
  await Promise.all(
    labelConfig.map((item) =>
      createLabelIfNotExists(tools, item.name, { color: item.color }),
    ),
  );
};

/**
 * @param {import('actions-toolkit').Toolkit} tools
 */

const getNumberOfLines = async (tools) => {
  try {
    tools.log.info(`Listing the files of the pull request`);

    let files = await tools.github.pulls.listFiles({
      ...tools.context.repo,
      pull_number: tools.context.issue.number,
    });

    tools.log.info(files);
  } catch (error) {
    tools.log.info(
      `Error happens when we listing the files of the pull request: ${error}`,
    );
  }
};

const assignLabelForLineChanges = async (tools, numberOfLines, labelConfig) => {
  await Promise.all(
    labelConfig.map(async (item) => {
      const { name } = item;
      if (await existsLabel(tools, name)) {
        await removeLabel(tools, name);
      }
    }),
  );

  const element = labelConfig.find((elem) => numberOfLines <= elem.size);
  if (element) {
    await addLabel(tools, element.name);
  }
};

module.exports = async (tools) => {
  const labelConfig = getLabelConfig(tools);
  await createLabelsIfNotExists(tools, labelConfig);
  const numberOfLines = await getNumberOfLines(tools);
  await assignLabelForLineChanges(tools, numberOfLines, labelConfig);
};
