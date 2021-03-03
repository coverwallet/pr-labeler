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

const getNumberOfLines = async (tools) => {
  return 1000;
};


const removeLabelForLineChanges = async (tools, labelConfig, label) => {
  await Promise.all(
    labelConfig.map((item) => {
      if (item.name!=label  && existsLabel(tools, item.name)) {
        removeLabel(tools, item.name);
      }
    })
  )
};

const assignLabelForLineChanges = async (tools, numberOfLines, labelConfig) => {
  for (let i = 0; i < labelConfig.length; i++) {
    if (numberOfLines <= labelConfig[i].size) {
      addLabel(tools, labelConfig[i].name);
      return labelConfig[i].name;
    }
  }
};

module.exports = async (tools) => {
  const labelConfig = getLabelConfig(tools);
  await createLabelsIfNotExists(tools, labelConfig);
  const numberOfLines = await getNumberOfLines(tools);
  const label = await assignLabelForLineChanges(tools, numberOfLines, labelConfig);
  await removeLabelForLineChanges(tools,labelConfig, label);

};
