import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "gray",
  defaultGradient: {
    from: "gray.3",
    to: "gray.5",
    deg: 45,
  },
  primaryShade: 5,

  colors: {
    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
    ],
  },

  fontFamily: "Inter, sans-serif",
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
  },

  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  components: {
    Modal: {
      defaultProps: {
        centered: true,
        overlayProps: {
          backgroundOpacity: 0.55,
          blur: 3,
        },
      },
      styles: {
        title: {
          fontWeight: 600,
        },
      },
    },
    Button: {
      styles: {
        root: {
          fontWeight: 600,
          borderRadius: "8px",
        },
      },
    },
    Card: {
      styles: {
        root: {
          backgroundColor: "var(--mantine-color-body)",
          borderRadius: "12px",
          border: "1px solid black",
        },
      },
    },
  },
});
