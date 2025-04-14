"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import { IconArrowRight, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "./HeroSection.module.css";

export function HeroSection() {
	const router = useRouter();

	return (
		<Container pt="sm" size="lg" className={classes.wrapper}>
			<div className={classes.inner}>
				<Title className={classes.title}>Flori-signature</Title>
				<Title className={classes.subtitle}>
					Maak je eigen e-mail handtekening met een paar klikken!
				</Title>

				<Group mt={20}>
					<Button
						size="lg"
						className={classes.control}
						color="#3AAC4E"
						onClick={() => {
							router.push("dashboard/signature");
						}}
						rightSection={<IconArrowRight size={16} />}
					>
						Aan de slag
					</Button>
				</Group>
			</div>
		</Container>
	);
}
