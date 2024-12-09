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
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: mission });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const mission = await Mission.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!mission) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: mission });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedMission = await Mission.deleteOne({ _id: id });
        if (!deletedMission) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}