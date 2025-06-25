const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignee) filter.assignedTo = req.query.assignee;

    // Only admins see all tasks; users see only their assigned tasks
    if (req.user.role !== 'admin') {
      filter.assignedTo = req.user._id;
    }

    const tasks = await Task.find(filter).populate('assignedTo createdBy', 'name email').sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';
    const matchFilter = isAdmin ? {} : { assignedTo: userId };

    const stats = await Task.aggregate([
      { $match: matchFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const totalTasks = await Task.countDocuments(matchFilter);
    const statusCounts = { 'To Do': 0, 'In Progress': 0, 'Done': 0 };
    stats.forEach(stat => statusCounts[stat._id] = stat.count);

    let assignmentStats = [];
    if (isAdmin) {
      assignmentStats = await Task.aggregate([
        { $group: { _id: '$assignedTo', count: { $sum: 1 } } },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' },
        { $project: { name: '$user.name', count: 1 } }
      ]);
    }

    res.json({ totalTasks, statusCounts, assignmentStats });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can create tasks.' });
  }
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;
    const task = await Task.create({ title, description, assignedTo, createdBy: req.user._id, priority, dueDate });
    await task.populate('assignedTo createdBy', 'name email');
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const isAdmin = req.user.role === 'admin';
    const isAssignedUser = task.assignedTo.toString() === req.user._id.toString();

    if (!isAdmin && !isAssignedUser) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    if (!isAdmin && isAssignedUser) {
      if (Object.keys(req.body).length !== 1 || !req.body.status) {
        return res.status(403).json({ message: 'Only status can be updated by assigned user.' });
      }
      task.status = req.body.status;
    } else if (isAdmin) {
      Object.assign(task, req.body);
    }

    await task.save();
    await task.populate('assignedTo createdBy', 'name email');
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can delete tasks.' });
  }
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
