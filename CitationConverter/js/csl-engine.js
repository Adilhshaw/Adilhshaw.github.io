// CSL Engine and Metadata Normalisation

window.formatCitation = async function (cslData, style) {

  const styleText = await fetch(`csl/${style}.csl`).then(r => r.text());
  const locale = await fetch("https://unpkg.com/citeproc/locales-en-US.xml").then(r => r.text());

  const sys = {
    retrieveLocale: () => locale,
    retrieveItem: () => cslData
  };

  const engine = new CSL.Engine(sys, styleText);
  engine.updateItems([cslData.id]);

  const bibliography = engine.makeBibliography();
  return bibliography[1][0];
};

window.makeCSL = function (item) {
  return {
    id: item.DOI || "item1",
    type: item.type || "article-journal",
    title: item.title?.[0],
    author: item.author?.map(a => ({
      family: a.family,
      given: a.given
    })),
    issued: { "date-parts": [[ item.issued["date-parts"][0][0] ]] },
    "container-title": item["container-title"]?.[0],
    volume: item.volume,
    issue: item.issue,
    page: item.page,
    DOI: item.DOI
  };
};
