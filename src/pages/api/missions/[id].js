// src/pages/api/missions/[id].js
import dbConnect from '../../../utils/dbConnect';
import Mission from '../../../models/Mission';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const mission = await Mission.findById(id);
        if (!mission) {
          return res.status(404).json({ success: false, error: 'Mission not found' });
        }
        res.status(200).json({ success: true, data: mission });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const mission = await Mission.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!mission) {
          return res.status(404).json({ success: false, error: 'Mission not found' });
        }
        res.status(200).json({ success: true, data: mission });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedMission = await Mission.deleteOne({ _id: id });
        if (!deletedMission) {
          return res.status(404).json({ success: false, error: 'Mission not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}