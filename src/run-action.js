const createLabelIfNotExists = require('./github/create-label-if-not-exists');
const addLabel = require('./github/add-label');
const removeLabel = require('./github/remove-label');

module.exports = async tools => {
    const xs = {
        name: 'size_xs',
        size : tools.inputs.xs_max_size,
        color : 'abdee6'
    }
    const s = {
        name: 'size_s',
        size : tools.inputs.s_max_size,
        color : 'cbaacb'
    }
    const m = {
        name: 'size_m',
        size : tools.inputs.m_max_size,
        color : 'ffaea5'
    }
    const l = {
        name: 'size_l',
        size : tools.inputs.l_max_size,
        color : 'ffffb5'
    }

    await Promise.all([
        createLabelIfNotExists(tools, xs.name, xs),
        createLabelIfNotExists(tools, s.name, s),
        createLabelIfNotExists(tools, m.name, m),
        createLabelIfNotExists(tools, l.name, l),
    ]);
    await Promise.all([
        addLabel(tools, xs.name)
    ]);
};