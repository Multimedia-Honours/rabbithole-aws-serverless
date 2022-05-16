/**
 * The names of modules to load are stored as a comma-delimited string in the
 */
const moduleNames = process.env.MODULES.split(',');
/**
 * The array of imported modules.
 */
const modules = moduleNames.map(name => require(`./${name}`));

export async function handler(event, context) {
  await Promise.all(
    modules.map(module => module.handler(event, context))
  );
}
