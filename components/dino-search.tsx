"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Loader2, Search } from "lucide-react";

export function DinoSearch() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const [isPending, startTransition] = useTransition();

	function handleSearch(term: string) {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}

		startTransition(() => {
			replace(`${pathname}?${params.toString()}`);
		});
	}

	return (
		<div className='relative w-full max-w-sm mx-auto mb-10'>
			<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
			<Input
				placeholder='Rechercher un prédateur ou un herbivore...'
				className='pl-10'
				defaultValue={searchParams.get("query")?.toString()}
				onChange={(e) => handleSearch(e.target.value)}
			/>
			{isPending && (
				<Loader2 className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground' />
			)}
		</div>
	);
}
