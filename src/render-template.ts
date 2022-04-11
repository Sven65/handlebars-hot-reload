const { readFile } = require("fs").promises;
const hbs = require("handlebars");

export async function renderTemplate(data: any, templateName: string, helpers?: (handlebars: unknown) => void) {
  let handlebars = hbs
  if (helpers && typeof helpers === "function") {
    handlebars = helpers(handlebars)
  }

  const html = await readFile(templateName, "utf-8");

  // creates the Handlebars template object
  const template = handlebars.compile(html, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);

  return rendered;
}
