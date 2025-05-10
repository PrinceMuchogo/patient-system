import prisma from "@/utils/dbconfig";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const patient = await prisma.patient.findUnique({
      where: { userId: id },
      include: {
        user: true,
        records: {
          include: {
            doctor: {
              include: { user: true },
            },
          },
        },
      },
    });

    if (!patient) {
      return new Response(JSON.stringify({ message: "Patient not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(patient), { status: 200 });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
