"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
	fontFamily: "Space Grotesk, sans-serif",
	headings: {
		fontFamily: "Space Grotesk, sans-serif",
	},
	primaryShade: 9,
	colors: {
		primary: [
			"#f2f2f8",
			"#e1e0ea",
			"#bfbed5",
			"#9c9ac2",
			"#7e7cb1",
			"#6b68a7",
			"#615fa3",
			"#514f8f",
			"#484680",
			"#363565"
		],
	},
	primaryColor: "primary",
	defaultRadius: "md",
});
