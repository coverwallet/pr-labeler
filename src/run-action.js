const createLabelIfNotExists = require('./github/create-label-if-not-exists');
const addLabel = require('./github/add-label');
const removeLabel = require('./github/remove-label');

module.exports = async tools => {
  const size_xs = tools.inputs.xs_max_size;
  const size_s = tools.inputs.s_max_size;
  const size_m = tools.inputs.m_max_size;
  const size_l = tools.inputs.l_max_size;

  await Promise.all([
    createLabelIfNotExists(tools, size_xs,'ABDEE6'),
    createLabelIfNotExists(tools, size_s, 'CBAACB'),
    createLabelIfNotExists(tools, size_m, 'FFAEA5'),
    createLabelIfNotExists(tools, size_l, 'FFFFB5'),
  ]);

  //await Promise.all([
  //  removeLabel(tools, readyToReviewLabel),
  //  addLabel(tools, workInProgressLabel),
  //]);
};