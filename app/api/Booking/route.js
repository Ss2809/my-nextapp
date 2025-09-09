import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, phone, date } = await req.json();

    const newBooking = new Booking({
      name,
      phone,
      date,
    });

    await newBooking.save();

    return new Response(JSON.stringify({ message: "Saved successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error saving data" }), {
      status: 500,
    });
  }
}
