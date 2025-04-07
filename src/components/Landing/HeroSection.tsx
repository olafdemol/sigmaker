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

				<Group mt={60}>
					<Button
						size="lg"
						variant="gradient"
						gradient={{ from: "primary", to: "pink" }}
						className={classes.control}
						onClick={() => {
							router.push("/dashboard");
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
