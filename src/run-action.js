const createLabelIfNotExists = require('./github/create-label-if-not-exists');
const addLabel = require('./github/add-label');
const removeLabel = require('./github/remove-label');

module.exports = async tools => {
    const xs = {
        size : tools.inputs.xs_max_size,
        color : 'abdee6'
    }

    const s = {
        size : tools.inputs.s_max_size,
        color : 'cbaacb'
    }

    const m = {
        size : tools.inputs.m_max_size,
        color : 'ffaea5'
    }

    const l = {
        size : tools.inputs.l_max_size,
        color : 'ffffb5'
    }

    await Promise.all([
        createLabelIfNotExists(tools, 'size_xs', xs),
        createLabelIfNotExists(tools, 'size_s', s),
        createLabelIfNotExists(tools, 'size_m', m),
        createLabelIfNotExists(tools, 'size_l', l),
    ]);
};