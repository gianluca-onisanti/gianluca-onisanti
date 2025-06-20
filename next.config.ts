import { NextConfig } from "next";
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n.js");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  devIndicators: false,
};

module.exports = withNextIntl(nextConfig);
