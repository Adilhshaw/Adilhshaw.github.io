document.getElementById("convert").addEventListener("click", async () => {

  const input = document.getElementById("input").value.trim();
  const style = document.getElementById("style").value;
  const output = document.getElementById("output");

  output.innerHTML = "Processing…";

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

document.getElementById("copyText").addEventListener("click", () => {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text);
});

document.getElementById("copyRich").addEventListener("click", async () => {
  const html = document.getElementById("output").innerHTML;
  const blob = new Blob([html], { type: "text/html" });
  const data = [new ClipboardItem({ "text/html": blob })];
  await navigator.clipboard.write(data);
});
