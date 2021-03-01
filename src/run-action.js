const createLabelIfNotExists = require('./github/create-label-if-not-exists');
const addLabel = require('./github/add-label');
const removeLabel = require('./github/remove-label');

module.exports = async tools => {
  await Promise.all([
    createLabelIfNotExists(tools, 'size_xs','abdee6'),
    createLabelIfNotExists(tools, 'size_s', 'cbaacb'),
    createLabelIfNotExists(tools, 'size_m', 'ffaea5'),
    createLabelIfNotExists(tools, 'size_l', 'ffffb5'),
  ]);

  //await Promise.all([
  //  removeLabel(tools, readyToReviewLabel),
  //  addLabel(tools, workInProgressLabel),
  //]);
};