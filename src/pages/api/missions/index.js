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
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const mission = await Mission.create(req.body);
        res.status(201).json({ success: true, data: mission });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}