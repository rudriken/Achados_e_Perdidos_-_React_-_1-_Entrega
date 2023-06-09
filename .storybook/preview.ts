import type { Preview } from "@storybook/react";
import StoryTemaProvedor from "../src/visual/temas/StoryTemaProvedor";

export const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export const decorators = [StoryTemaProvedor];
