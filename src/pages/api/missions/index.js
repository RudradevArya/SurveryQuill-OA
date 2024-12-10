import dbConnect from '../../../utils/dbConnect';
import Mission from '../../../models/Mission';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const missions = await Mission.find({});
        res.status(200).json({ success: true, data: missions });
      } catch (error) {
        console.error('Error fetching missions:', error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const mission = await Mission.create(req.body);
        res.status(201).json({ success: true, data: mission });
      } catch (error) {
        console.error('Error creating mission:', error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}