const { spacing, fontSizes, radius } = require('./styles/tokens');
const { colors } = require('./styles/colors');
function mapColors(arr) {
  return arr.reduce((acc, c, idx) => {
    const key = idx === 0 ? 50 : idx * 100;
    acc[key] = c;
    return acc;
  }, {});
}
module.exports = {
    content: [
        './app/**/*.{ts,tsx,js,jsx}',        // App Router
        './components/**/*.{ts,tsx,js,jsx}', // Components
        './pages/**/*.{ts,tsx,js,jsx}',      // Pages Router if any
    ],
    theme: {
        extend: {
            spacing: {
                xxxs: spacing.xxxs,
                xxs: spacing.xxs,
                xs: spacing.xs,
                sm: spacing.sm,
                md: spacing.md,
                lg: spacing.lg,
                xl: spacing.xl,
            },
            fontSize: {
                xxxs: fontSizes.xxxs,
                xxs: fontSizes.xxs,
                xs: fontSizes.xs,
                sm: fontSizes.sm,
                md: fontSizes.md,
                lg: fontSizes.lg,
                xl: fontSizes.xl,
            },
            borderRadius: {
                sm: radius.sm,
                md: radius.md,
                lg: radius.lg,
                full: radius.full,
            },
            colors: {
                primary: mapColors(colors.roseRed),
                secondary: mapColors(colors.cyan),
                success: mapColors(colors.success),
                error: mapColors(colors.error),
                gray: mapColors(colors.gray),
                dark: mapColors(colors.dark),
            },
        },
    },
};
