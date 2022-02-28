import dbConnect from "lib/dbConnect";
import User from "models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find(
          {},
          { email: 1, firstName: 1, lastName: 1, role: 1 }
        );
        res.status(200).json({ data: users });
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
