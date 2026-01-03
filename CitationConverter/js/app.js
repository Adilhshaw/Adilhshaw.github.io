document.getElementById("convert").addEventListener("click", async () => {

  const input = document.getElementById("input").value.trim();
  const style = document.getElementById("style").value;
  const output = document.getElementById("output");

  output.value = "Processing…";

  try {
    const metadata = await fetchMetadata(input);
    const cslData = makeCSL(metadata);
    const result = await formatCitation(cslData, style);
    output.value = result;
  } catch (err) {
    console.error(err);
    output.value = "Error: unable to generate citation.";
  }
});
console.log("app loaded");
