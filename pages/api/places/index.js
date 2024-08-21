import dbConnect from "../../../lib/dbConnect";
import Place from "../../../models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.find({});
      response.status(200).json(places);
    } catch (error) {
      response.status(500).json({ message: "An error occurred" });
    }
  } else if (request.method === "POST") {
    try {
      const newPlace = new Place(request.body);
      await newPlace.save();
      response.status(201).json(newPlace);
    } catch (error) {
      response.status(400).json({ message: "Failed to add place" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
