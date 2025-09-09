import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    await dbConnect(); 
    const { name, email, subject, message } = await req.json();
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

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