async function fetchMetadata(input) {

  // Extract DOI if full URL is given
  const doiMatch = input.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);

  let url;

  if (doiMatch) {
    const doi = doiMatch[0];
    url = `https://api.crossref.org/works/${doi}`;
  } else {
    url = `https://api.crossref.org/works?query.bibliographic=${encodeURIComponent(input)}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data.message.items ? data.message.items[0] : data.message;
}
