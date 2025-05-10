import prisma from "@/utils/dbconfig";

// POST /api/medical-record/create
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patientId, doctorId, description, diagnosis, treatment } = body;

    // Create the medical record
    const record = await prisma.medicalRecord.create({
      data: {
        patientId,
        doctorId,
        description,
        diagnosis,
        treatment,
      },
    });

    return new Response(JSON.stringify(record), { status: 201 });
  } catch (error) {
    console.error("Error creating medical record:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
