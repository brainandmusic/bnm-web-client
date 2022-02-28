import dbConnect from "lib/dbConnect";
import Study from "models/Study";

export default async function handler(req, res) {
  const {
    method,
    query: { uid, q },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      switch (q) {
        case "studies":
          try {
            const studies = await Study.find({
              $or: [{ creator: uid }, { members: uid }],
            });
            res.status(200).json({ success: true, data: studies });
          } catch (error) {
            res.status(400).json({ success: false });
          }
          break;
        case "users":
          try {
            const users = await User.find({});
            res.status(200).json({ success: true, data: users });
          } catch (error) {
            res.status(400).json({ success });
          }
          break;
        default:
          res.status(400).json({ success: false });
          break;
      }
      break;
    // case "POST":
    //   try {
    //     const pet = await Pet.create(
    //       req.body
    //     ); /* create a new model in the database */
    //     res.status(201).json({ success: true, data: pet });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
