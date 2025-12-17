const fs = require("node:fs");
const { palettes } = require("./palettes.mjs");

const classic = palettes.filter((palette) =>
  palette.name.toLocaleLowerCase().includes("klassisk")
)[0];
console.log(classic.colors);
const hues = [5, 10, 15];
let css = "html {\n";
for (const color of classic.colors) {
  const varName = color.css.slice(
    color.css.indexOf("(") + 1,
    color.css.indexOf(")")
  );
  css += `\t${varName}: ${color.rgb};\n`;
  // Lightened
  for (const hue of hues) {
    css += `\t${varName}-lightened-${hue}: color-mix(in srgb, var(${varName}), white ${hue}%);\n`;
  }
  // Darkened
  for (const hue of hues) {
    css += `\t${varName}-darkened-${hue}: color-mix(in srgb, var(${varName}), black ${hue}%);\n`;
  }
}
css += "}";
console.log(css);

fs.writeFile("./color_variable.css", css, (err) => {
  if (err) {
    console.error(err);
  }
});
