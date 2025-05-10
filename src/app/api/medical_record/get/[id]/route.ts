import prisma from "@/utils/dbconfig";

export async function GET(
  req: Request,
  { params }: { params: { patientId: string } }
) {
  const { patientId } = params;

  try {
    const records = await prisma.medicalRecord.findMany({
      where: { patientId },
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(records), { status: 200 });
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
