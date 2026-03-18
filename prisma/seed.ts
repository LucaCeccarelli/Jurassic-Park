import { Diet } from "@/prisma/generated/client";
import { prisma } from "@/lib/prisma";

async function main() {
	console.log("🦖 Début du nettoyage...");
	// On supprime dans l'ordre pour éviter les erreurs de clés étrangères
	await prisma.ticket.deleteMany({});
	await prisma.order.deleteMany({});
	await prisma.dinosaur.deleteMany({});
	await prisma.zone.deleteMany({});

	console.log("🗺️ Création des zones...");
	const plaines = await prisma.zone.create({
		data: { name: "Plaines Herbivores", coordinates: { x: 10, y: 20 } },
	});
	const vallee = await prisma.zone.create({
		data: { name: "Vallée des Prédateurs", coordinates: { x: 50, y: 50 } },
	});
	const lagon = await prisma.zone.create({
		data: { name: "Lagon Aquatique", coordinates: { x: 80, y: 30 } },
	});

	console.log("🦕 Insertion des spécimens...");
	await prisma.dinosaur.createMany({
		data: [
			{
				name: "T-Rex",
				species: "Tyrannosaurus rex",
				period: "Crétacé",
				diet: Diet.CARNIVORE,
				dangerLevel: 5,
				description: "Le prédateur ultime du parc.",
				zoneId: vallee.id,
			},
			{
				name: "Tricératops",
				species: "Triceratops horridus",
				period: "Crétacé",
				diet: Diet.HERBIVORE,
				dangerLevel: 2,
				description: "Un colosse paisible avec trois cornes protectrices.",
				zoneId: plaines.id,
			},
			{
				name: "Mosasaurus",
				species: "Mosasaurus hoffmannii",
				period: "Crétacé",
				diet: Diet.PISCIVORE,
				dangerLevel: 5,
				description: "La terreur des océans, enfin dans notre bassin.",
				zoneId: lagon.id,
			},
		],
	});

	console.log("✅ Seed terminé ! Bon dev !");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
