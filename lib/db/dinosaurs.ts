import { prisma } from "@/lib/prisma"; // Ton instance Prisma

export async function getDinosaurs(filter?: string) {
	return await prisma.dinosaur.findMany({
		where: filter
			? {
					OR: [
						{ name: { contains: filter, mode: "insensitive" } },
						{ species: { contains: filter, mode: "insensitive" } },
					],
				}
			: {},
		include: { zone: true },
		orderBy: { name: "asc" },
	});
}
