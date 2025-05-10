import prisma from "@/utils/dbconfig";

// POST /api/patient/create
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, dateOfBirth, gender } = body;

    // Create the user first
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: "patient",
      },
    });

    // Then create the patient
    const patient = await prisma.patient.create({
      data: {
        userId: user.id,
        dateOfBirth: new Date(dateOfBirth),
        gender,
      },
    });

    return new Response(JSON.stringify({ user, patient }), { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
