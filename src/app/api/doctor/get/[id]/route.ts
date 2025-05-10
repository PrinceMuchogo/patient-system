import prisma from "@/utils/dbconfig"; // Adjust if your prisma import path differs

// GET /api/doctor/get/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { userId: id },
      include: {
        user: true,
        records: {
          include: {
            patient: {
              include: { user: true },
            },
          },
        },
      },
    });

    if (!doctor) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
          });    }

          return new Response(JSON.stringify(doctor), {
            status: 500,
          });  } catch (error) {
    console.error('Error fetching doctor:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
      });  }
}
