import dbConnect from "lib/dbConnect";
import Experiment from "models/Experiment";

export default async function handler(req, res) {
  const {
    method,
    query: { params },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const experiments = await Experiment.find({});
        res.status(200).json({ experiments });
      } catch (error) {
        res.status(400);
      }
      break;
    default:
      res.status(400);
      break;
  }
}
