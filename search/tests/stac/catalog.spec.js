const settings = require('../../lib/settings');
const { createRootCatalog } = require('../../lib/stac/catalog');

describe('createRootCatalog', () => {
  let rootCatalog;

  beforeEach(() => {
    rootCatalog = createRootCatalog('/cmr-stac/stac');
  });

  it('should contain a collection of links.', () => {
    expect(rootCatalog.links).toBeDefined();
    expect(Array.isArray(rootCatalog.links)).toBe(true);
  });

  it('should create a catalog with a self link.', () => {
    const selfLink = rootCatalog.links.find((link) => link.rel === 'self');
    expect(selfLink).toBeDefined();
    expect(selfLink.href).toBe('/cmr-stac/stac');
    expect(selfLink.type).toBe('application/json');
    expect(selfLink.title).toBe('Root Catalog');
  });

  it('should create a catalog with a self link that does not contain a question mark.', () => {
    const newRootCatalog = createRootCatalog('/cmr-stac/stac?')
    const selfLink = newRootCatalog.links.find((link) => link.rel === 'self');
    expect(selfLink).toBeDefined()
    expect(selfLink.href).toBe('/cmr-stac/stac');
    expect(selfLink.type).toBe('application/json');
    expect(selfLink.title).toBe('Root Catalog');
  })

  it('should create a catalog with a root link to itself.', () => {
    const selfLink = rootCatalog.links.find((link) => link.rel === 'self');
    const rootLink = rootCatalog.links.find((link) => link.rel === 'root');
    expect(rootLink).toBeDefined();
    expect(rootLink.href).toEqual(selfLink.href);
  });

  it('should have a stac version.', () => {
    expect(rootCatalog.stac_version).toBe(settings.stac.version);
  });

  it('should have an id.', () => {
    expect(rootCatalog.id).toBe('root');
  });

  it('should have a title.', () => {
    expect(rootCatalog.title).toBe('Root Catalog');
  });

  it('should have a description.', () => {
    expect(rootCatalog.description).toBe('Generated root catalog for CMR.');
  });

  it('should be able to add a child catalog or collection.', () => {
    rootCatalog.addChild('Default Catalog', '/default');
    const childLink = rootCatalog.links.find((link) => link.rel === 'child');
    expect(childLink).toBeDefined();
    expect(childLink.href).toBe('/cmr-stac/stac/default');
  });
});
