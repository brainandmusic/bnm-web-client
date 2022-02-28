import dbConnect from "lib/dbConnect";
import Experiment from "models/Experiment";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const experiments = await Experiment.find({
          $or: [{ creator: id }, { members: id }],
        });
        res.status(200).json({ data: experiments });
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
