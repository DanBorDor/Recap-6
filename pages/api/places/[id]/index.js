import dbConnect from "../../../../lib/dbConnect";
import Place from "../../../../models/Place";

export default async function handler(request, response) {
  const { id } = request.query;

  await dbConnect();

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return response.status(404).json({ message: "Place not found" });
      }
      response.status(200).json(place);
    } catch (error) {
      response.status(500).json({ message: "An error occurred" });
    }
  } else if (request.method === "PATCH") {
    try {
      const updatedPlace = await Place.findByIdAndUpdate(id, request.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedPlace) {
        return response.status(404).json({ message: "Place not found" });
      }
      response.status(200).json(updatedPlace);
    } catch (error) {
      response.status(400).json({ message: "Failed to update place" });
    }
  } else if (request.method === "DELETE") {
    try {
      const deletedPlace = await Place.findByIdAndDelete(id);
      if (!deletedPlace) {
        return response.status(404).json({ message: "Place not found" });
      }
      response.status(200).json({ message: "Place deleted successfully" });
    } catch (error) {
      response.status(500).json({ message: "Failed to delete place" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
