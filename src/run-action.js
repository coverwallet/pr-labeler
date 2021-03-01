const createLabelIfNotExists = require('./github/create-label-if-not-exists');
const addLabel = require('./github/add-label');
const removeLabel = require('./github/remove-label');

module.exports = async tools => {
  const size_xs = tools.inputs.size_xs;
  const size_s = tools.inputs.size_s;
  const size_m = tools.inputs.size_m;
  const size_l = tools.inputs.size_l;

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