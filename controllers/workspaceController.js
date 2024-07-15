const Workspace = require('../models/Workspace');

exports.createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;
    const workspace = new Workspace({ name, user: req.user.id, canvasColor: '#ffffff'});
    await workspace.save();
    res.status(201).json(workspace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ user: req.user.id });
    res.json(workspaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({ _id: req.params.id, user: req.user.id });
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    res.json(workspace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateWorkspace = async (req, res) => {
  try {
    const { name, elements, canvasColor } = req.body;
    const workspace = await Workspace.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, elements, canvasColor },
      { new: true }
    );
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    res.json(workspace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    res.json({ message: 'Workspace deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};