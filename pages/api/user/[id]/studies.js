import dbConnect from "lib/dbConnect";
import Study from "models/Study";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const studies = await Study.find({
          $or: [{ creator: id }, { members: id }],
        });
        res.status(200).json({ data: studies });
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
