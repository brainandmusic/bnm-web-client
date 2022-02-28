import dbConnect from "lib/dbConnect";
import Study from "models/Study";
import User from "models/User";
import Group from "models/Group";

async function getUserInfo(ids) {
  return Promise.all(
    ids.map(
      async (id) =>
        await User.findOne(
          { _id: id },
          { firstName: 1, lastName: 1, role: 1, email: 1 }
        )
    )
  );
}

export default async function handler(req, res) {
  const {
    method,
    query: { params },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const [id] = params;
        const study = await Study.findOne({ _id: id });
        const members = await getUserInfo(study.members);
        const participants = await getUserInfo(study.participants);
        const groups = await Group.find(
          { studyId: id },
          { name: 1, creationDate: 1, description: 1 }
        );
        res.status(200).json({
          _id: study._id,
          members: members,
          participants: participants,
          arms: study.arms,
          name: study.name,
          description: study.description,
          groups: groups,
        });
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    case "DELETE":
      try {
        const [id, type, uid] = params;
        const study = await Study.findOneAndUpdate(
          { _id: id },
          { $pull: { [type]: uid } }
        );
        res.status(200).json({});
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    default:
      res.status(400).json({ error: "Invalid method" });
      break;
  }
}
