const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  // UBAH DARI: disable: process.env.NODE_ENV === "development",
  // MENJADI:
  disable: false,
});
