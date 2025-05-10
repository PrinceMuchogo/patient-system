import prisma from "@/utils/dbconfig";

// POST /api/doctor/create
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, specialization, licenseNumber } = body;

    // Create the user first
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: "doctor",
      },
    });

    // Then create the doctor
    const doctor = await prisma.doctor.create({
      data: {
        userId: user.id,
        specialization,
        licenseNumber,
      },
    });

    return new Response(JSON.stringify({ user, doctor }), { status: 201 });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
