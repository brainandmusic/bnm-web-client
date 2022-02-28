import dbConnect from "lib/dbConnect";
import User from "models/User";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOneAndUpdate({ _id: id }, { role: body });
        res.status(200).send();
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
      }
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
