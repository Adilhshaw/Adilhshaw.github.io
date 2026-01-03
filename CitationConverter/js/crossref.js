async function fetchMetadata(query) {

  let url;
  if (query.startsWith("10.")) {
    url = `https://api.crossref.org/works/${query}`;
  } else {
    url = `https://api.crossref.org/works?query.bibliographic=${encodeURIComponent(query)}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.message.items) {
    return data.message.items[0];
  } else {
    return data.message;
  }
}
