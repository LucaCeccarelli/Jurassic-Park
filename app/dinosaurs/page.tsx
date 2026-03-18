import { getDinosaurs } from "@/lib/db/dinosaurs";
import { DinoSearch } from "@/components/dino-search";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default async function DinosaurPage({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;
	const dinosaurs = await getDinosaurs(query);

	return (
		<div className='container py-10 mx-auto'>
			<div className='flex flex-col items-center text-center mb-12 space-y-4'>
				<Badge
					variant='outline'
					className='px-4 py-1 border-primary text-primary'
				>
					Encyclopédie Jurassique
				</Badge>
				<h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
					Les Résidents du Parc
				</h1>
				<p className='text-xl text-muted-foreground max-w-175'>
					Découvrez les fiches techniques de nos spécimens, de leur régime
					alimentaire à leur niveau de dangerosité.
				</p>
			</div>

			<DinoSearch />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{dinosaurs.map((dino) => (
					<Card
						key={dino.id}
						className='overflow-hidden group flex flex-col'
					>
						<div className='aspect-video bg-muted relative overflow-hidden'>
							{/* Image placeholder - Tu pourras mettre <Image /> de Next.js ici */}
							<div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4'>
								<span className='text-white text-sm font-medium flex items-center gap-1'>
									<MapPin className='h-4 w-4' /> {dino.zone.name}
								</span>
							</div>
						</div>

						<CardHeader>
							<div className='flex justify-between items-center mb-1'>
								<Badge className={getDietVariant(dino.diet)}>{dino.diet}</Badge>
								<span className='text-xs font-mono text-muted-foreground'>
									{dino.period}
								</span>
							</div>
							<CardTitle className='text-2xl'>{dino.name}</CardTitle>
							<CardDescription>{dino.species}</CardDescription>
						</CardHeader>

						<CardContent className='grow'>
							<p className='text-sm text-muted-foreground line-clamp-3 italic'>
								{dino.description}
							</p>
						</CardContent>

						<CardFooter className='border-t pt-4 flex flex-col items-start gap-3'>
							<div className='w-full'>
								<div className='flex justify-between text-xs mb-1 uppercase font-bold text-muted-foreground tracking-wider'>
									<span>Niveau de Menace</span>
									<span>{dino.dangerLevel}/5</span>
								</div>
								<div className='flex gap-1 w-full'>
									{[...Array(5)].map((_, i) => (
										<div
											key={i}
											className={`h-1.5 flex-1 rounded-full transition-colors ${
												i < dino.dangerLevel
													? dino.dangerLevel > 3
														? "bg-destructive"
														: "bg-orange-500"
													: "bg-muted"
											}`}
										/>
									))}
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>

			{dinosaurs.length === 0 && (
				<div className='text-center py-20 text-muted-foreground border rounded-lg border-dashed'>
					Aucun dinosaure ne correspond à votre recherche. Ils se cachent
					peut-être dans la jungle...
				</div>
			)}
		</div>
	);
}

function getDietVariant(diet: string) {
	switch (diet) {
		case "CARNIVORE":
			return "destructive";
		case "HERBIVORE":
			return "secondary";
		default:
			return "outline";
	}
}
