const rgbToLightness = (r: number, g: number, b: number): number =>
  (1 / 2) * (Math.max(r, g, b) + Math.min(r, g, b));

const rgbToSaturation = (r: number, g: number, b: number): number => {
  const L = rgbToLightness(r, g, b);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return L === 0 || L === 1 ? 0 : (max - min) / (1 - Math.abs(2 * L - 1));
};

const rgbToHue = (r: number, g: number, b: number): number => {
  let hue = Math.round(
    (Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI
  );

  while (hue < 0) hue += 360;
  return hue;
};

const rgbToHsl = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  const lightness = rgbToLightness(r, g, b);
  const saturation = rgbToSaturation(r, g, b);
  const hue = rgbToHue(r, g, b);
  return [hue, saturation, lightness];
};

const hslToRgb = (
  h: number,
  s: number,
  l: number
): [number, number, number] => {
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const hPrime = h / 60;
  const X = C * (1 - Math.abs((hPrime % 2) - 1));
  const m = l - C / 2;
  const withLight = (
    r: number,
    g: number,
    b: number
  ): [number, number, number] => [r + m, g + m, b + m];
  if (hPrime <= 1) {
    return withLight(C, X, 0);
  } else if (hPrime <= 2) {
    return withLight(X, C, 0);
  } else if (hPrime <= 3) {
    return withLight(0, C, X);
  } else if (hPrime <= 4) {
    return withLight(0, X, C);
  } else if (hPrime <= 5) {
    return withLight(X, 0, C);
  } else if (hPrime <= 6) {
    return withLight(C, 0, X);
  } else throw "invalid H Prime value";
};

interface ColorValues {
  red: number;
  green: number;
  blue: number;
  hue: number;
  saturation: number;
  lightness: number;
}

const rgbToObject = (red: number, green: number, blue: number): ColorValues => {
  const [hue, saturation, lightness] = rgbToHsl(red, green, blue);
  return { red, green, blue, hue, saturation, lightness };
};

const hslToObject = (
  hue: number,
  saturation: number,
  lightness: number
): ColorValues => {
  const [red, green, blue] = hslToRgb(hue, saturation, lightness);
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    hue,
    saturation,
    lightness,
  };
};

const lighten = (x: number) => (colors: ColorValues): ColorValues => ({
  ...colors,
  lightness: Math.min(1, x),
});

const darken = (x: number) => (colors: ColorValues): ColorValues => ({
  ...colors,
  lightness: Math.max(0, colors.lightness - x),
});

const rgbFromHex = (rawHex = "#ffffff"): ColorValues => {
  const hex =
    rawHex.length < 5
      ? rawHex
          .slice(1)
          .split("")
          .map((s) => `${s}${s}`)
          .join("")
      : rawHex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return rgbToObject(r / 255, g / 255, b / 255);
};

const hexFromRgb = (colors: ColorValues): string => {
  const { red, green, blue } = colors;

  return [red.toString(16), green.toString(16), blue.toString(16)].reduce(
    (hex, c) => hex + (c.length < 2 ? `0${c}` : c),
    "#"
  );
};

const hexTransform = (...args: ((color: ColorValues) => ColorValues)[]) => (
  hex = "#ffffff"
): string => {
  const transformed = args.reduce((output, cb) => cb(output), rgbFromHex(hex));
  return hexFromRgb(
    hslToObject(transformed.hue, transformed.saturation, transformed.lightness)
  );
};

export const colorAPI = {
  hexTransform,
  rgbFromHex,
  lighten,
  darken,
};
