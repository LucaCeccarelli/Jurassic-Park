import { getDinosaurs } from "@/lib/db/dinosaurs";
import { Badge } from "@/components/ui/badge"; // Si tu utilises shadcn/ui

export default async function DinosaurPage() {
	const dinosaurs = await getDinosaurs();

	return (
		<main className='max-w-7xl mx-auto p-8'>
			<header className='mb-12 text-center'>
				<h1 className='text-5xl font-bold mb-4'>Nos Spécimens</h1>
				<p className='text-muted-foreground italic'>
					Explorez les créatures qui peuplent nos enclos.
				</p>
			</header>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{dinosaurs.map((dino) => (
					<div
						key={dino.id}
						className='border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow'
					>
						{/* Image Placeholder */}
						<div className='h-48 bg-slate-200 relative'>
							{/* Ici ton composant Image Next.js */}
							<div className='absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
								{dino.zone.name}
							</div>
						</div>

						<div className='p-6'>
							<div className='flex justify-between items-start mb-2'>
								<h2 className='text-2xl font-bold'>{dino.name}</h2>
								<span
									className={`px-2 py-1 rounded text-xs font-bold ${getDietColor(dino.diet)}`}
								>
									{dino.diet}
								</span>
							</div>
							<p className='text-sm text-slate-500 mb-4'>
								{dino.species} • {dino.period}
							</p>
							<p className='line-clamp-3 text-slate-700 mb-4'>
								{dino.description}
							</p>

							<div className='flex items-center gap-2'>
								<span className='text-xs uppercase font-semibold text-slate-400'>
									Niveau de danger :
								</span>
								<div className='flex gap-1'>
									{[...Array(5)].map((_, i) => (
										<div
											key={i}
											className={`h-2 w-6 rounded-sm ${i < dino.dangerLevel ? "bg-red-500" : "bg-slate-200"}`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}

// Petite fonction utilitaire pour les couleurs de régime alimentaire
function getDietColor(diet: string) {
	switch (diet) {
		case "CARNIVORE":
			return "bg-red-100 text-red-700";
		case "HERBIVORE":
			return "bg-green-100 text-green-700";
		default:
			return "bg-blue-100 text-blue-700";
	}
}
