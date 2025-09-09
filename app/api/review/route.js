import dbConnect from "@/lib/db";
import Review from "@/models/Review";

// GET all reviews
export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find().sort({ createdAt: -1 }); // latest first
    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return new Response(JSON.stringify({ message: "Error fetching reviews" }), { status: 500 });
  }
}

// POST new review
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // ✅ Validate required fields
    const { name, email, rating, comment } = body;
    if (!name || !email || !rating || !comment) {
      return new Response(JSON.stringify({ message: "All fields are required!" }), { status: 422 });
    }

    const newReview = new Review(body);
    await newReview.save();

    return new Response(JSON.stringify({ message: "Review saved successfully!" }), { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ message: "Error saving review" }), { status: 500 });
  }
}
