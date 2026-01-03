document.getElementById("convert").addEventListener("click", async () => {

  const input = document.getElementById("input").value.trim();
  const style = document.getElementById("style").value;
  const output = document.getElementById("output");

  output.innerHTML = "Processing your citation…";

  try {
    const metadata = await fetchMetadata(input);
    const cslData = makeCSL(metadata);
    const result = await formatCitation(cslData, style);
    output.innerHTML = result;
  } catch (err) {
    console.error(err);
    output.innerHTML = "Error: unable to generate citation.";
  }
});

document.getElementById("copy").addEventListener("click", () => {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text);
});
